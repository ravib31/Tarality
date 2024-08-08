import React, { useState } from "react";
import { forgotPassword, resendOtp, resetPassword, verifyOtp } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      let res1 = await forgotPassword({ email });
      console.log("res1", res1);
      if (!res1.data.error) {
        toast.success(res1.data.responseMessage);
        setOtpSent(true);
      } else {
        toast.error(res1.data.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      let res2 = await verifyOtp({ email, otp });
      console.log("res2", res2);
      if (!res2.data.error) {
        toast.success(res2.data.responseMessage);
        setOtpVerified(true);
      } else {
        toast.error(res2.data.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    toast.error("Available in PRO Version")
    // try {
    //   let res3 = await resetPassword({
    //     email,
    //     password: newPassword,
    //     confirmPassword: newPassword,
    //   });
    //   console.log("res3", res3);
    //   if (!res3.data.error) {
    //     toast.success(res3.data.responseMessage);
    //     navigate("/login");
    //   } else {
    //     toast.success(res3.data.responseMessage);
    //   }
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!otpSent ? (
        <form
          onSubmit={handleSendOtp}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forgot Password
          </h2>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <form onSubmit={handleOtpVerification} className="mb-6">
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
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => resendOtp({ email })}
              className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Resend OTP
            </button>
          </form>
          {otpVerified && (
            <form onSubmit={handlePasswordReset}>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Reset Password
              </h2>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
