import { useState, useEffect } from "react";

function Login({ setPage, showToast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState("login"); // login, signup, forgot, reset

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If we have a token, we are already logged in
    const token = localStorage.getItem("launchmate_token");
    if (token) {
      setPage("dashboard");
    }
  }, [setPage]);

  const handleSubmit = async () => {
    setApiError("");
    let newErrors = {};

    // Name (only signup)
    if (view === "signup" && !name) {
      newErrors.name = "Name is required";
    }

    // Email
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    // Mobile (signup, forgot, reset)
    if ((view === "signup" || view === "forgot" || view === "reset") && !mobile) {
      newErrors.mobile = "Mobile number is required";
    }

    // Password
    const currentPassword = (view === "reset") ? newPassword : password;
    if (view !== "forgot" && !currentPassword) {
      newErrors.password = "Password is required";
    } else if (view !== "forgot") {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordPattern.test(currentPassword)) {
        newErrors.password = "Min 8 chars, include uppercase, lowercase & number";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      let endpoint = "/api/auth/login";
      let payload = { email, password };

      if (view === "signup") {
        endpoint = "/api/auth/register";
        payload = { name, email, password, mobile };
      } else if (view === "forgot") {
        endpoint = "/api/auth/forgot-password";
        payload = { email, mobile };
      } else if (view === "reset") {
        endpoint = "/api/auth/reset-password";
        payload = { email, mobile, newPassword };
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || "An error occurred");
        setLoading(false);
        return;
      }

      // Success Logic
      if (view === "forgot") {
        setView("reset");
        setApiError("");
      } else if (view === "reset") {
        setView("login");
        setApiError("Password updated! Please login.");
        setNewPassword("");
      } else {
        localStorage.setItem("launchmate_token", data.token);
        setPage("dashboard");
      }
    } catch (err) {
      setApiError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden">

      {/* Glass Card */}
      <div className="backdrop-blur-md bg-purple-900/10 
      border border-purple-500/20 
      p-8 rounded-xl shadow-lg w-[90%] max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-300 text-center mb-6">
          {view === "login" && "Welcome to LaunchMate 🚀"}
          {view === "signup" && "Create Account 🚀"}
          {view === "forgot" && "Identify Your Account 🛡️"}
          {view === "reset" && "Set New Password 🔐"}
        </h2>

        {/* API Error Display */}
        {apiError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-md mb-4 text-center">
            {apiError}
          </div>
        )}

        {/* Signup Name */}
        {view === "signup" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full p-3 mb-1 rounded-md 
              bg-black/40 text-white 
              border ${errors.name ? "border-red-500" : "border-purple-500/20"}
              focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mb-2">{errors.name}</p>
            )}
          </>
        )}

        {/* Email Address */}
        {(view === "login" || view === "signup" || view === "forgot" || view === "reset") && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              readOnly={view === "reset"}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full p-3 mb-1 rounded-md 
              bg-black/40 text-white 
              border ${errors.email ? "border-red-500" : "border-purple-500/20"}
              focus:outline-none focus:ring-2 focus:ring-purple-600 ${view === "reset" ? "opacity-50" : ""}`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mb-2">{errors.email}</p>
            )}
          </>
        )}

        {/* Mobile Number */}
        {(view === "signup" || view === "forgot" || view === "reset") && (
          <>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              readOnly={view === "reset"}
              onChange={(e) => {
                setMobile(e.target.value);
                setErrors((prev) => ({ ...prev, mobile: "" }));
              }}
              className={`w-full p-3 mb-1 rounded-md 
              bg-black/40 text-white 
              border ${errors.mobile ? "border-red-500" : "border-purple-500/20"}
              focus:outline-none focus:ring-2 focus:ring-purple-600 ${view === "reset" ? "opacity-50" : ""}`}
            />
            {errors.mobile && (
              <p className="text-red-400 text-xs mb-2">{errors.mobile}</p>
            )}
          </>
        )}

        {/* Password Fields */}
        {(view === "login" || view === "signup" || view === "reset") && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={view === "reset" ? "New Password" : "Password"}
              value={view === "reset" ? newPassword : password}
              onChange={(e) => {
                if (view === "reset") setNewPassword(e.target.value);
                else setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full p-3 mb-1 rounded-md 
              bg-black/40 text-white pr-12
              border ${errors.password ? "border-red-500" : "border-purple-500/20"}
              focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-purple-400 hover:text-purple-300 transition"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mb-2">{errors.password}</p>
            )}
          </div>
        )}

        {/* Forgot Password Link */}
        {view === "login" && (
          <p 
            onClick={() => setView("forgot")}
            className="text-right text-xs text-purple-400 cursor-pointer mb-4 hover:underline"
          >
            Forgot password?
          </p>
        )}

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2.5 rounded-md font-semibold text-purple-300 bg-purple-500/10 backdrop-blur-md border border-purple-400/20 transition duration-300 mt-2
          ${loading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-purple-500/20 hover:shadow-[0_0_25px_rgba(128,0,255,0.4)] hover:scale-105'
            }`}
        >
          {loading ? "Processing..." : (
            view === "login" ? "Login" : 
            view === "signup" ? "Sign Up" :
            view === "forgot" ? "Verify Identity" : "Reset Password"
          )}
        </button>

        {/* Toggle / Back Link */}
        <p className="text-gray-400 text-sm text-center mt-4">
          {view === "login" && (
            <>
              Don't have an account?
              <span onClick={() => setView("signup")} className="text-purple-400 cursor-pointer ml-1 hover:underline">Sign up</span>
            </>
          )}
          {view === "signup" && (
            <>
              Already have an account?
              <span onClick={() => setView("login")} className="text-purple-400 cursor-pointer ml-1 hover:underline">Login</span>
            </>
          )}
          {(view === "forgot" || view === "reset") && (
            <span onClick={() => setView("login")} className="text-purple-400 cursor-pointer hover:underline">← Back to Login</span>
          )}
        </p>

      </div>
    </div>
  );
}

export default Login;