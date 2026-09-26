// import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL;
// import toast from "react-hot-toast";

// export default function ResetPassword() {
//     const navigate = useNavigate();
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const email = localStorage.getItem("resetEmail");
//         // const token = localStorage.getItem("resetToken"); // If using token
//         if (!email) {
//             navigate("/forgot-password");
//         }
//     }, [navigate]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
        
//         if (password !== confirmPassword) {
//             toast.error("Passwords do not match");
//             return;
//         }

//         if (password.length < 6) {
//             toast.error("Password must be at least 6 characters");
//             return;
//         }

//         setLoading(true);

//         try {
//             const email = localStorage.getItem("resetEmail");
//             // const token = localStorage.getItem("resetToken"); // If using token
            
//             const response = await axios.post(
//                 `${API_URL}/users/reset-password`,
//                 { 
//                     email, 
//                     newPassword: password,
//                     // token // If using token
//                 }
//             );

//             if (response.data?.success) {
//                 toast.success("Password reset successfully");
                
//                 // Clean up storage
//                 localStorage.removeItem("resetEmail");
//                 localStorage.removeItem("resetToken");
                
//                 // Redirect to login
//                 setTimeout(() => navigate("/"), 2000);
//             } else {
//                 toast.error(response.data?.message || "Failed to reset password");
//             }
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-gray">
//                 {/* LEFT SIDE */}
//                 <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between">
//                     <div>
//                         <h1 className="text-4xl font-bold mb-2">
//                             Accu<span className="text-yellow-300">ERP</span>
//                         </h1>
//                         <p className="text-lg opacity-90 max-w-sm">
//                             Set your new password.
//                         </p>
//                     </div>
//                     <div className="mt-12 lg:mt-0">
//                         <p className="text-sm text-gray/70 italic">
//                             Choose a strong password that you haven't used before.
//                         </p>
//                     </div>
//                 </div>

//                 {/* RIGHT SIDE - Reset Password Form */}
//                 <div className="lg:w-1/2 p-8 md:p-12 bg-gray">
//                     <div className="flex items-center justify-between mb-8">
//                         <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
//                         <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//                             Step 3/3
//                         </span>
//                     </div>

//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         {/* New Password */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 New Password
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="••••••••"
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-indigo-500"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
//                                 >
//                                     {showPassword ? (
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                         </svg>
//                                     ) : (
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                                         </svg>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Confirm Password */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 placeholder="••••••••"
//                                 required
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Password strength indicator (optional) */}
//                         <div className="text-sm">
//                             <p className="text-gray-600 mb-1">Password must:</p>
//                             <ul className="text-gray-500 space-y-1">
//                                 <li className="flex items-center gap-2">
//                                     <span className={password.length >= 6 ? "text-green-500" : "text-gray-400"}>
//                                         {password.length >= 6 ? "✓" : "○"}
//                                     </span>
//                                     Be at least 6 characters
//                                 </li>
//                                 <li className="flex items-center gap-2">
//                                     <span className={password === confirmPassword && password !== "" ? "text-green-500" : "text-gray-400"}>
//                                         {password === confirmPassword && password !== "" ? "✓" : "○"}
//                                     </span>
//                                     Passwords match
//                                 </li>
//                             </ul>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
//                         >
//                             {loading ? "Resetting..." : "Reset Password"}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }




import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import toast from "react-hot-toast";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmFocused, setConfirmFocused] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("resetEmail");
        // const token = localStorage.getItem("resetToken"); // If using token
        if (!email) {
            navigate("/forgot-password");
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const email = localStorage.getItem("resetEmail");
            // const token = localStorage.getItem("resetToken"); // If using token
            
            const response = await axios.post(
                `${API_URL}/users/reset-password`,
                { 
                    email, 
                    newPassword: password,
                    // token // If using token
                }
            );

            if (response.data?.success) {
                toast.success("Password reset successfully");
                
                // Clean up storage
                localStorage.removeItem("resetEmail");
                localStorage.removeItem("resetToken");
                
                // Redirect to login
                setTimeout(() => navigate("/"), 2000);
            } else {
                toast.error(response.data?.message || "Failed to reset password");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {/* Main card */}
            <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white transform transition-all duration-300 hover:shadow-3xl">
                {/* LEFT SIDE */}
                <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 transition-transform duration-300 hover:scale-105 hover:origin-left">
                            Accu<span className="text-yellow-300">ERP</span>
                        </h1>
                        <p className="text-lg opacity-90 max-w-sm transition-opacity duration-300 hover:opacity-100">
                            Set your new password.
                        </p>
                    </div>
                    
                    {/* Testimonial */}
                    <div className="mt-12 lg:mt-0">
                        <div className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white/10 cursor-default">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-semibold transition-transform duration-300 hover:scale-110 hover:bg-white/30">
                                MN
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Mahesh Nayak</p>
                                <p className="text-sm text-white/80">Full Stack Developer</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/70 mt-4 italic p-3 rounded-lg transition-all duration-300 hover:bg-white/5">
                            "Choose a strong password that you haven't used before."
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - Reset Password Form */}
                <div className="lg:w-1/2 p-8 md:p-12 bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 transition-all duration-300 hover:text-indigo-700 hover:scale-105">
                            Reset Password
                        </h2>
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full 
                        transition-all duration-300 hover:bg-indigo-100 hover:scale-110 hover:shadow-md cursor-default">
                            Step 3/3
                        </span>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-indigo-600">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    placeholder="••••••••"
                                    required
                                    className={`w-full px-4 py-3 border rounded-lg pr-12 
                                    transition-all duration-200 outline-none
                                    hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100
                                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                                    ${passwordFocused ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                                    transition-all duration-200 hover:text-indigo-600 hover:scale-110 
                                    active:scale-95 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-indigo-600">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setConfirmFocused(true)}
                                    onBlur={() => setConfirmFocused(false)}
                                    placeholder="••••••••"
                                    required
                                    className={`w-full px-4 py-3 border rounded-lg pr-12
                                    transition-all duration-200 outline-none
                                    hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100
                                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                                    ${confirmFocused ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                                    transition-all duration-200 hover:text-indigo-600 hover:scale-110 
                                    active:scale-95 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password strength indicator */}
                        <div className="text-sm bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
                            <p className="text-gray-700 font-medium mb-2">Password must:</p>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                                    <span className={`flex items-center justify-center w-5 h-5 rounded-full ${
                                        password.length >= 6 
                                            ? "text-green-600 bg-green-100" 
                                            : "text-gray-400 bg-gray-200"
                                    }`}>
                                        {password.length >= 6 ? "✓" : "○"}
                                    </span>
                                    <span className={password.length >= 6 ? "text-green-700" : "text-gray-500"}>
                                        Be at least 6 characters
                                    </span>
                                </li>
                                <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                                    <span className={`flex items-center justify-center w-5 h-5 rounded-full ${
                                        password === confirmPassword && password !== "" 
                                            ? "text-green-600 bg-green-100" 
                                            : "text-gray-400 bg-gray-200"
                                    }`}>
                                        {password === confirmPassword && password !== "" ? "✓" : "○"}
                                    </span>
                                    <span className={password === confirmPassword && password !== "" ? "text-green-700" : "text-gray-500"}>
                                        Passwords match
                                    </span>
                                </li>
                            </ul>
                            
                            {/* Password strength meter */}
                            {password && (
                                <div className="mt-3">
                                    <div className="flex gap-1 h-1.5">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`flex-1 h-full rounded-full transition-all duration-300 ${
                                                    password.length >= 6 
                                                        ? level <= Math.min(4, Math.floor(password.length / 2))
                                                            ? level <= 2 ? 'bg-red-400' : level <= 3 ? 'bg-yellow-400' : 'bg-green-400'
                                                            : 'bg-gray-200'
                                                        : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {password.length >= 6 
                                            ? password.length < 8 ? 'Weak' 
                                            : password.length < 10 ? 'Medium' 
                                            : 'Strong'
                                            : 'Too short'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Reset Password Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg 
                            transition-all duration-200 hover:bg-indigo-800 hover:shadow-lg hover:scale-[1.02] 
                            active:scale-[0.98] active:bg-indigo-900 focus:ring-4 focus:ring-indigo-300 
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Resetting...
                                </span>
                            ) : "Reset Password"}
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        <a 
                            href="/" 
                            className="text-indigo-600 font-medium 
                            transition-all duration-200 hover:text-indigo-800 hover:scale-105 
                            hover:underline inline-block"
                        >
                            Back to Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}