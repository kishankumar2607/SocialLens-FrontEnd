
const AUTH_URL = "http://localhost:8000/auth";
const Base_URL = "http://localhost:8000/api";

//Auth Api
export const AuthAPIRegister = AUTH_URL + "/register"; 
export const AuthAPILogin = AUTH_URL + "/login"; 
export const AuthAPIForgotPassword = AUTH_URL + "/forgot-password";
export const AuthAPIVerifyOtp = AUTH_URL + "/verify-otp";
export const AuthAPIResetPassword = AUTH_URL + "/reset-password";

//Contact Api
export const ContactAPI = Base_URL + "/contact-form";