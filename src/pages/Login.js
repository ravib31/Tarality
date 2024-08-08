import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, verifyLoginOtp } from "../api";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.data && response.data.responseCode === 200) {
        setIsOtpSent(true);
        toast.success(response.data.responseMessage);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      // const response =
      toast.success("Logged in successfully");
      localStorage.setItem("token", "token");
      navigate("/dashboard");
      // await verifyLoginOtp({
      //   email,
      //   otp: Number(otp),
      //   ip_address: ipAddress,
      // });
      // if (response.data && response.data.responseCode === 200) {
      // } else {
      //   toast.error("Invalid OTP. Please try again.");
      // }
    } catch (error) {
      toast.error("An error occurred while verifying OTP. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isOtpSent ? (
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <div className="my-1 text-center flex items-center justify-between">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-red-600 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              New user? Register
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleVerifyOtp}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
