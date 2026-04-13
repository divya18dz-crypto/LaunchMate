const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
  console.error("WARNING: GEMINI_API_KEY is missing from .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "DUMMY_KEY");

router.post('/analyze', auth, async (req, res) => {
  try {
    const { name, summary } = req.body;

    if (!name || !summary) {
      return res.status(400).json({ error: "Idea name and summary are required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "DUMMY_KEY") {
        return res.status(500).json({ error: "Server missing valid Gemini API Key." });
    }

    const prompt = `
    You are an experienced, strict startup advisor evaluating a new business idea. You are honest and direct—you don't sugarcoat flaws—but you are ultimately trying to help the founder succeed, so you don't unnecessarily tear them down. 
    IMPORTANT: Ensure all financial figures, budget estimates, and revenue models are explicitly quoted in Indian Rupees (₹).

    Evaluate the following startup idea:
    Idea Name: "${name}"
    Description: "${summary}"

    You must reply with ONLY a valid, raw JSON object. Do not use markdown blocks (\`\`\`json). Just the raw {} object.
    The object must have the EXACT following structure:
    {
      "generalAnalysis": "A 2-3 sentence strict evaluation of the idea's core viability.",
      "score": {
        "total": 85,
        "innovation": 9,
        "marketDemand": 8,
        "profitPotential": 8,
        "feasibility": 7,
        "summary": "Short 1 sentence summary of the score"
      },
      "businessPlan": {
        "problem": "What problem is being solved?",
        "solution": "How does this solve it?",
        "targetMarket": "Who is the specific target audience?",
        "businessModel": "How will it specifically make money?",
        "uniqueValue": "What makes it unique?"
      },
      "marketing": {
        "strategy": "A 2 sentence overall marketing strategy",
        "channel1": "Best acquisition channel 1",
        "channel2": "Best acquisition channel 2",
        "branding": "1 sentence on professional brand identity",
        "growthProjection": [
          {"month": "Month 1", "reach": 1000, "engagement": 100},
          {"month": "Month 2", "reach": 2500, "engagement": 250},
          {"month": "Month 3", "reach": 6000, "engagement": 500},
          {"month": "Month 4", "reach": 15000, "engagement": 1200},
          {"month": "Month 5", "reach": 35000, "engagement": 2800},
          {"month": "Month 6", "reach": 80000, "engagement": 6500}
        ]
      },
      "budget": {
        "totalEstimate": "e.g. ₹5,00,000",
        "breakdown": "Short 2 sentence breakdown of where the money should go"
      },
      "pitch": {
        "elevator": "A punchy 1-sentence elevator pitch.",
        "tagline": "A catchy 3-word tagline.",
        "marketOpportunity": "1-2 sentences on market opportunity",
        "revenueModel": "1-2 sentences on revenue model"
      },
      "strategy": {
        "immediateNextSteps": "What should the founder do tomorrow?",
        "longTermVision": "Where should this be in 3 years?",
        "risks": "1 sentence on risks and challenges",
        "recommendation": "1 sentence final recommendation"
      },
      "analytics": {
        "metricsToTrack": "3 specific KPIs to track",
        "competitorAnalysis": "1 sentence on what competitors are doing wrong"
      },
      "risk": {
        "technicalRisk": "1-2 sentences on technical hurdles.",
        "marketRisk": "1-2 sentences on market risks.",
        "financialRisk": "1-2 sentences on funding/burn rate risks.",
        "mitigationStrategy": "1-2 sentences on how to mitigate these risks."
      }
    }
    `;

    // Extremely reliable Raw Fetch bypassing any Google SDK issues
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
    
    let aiResponse;
    let data;
    let retries = 3;
    let delay = 1500; // start with 1.5s delay

    while (retries > 0) {
      aiResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 }
        })
      });

      data = await aiResponse.json();

      if (aiResponse.ok) {
        break;
      }

      const isRetryableError = aiResponse.status === 503 || aiResponse.status === 429 || (data.error?.message && (data.error.message.toLowerCase().includes("demand") || data.error.message.toLowerCase().includes("quota")));
      if (isRetryableError && retries > 1) {
        console.warn(`Gemini API rate limited/high demand. Retrying in ${delay}ms... (${retries - 1} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries--;
        delay *= 2; // exponential backoff (1500ms, 3000ms)
      } else {
        break; // Other error or ran out of retries
      }
    }

    if (!aiResponse.ok) {
        console.error("Gemini Raw API Error:", data);

        // Run emergency diagnostics to see what models this key actually owns
        try {
            const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const listData = await listRes.json();
            console.error("========= GOOGLE DIAGNOSTICS =========");
            console.error("Your API Key ONLY has access to these models:");
            if (listData.models) {
                const names = listData.models.map(m => m.name).join(", ");
                console.error(names || "None! Your API key is region-blocked or zeroed out.");
            } else {
                console.error(listData);
            }
            console.error("======================================");
        } catch(e) {}

        return res.status(500).json({ error: data.error?.message || "AI failed to generate." });
    }

    let outputText = data.candidates[0].content.parts[0].text;
    
    // Clean up potential markdown formatting from Gemini
    outputText = outputText.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    let analysisData;
    try {
        analysisData = JSON.parse(outputText);
    } catch (e) {
        console.error("Failed to parse Gemini output:", outputText);
        return res.status(500).json({ error: "AI returned invalid format. Please try again." });
    }

    // Save to Database
    const newIdea = new Idea({
      userId: req.userId,
      name,
      summary,
      analysis: analysisData
    });
    
    await newIdea.save();

    res.status(200).json({ message: "Analysis complete", idea: newIdea });

  } catch (err) {
    console.error("AI Generation Error:", err);
    res.status(500).json({ error: "Server error during AI generation." });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { ideaName, ideaSummary, messages } = req.body;

    if (!ideaName || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing required fields or messages array." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "DUMMY_KEY") {
        return res.status(500).json({ error: "Server missing valid Gemini API Key." });
    }

    // Prepare system instruction for the AI to know its context
    const systemPrompt = `You are an expert startup advisor inside a business dashboard. 
    You are privately advising the founder of "${ideaName}".
    Startup Description: "${ideaSummary}".
    IMPORTANT: Ensure all financial amounts are explicitly quoted in Indian Rupees (₹).
    Keep your answers highly concise, direct, helpful, and focused specifically on this startup idea. Avoid generic boilerplate. Speak to them directly as their advisor.`;

    // Map messages to Gemini's expected format
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const aiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: contents,
        generationConfig: { temperature: 0.7 }
      })
    });

    const data = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("Gemini Chat API Error:", data);
      return res.status(500).json({ error: data.error?.message || "AI failed to respond to chat." });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't formulate a response.";

    res.status(200).json({ reply: replyText });

  } catch (err) {
    console.error("AI Chat Error:", err);
    res.status(500).json({ error: "Server error during AI chat." });
  }
});

// GET: Fetch User History
router.get('/history', auth, async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
});

// DELETE: Remove an idea from history
router.delete('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!idea) {
      return res.status(404).json({ error: "Idea not found or unauthorized." });
    }
    res.status(200).json({ message: "Idea deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete idea." });
  }
});

module.exports = router;
