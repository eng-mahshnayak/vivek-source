// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL;
// import toast from "react-hot-toast";


// export default function Login() {

//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//   //   const handleLogin = () => {
    
//   //   navigate('/dashboard');
//   // };

//   const handleLogin = async (e) => {
//   e.preventDefault();   // important (page reload stop karega)
//   setLoading(true);
//   setError("");

//   try {
 

//     const response = await axios.post(
//         `${API_URL}/users/signin`,
//         {email, password},
       
//       );

//       if (response.data?.success === true) {

//        console.log( response.data.user);
       
       
//      // token store
//       localStorage.setItem("erptoken", response.data.token);

//       // user object store
//       localStorage.setItem("erpuser", JSON.stringify(response.data.user));

//        toast.success("Login successful");

//         // dashboard pe bhejo
//        navigate("/dashboard");
     
      
        
//       } else if (response.data?.success === false && response.data?.message === 'Unauthorized') {
//         localStorage.removeItem('token');
//         navigate('/login');
//       } else {
//          toast.error(response.data?.message || 'Failed to update customer');
//         throw new Error(response.data?.message || 'Failed to update customer');
//       }

//   } catch (err:any) {
//     //  toast.error(err.message||"Invalid credentials ❌");
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       {/* Main card */}
//       <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-gray">
//         {/* LEFT SIDE - Gradient with branding and testimonial */}
//         <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">
//               Accu<span className="text-yellow-300">ERP</span>
//             </h1>
//             <p className="text-lg opacity-90 max-w-sm">
//               Enterprise Resource Planning for Accounting, Inventory & Growth.
//             </p>
//           </div>

//           {/* Testimonial */}
//           <div className="mt-12 lg:mt-0">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gray/20 rounded-full flex items-center justify-center text-2xl font-semibold">
//                MN
//               </div>
//               <div>
//                  <p className="font-semibold text-lg">Mahesh Nayak</p>
//                 <p className="text-sm text-gray/80">Full Stack Developer</p>
//               </div>
//             </div>
//             <p className="text-sm text-gray/70 mt-4 italic">
//               AccuERP streamlined our entire financial workflow.”
//             </p>
//           </div>
//         </div>

//         {/* RIGHT SIDE - Login Form */}
//         <div className="lg:w-1/2 p-8 md:p-12 bg-gray">
//           {/* Header with "Login M" */}
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Login</h2>
//             <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//               M
//             </span>
//           </div>

//           <form className="space-y-6" onSubmit={handleLogin}>
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@company.com"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//               />
//             </div>

//             {/* Password with eye icon toggle */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 focus:outline-none"
//                 >
//                   {showPassword ? (
                  
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                   ) : (
                    
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember me & Forgot password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   defaultChecked
//                   className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                 />
//                 <span className="text-sm text-gray-600">Remember me</span>
//               </label>
//               <a
//                 href="/forgot-password"
//                 className="text-sm text-indigo-600 hover:underline font-medium"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Sign In Button */}
//           <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </button>
//           </form>

//           {/* Request Access link */}
//           <p className="text-center text-sm text-gray-500 mt-8">
//             Don't have an account?{" "}
//             <a href="/signup" className="text-indigo-600 hover:underline font-medium">
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import toast from "react-hot-toast";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    console.log(error);
    
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleLogin = async (e:any) => {
        e.preventDefault();   // important (page reload stop karega)
        

         // Dismiss any existing toasts before showing new ones
    toast.dismiss();

        // Validation
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `${API_URL}/users/signin`,
                { email, password },
            );

            console.log(response,'response login');
            

            if (response.data?.success === true) {
                console.log(response.data.user);
                
                // token store
                localStorage.setItem("erptoken", response.data.data);

                // user object store
                localStorage.setItem("erpuser", JSON.stringify(response.data.user));

                toast.success("Login successful");

                // dashboard pe bhejo
                navigate("/dashboard");
                
            } else if (response.data?.success === false && response.data?.message === 'Unauthorized') {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error(response.data?.message || 'Failed to login');
                throw new Error(response.data?.message || 'Failed to login');
            }

        } catch (err: any) {
             console.log(err,'err login');
            // toast.error(err.message || "Invalid credentials ❌");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {/* Main card */}
            <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white transform transition-all duration-300 hover:shadow-3xl">
                {/* LEFT SIDE - Gradient with branding and testimonial */}
                <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 transition-transform duration-300 hover:scale-105 hover:origin-left">
                            Accu<span className="text-yellow-300">ERP</span>
                        </h1>
                        <p className="text-lg opacity-90 max-w-sm transition-opacity duration-300 hover:opacity-100">
                            Enterprise Resource Planning for Accounting, Inventory & Growth.
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
                            "AccuERP streamlined our entire financial workflow."
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - Login Form */}
                <div className="lg:w-1/2 p-8 md:p-12 bg-white">
                    {/* Header with "Login M" */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 transition-all duration-300 hover:text-indigo-700 hover:scale-105">
                            Login
                        </h2>
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full transition-all duration-300 hover:bg-indigo-100 hover:scale-110 hover:shadow-md cursor-default">
                            M
                        </span>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-indigo-600">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@company.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 
                                hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                            />
                        </div>

                        {/* Password with eye icon toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-indigo-600">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 transition-all duration-200 
                                    hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 
                                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                                    hover:text-indigo-600 focus:outline-none transition-all duration-200 
                                    hover:scale-110 active:scale-95"
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                   
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 
                                    transition-all duration-200 cursor-pointer hover:border-indigo-400 hover:scale-110"
                                />
                                <span className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-indigo-600">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="/forgot-password"
                                className="text-sm text-indigo-600 hover:underline font-medium 
                                transition-all duration-200 hover:text-indigo-800 hover:scale-105 inline-block"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
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
                                    Signing In...
                                </span>
                            ) : "Sign In"}
                        </button>
                    </form>

                    {/* Request Access link */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Don't have an account?{" "}
                        <a 
                            href="/signup" 
                            className="text-indigo-600 hover:underline font-medium 
                            transition-all duration-200 hover:text-indigo-800 hover:scale-105 inline-block"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
