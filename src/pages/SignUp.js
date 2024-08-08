import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api, { checkEmailExist, register } from "../api";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // if(email){
    //   let res0 = await checkEmailExist(email)
    //   console.log('checkEmailExist(email)', res0)
    //   // return toast.error('Email already exists')
    // }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      let res = await register({
        email,
        password,
        userType: "user",
        confirmPassword,
      });
      if (res.data.error) {
        toast.error(res.data.message);
        setError(res.data.message);
      } else if (!res.data.error) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error(error);
      setError("Error signing up. Please try again.");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "https://stgapi-bnpl.tarality.io/api/v2/user/verifyOtp",
        { email, otp }
      );
      if (!res.data.error) {
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setError(res.data.message);
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again.");
      console.error(error);
      setError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!otpSent ? (
        <form
          onSubmit={handleSignUp}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
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
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full my-1 flex items-center justify-end text-blue-600 hover:underline focus:outline-none"
          >
            Already a user? Login
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleOtpVerification}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
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
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          >
            Verify OTP
          </button>
          <button
            type="button"
            onClick={() => api.resendOtp({ email })}
            className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Resend OTP
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300 mt-4"
          >
            Go to Login
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
