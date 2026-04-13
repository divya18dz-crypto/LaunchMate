const fs = require('fs');
const path = require('path');

const files = [
  'Analytics.jsx',
  'BusinessPlan.jsx',
  'Budget.jsx',
  'Marketing.jsx',
  'Pitch.jsx',
  'Strategy.jsx',
  'Score.jsx'
];

files.forEach(f => {
  const filePath = path.join(__dirname, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace full-screen background
  content = content.replace(/className="min-h-screen [^"]+"/g, 'className="text-white p-2"');

  // Remove the Back button comment and element
  content = content.replace(/\{\/\* 🔙 BACK BUTTON \*\/\}[\s\S]*?← Back[\s\S]*?<\/button>/g, '');

  fs.writeFileSync(filePath, content);
  console.log('Updated ' + f);
});
