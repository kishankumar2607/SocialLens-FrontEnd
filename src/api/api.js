const AUTH_URL = "https://api.sociallens.kishankumardas.com/auth";
const Base_URL = "https://api.sociallens.kishankumardas.com/api";

// const AUTH_URL = "http://localhost:8000/auth";
// const Base_URL = "http://localhost:8000/api";

//Auth Api
export const AuthAPIRegister = AUTH_URL + "/register";
export const AuthAPILogin = AUTH_URL + "/login";
export const AuthAPILogout = AUTH_URL + "/logout";
export const AuthAPIForgotPassword = AUTH_URL + "/forgot-password";
export const AuthAPIVerifyOtp = AUTH_URL + "/verify-otp";
export const AuthAPIResetPassword = AUTH_URL + "/reset-password";
export const AuthAPIDeleteAccount = AUTH_URL + "/delete-account";
export const AuthAPIProfile = AUTH_URL + "/profile";
export const AuthAPIUpdatePassword = AUTH_URL + "/update-password";
export const AuthAPINotifications = AUTH_URL + "/notifications";

//Contact Api
export const ContactAPI = Base_URL + "/contact-form";

//Support Api
export const SupportAPI = Base_URL + "/support-form";

//Accounts Api
export const AccountsAPI = Base_URL + "/accounts";
