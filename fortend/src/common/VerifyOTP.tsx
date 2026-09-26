// import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL;
// import toast from "react-hot-toast";

// export default function VerifyOTP() {
//     const navigate = useNavigate();
//     const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//     const [loading, setLoading] = useState(false);
//     const [timer, setTimer] = useState(60);
//     const [canResend, setCanResend] = useState(false);

//     useEffect(() => {
//         const email = localStorage.getItem("resetEmail");
//         if (!email) {
//             navigate("/forgot-password");
//         }
//     }, [navigate]);

//     useEffect(() => {
//         let interval: NodeJS.Timeout;
//         if (timer > 0 && !canResend) {
//             interval = setInterval(() => {
//                 setTimer((prev) => prev - 1);
//             }, 1000);
//         } else if (timer === 0) {
//             setCanResend(true);
//         }
//         return () => clearInterval(interval);
//     }, [timer, canResend]);

//     const handleChange = (index: number, value: string) => {
//         if (value.length > 1) return; // Only allow single digit
        
//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);

//         // Auto-focus next input
//         if (value !== "" && index < 5) {
//             const nextInput = document.getElementById(`otp-${index + 1}`);
//             nextInput?.focus();
//         }
//     };

//     const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//         if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//             const prevInput = document.getElementById(`otp-${index - 1}`);
//             prevInput?.focus();
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const otpString = otp.join("");
        
//         if (otpString.length !== 6) {
//             toast.error("Please enter complete OTP");
//             return;
//         }

//         setLoading(true);

//         try {
//             const email = localStorage.getItem("resetEmail");
//             const response = await axios.post(
//                 `${API_URL}/users/verifyotp`,
//                 { email, otp: otpString }
//             );

//             if (response.data?.success) {
//                 toast.success("OTP verified successfully");
//                 // Store verification token if needed
//                 if (response.data.token) {
//                     localStorage.setItem("resetToken", response.data.token);
//                 }
//                 navigate("/reset-password");
//             } else {
//                 toast.error(response.data?.message || "Invalid OTP");
//             }
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Verification failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResendOTP = async () => {
//         setCanResend(false);
//         setTimer(60);
        
//         try {
//             const email = localStorage.getItem("resetEmail");
//             await axios.post(`${API_URL}/users/forgot-password`, { email });
//             toast.success("New OTP sent");
//         } catch (err: any) {
//             toast.error("Failed to resend OTP");
//             setCanResend(true);
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
//                             Verify your identity.
//                         </p>
//                     </div>
//                     <div className="mt-12 lg:mt-0">
//                         <p className="text-sm text-gray/70 italic">
//                             Enter the 6-digit OTP sent to your email address.
//                         </p>
//                     </div>
//                 </div>

//                 {/* RIGHT SIDE - OTP Form */}
//                 <div className="lg:w-1/2 p-8 md:p-12 bg-gray">
//                     <div className="flex items-center justify-between mb-8">
//                         <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>
//                         <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//                             Step 2/3
//                         </span>
//                     </div>

//                     <p className="text-gray-600 mb-6">
//                         We've sent a 6-digit code to {localStorage.getItem("resetEmail")}
//                     </p>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="flex justify-between gap-2">
//                             {otp.map((digit, index) => (
//                                 <input
//                                     key={index}
//                                     id={`otp-${index}`}
//                                     type="text"
//                                     maxLength={1}
//                                     value={digit}
//                                     onChange={(e) => handleChange(index, e.target.value)}
//                                     onKeyDown={(e) => handleKeyDown(index, e)}
//                                     className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                     required
//                                 />
//                             ))}
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
//                         >
//                             {loading ? "Verifying..." : "Verify OTP"}
//                         </button>
//                     </form>

//                     <div className="text-center mt-6">
//                         {canResend ? (
//                             <button
//                                 onClick={handleResendOTP}
//                                 className="text-indigo-600 hover:underline font-medium"
//                             >
//                                 Resend OTP
//                             </button>
//                         ) : (
//                             <p className="text-gray-500">
//                                 Resend OTP in {timer} seconds
//                             </p>
//                         )}
//                     </div>

//                     <p className="text-center text-sm text-gray-500 mt-8">
//                         <a href="/forgot-password" className="text-indigo-600 hover:underline font-medium">
//                             Try different email
//                         </a>
//                     </p>
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

export default function VerifyOTP() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    useEffect(() => {
        const email = localStorage.getItem("resetEmail");
        if (!email) {
            navigate("/forgot-password");
        }
    }, [navigate]);

    // useEffect(() => {
    //     let interval: NodeJS.Timeout;
    //     if (timer > 0 && !canResend) {
    //         interval = setInterval(() => {
    //             setTimer((prev) => prev - 1);
    //         }, 1000);
    //     } else if (timer === 0) {
    //         setCanResend(true);
    //     }
    //     return () => clearInterval(interval);
    // }, [timer, canResend]);

    useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timer > 0 && !canResend) {
        interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
    } else if (timer === 0) {
        setCanResend(true);
    }

    return () => clearInterval(interval);
}, [timer, canResend]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== "" && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        const newOtp:any = [...otp];
        
        pastedData.forEach((value, index) => {
            if (index < 6 && /^\d$/.test(value)) {
                newOtp[index] = value;
            }
        });
        
        setOtp(newOtp);
        
        // Focus last filled or first empty
        const lastFilledIndex = newOtp?.findLastIndex((val:any) => val !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        document.getElementById(`otp-${focusIndex}`)?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join("");
        
        if (otpString.length !== 6) {
            toast.error("Please enter complete OTP");
            return;
        }

        setLoading(true);

        try {
            const email = localStorage.getItem("resetEmail");
            const response = await axios.post(
                `${API_URL}/users/verifyotp`,
                { email, otp: otpString }
            );

            if (response.data?.success) {
                toast.success("OTP verified successfully");
                // Store verification token if needed
                if (response.data.token) {
                    localStorage.setItem("resetToken", response.data.token);
                }
                navigate("/reset-password");
            } else {
                toast.error(response.data?.message || "Invalid OTP");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setCanResend(false);
        setTimer(60);
        
        try {
            const email = localStorage.getItem("resetEmail");
            await axios.post(`${API_URL}/users/forgotpassword`, { email });
            toast.success("New OTP sent");
        } catch (err: any) {
            toast.error("Failed to resend OTP");
            setCanResend(true);
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
                            Verify your identity.
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
                            "Enter the 6-digit OTP sent to your email address."
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - OTP Form */}
                <div className="lg:w-1/2 p-8 md:p-12 bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 transition-all duration-300 hover:text-indigo-700 hover:scale-105">
                            Verify OTP
                        </h2>
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full 
                        transition-all duration-300 hover:bg-indigo-100 hover:scale-110 hover:shadow-md cursor-default">
                            Step 2/3
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-gray-900 break-all">
                        We've sent a 6-digit code to {localStorage.getItem("resetEmail")}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* OTP Input Fields */}
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    onFocus={() => setFocusedIndex(index)}
                                    onBlur={() => setFocusedIndex(null)}
                                    className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg 
                                    transition-all duration-200 outline-none
                                    hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100
                                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                                    ${focusedIndex === index ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'}
                                    ${digit ? 'bg-indigo-50 border-indigo-300' : 'bg-white'}`}
                                    required
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
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
                                    Verifying...
                                </span>
                            ) : "Verify OTP"}
                        </button>
                    </form>

                    {/* Resend OTP Section */}
                    <div className="text-center mt-6">
                        {canResend ? (
                            <button
                                onClick={handleResendOTP}
                                className="text-indigo-600 font-medium 
                                transition-all duration-200 hover:text-indigo-800 hover:scale-105 
                                hover:underline inline-block"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <p className="text-gray-500 transition-all duration-300 hover:text-gray-700">
                                Resend OTP in <span className="font-semibold text-indigo-600">{timer}</span> seconds
                            </p>
                        )}
                    </div>

                    {/* Try different email link */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        <a 
                            href="/forgot-password" 
                            className="text-indigo-600 font-medium 
                            transition-all duration-200 hover:text-indigo-800 hover:scale-105 
                            hover:underline inline-block"
                        >
                            Try different email
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}