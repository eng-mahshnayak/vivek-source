// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import toast from "react-hot-toast";

// export default function ForgotPassword() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);

//     const API_URL = import.meta.env.VITE_API_URL;

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await axios.post(
//                 `${API_URL}/users/forgotpassword`,
//                 { email }
//             );


//              console.log(response,'hello check point');

//             if (response.data?.success) {
//                 toast.success("OTP sent to your email");
//                 // Email ko state mein save karo ya localStorage mein
//                 localStorage.setItem("resetEmail", email);
//                 navigate("/verify-otp");
//             } else {
//                 toast.error(response.data?.message || "Failed to send OTP");
//             }
//         } catch (err: any) {
//             console.log(err);
            
//             toast.error(err.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-gray">
//                 {/* LEFT SIDE - Same as Login */}
//                 <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between">
//                     <div>
//                         <h1 className="text-4xl font-bold mb-2">
//                             Accu<span className="text-yellow-300">ERP</span>
//                         </h1>
//                         <p className="text-lg opacity-90 max-w-sm">
//                             Reset your password securely.
//                         </p>
//                     </div>
//                     <div className="mt-12 lg:mt-0">
//                         <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 bg-gray/20 rounded-full flex items-center justify-center text-2xl font-semibold">
//                                 MN
//                             </div>
//                             <div>
//                                 <p className="font-semibold text-lg">Mahesh Nayak</p>
//                                 <p className="text-sm text-gray/80">Full Stack Developer</p>
//                             </div>
//                         </div>
//                         <p className="text-sm text-gray/70 mt-4 italic">
//                             We'll send you an OTP to verify your identity.
//                         </p>
//                     </div>
//                 </div>

//                 {/* RIGHT SIDE - Forgot Password Form */}
//                 <div className="lg:w-1/2 p-8 md:p-12 bg-gray">
//                     <div className="flex items-center justify-between mb-8">
//                         <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
//                         <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//                             Reset
//                         </span>
//                     </div>

//                     <p className="text-gray-600 mb-6">
//                         Enter your email address and we'll send you an OTP to reset your password.
//                     </p>

//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Email Address
//                             </label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="your@company.com"
//                                 required
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
//                         >
//                             {loading ? "Sending OTP..." : "Send OTP"}
//                         </button>
//                     </form>

//                     <p className="text-center text-sm text-gray-500 mt-8">
//                         Remember your password?{" "}
//                         <a href="/" className="text-indigo-600 hover:underline font-medium">
//                             Back to Login
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }




import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!email||email==='') {
            toast.error("Please enter your email address");
            return;
        }
        
        setLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/users/forgotpassword`,
                { email }
            );

            console.log(response, 'hello check point');

            if (response.data?.success) {
                toast.success("OTP sent to your email");
                // Email ko state mein save karo ya localStorage mein
                localStorage.setItem("resetEmail", email);
                navigate("/verify-otp");
            } else {
                toast.error(response.data?.message || "Failed to send OTP");
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {/* Main card */}
            <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white transform transition-all duration-300 hover:shadow-3xl">
                {/* LEFT SIDE - Gradient with branding */}
                <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 transition-transform duration-300 hover:scale-105 hover:origin-left">
                            Accu<span className="text-yellow-300">ERP</span>
                        </h1>
                        <p className="text-lg opacity-90 max-w-sm transition-opacity duration-300 hover:opacity-100">
                            Reset your password securely.
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
                            "We'll send you an OTP to verify your identity."
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - Forgot Password Form */}
                <div className="lg:w-1/2 p-8 md:p-12 bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 transition-all duration-300 hover:text-indigo-700 hover:scale-105">
                            Forgot Password
                        </h2>
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full transition-all duration-300 hover:bg-indigo-100 hover:scale-110 hover:shadow-md cursor-default">
                            Reset
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-gray-900">
                        Enter your email address and we'll send you an OTP to reset your password.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-indigo-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@company.com"
                                // required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                transition-all duration-200 
                                hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                                outline-none"
                            />
                        </div>

                        {/* Submit Button */}
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
                                    Sending OTP...
                                </span>
                            ) : "Send OTP"}
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Remember your password?{" "}
                        <a 
                            href="/" 
                            className="text-indigo-600 hover:underline font-medium 
                            transition-all duration-200 hover:text-indigo-800 hover:scale-105 inline-block"
                        >
                            Back to Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}