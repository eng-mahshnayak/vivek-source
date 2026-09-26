
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async(e:any) => {
    e.preventDefault();

      // Dismiss any existing toasts before showing new ones
    toast.dismiss();

     // ✅ Check if all fields are filled
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword|| !formData.phoneNumber) {
        toast.error("Please fill in all fields");
        return;
    }

    console.log(formData.phoneNumber.length,'formData.phoneNumber');
    
       // ✅ Phone number validation - exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
        toast.error("Mobile number must be exactly 10 digits");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
      return;
    }

     // ✅ Terms check
      if (!agreeTerms) {
        toast.error("Please agree to Terms of Service & Privacy Policy");
        return;
      }

    const response = await axios.post(
                `${API_URL}/users/main/signup`,
              {
               ...formData,
               name:formData.fullName}
            );

            if (response.data?.success) {

                toast.success(response.data?.message||"Sign up successfully");
                
            } else {

                toast.error(response.data?.message || "Invalid OTP");
            }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Main card */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* LEFT SIDE - Gradient with branding and testimonial (same as Login) */}
        <div className="lg:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Accu<span className="text-yellow-300">ERP</span>
            </h1>
            <p className="text-lg opacity-90 max-w-sm">
              Enterprise Resource Planning for Accounting, Inventory & Growth.
            </p>
          </div>

          {/* Testimonial */}
          <div className="mt-12 lg:mt-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-semibold">
                MN
              </div>
              <div>
                <p className="font-semibold text-lg">Mahesh Nayak</p>
                <p className="text-sm text-white/80">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-sm text-white/70 mt-4 italic">
              AccuERP streamlined our entire financial workflow.”
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Signup Form */}
        <div className="lg:w-1/2 p-8 md:p-12 bg-white">
          {/* Header with "Signup S" badge (similar to Login's "M") */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create account</h2>
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              M
            </span>
          </div>

         <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label> */}
             <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg transition-all duration-200 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
      />
            </div>

            {/* Email */}
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label> */}
              <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg transition-all duration-200 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
      />
            </div>

                       {/* Mobile */}
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile
              </label> */}
              <input
        type="number"
        name="phoneNumber"
        placeholder="phoneNumber"
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg transition-all duration-200 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
      />
            </div>

            {/* Password with eye toggle */}
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label> */}
              <div className="relative">
              <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg transition-all duration-200 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
      />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
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

            {/* Confirm Password with eye toggle */}
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label> */}
              <div className="relative">
                <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg transition-all duration-200 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
      />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
                >
                  {showConfirmPassword ? (
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

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer hover:border-indigo-400 transition-colors duration-200"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors duration-200">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors duration-200">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
        type="submit"
        className="w-full bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:bg-indigo-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:bg-indigo-900 focus:ring-4 focus:ring-indigo-300"
      >
        Sign Up
      </button>
          </form>

          {/* Footer - Link to Login */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <a href="/" className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors duration-200 font-medium">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}