// const AUTH_URL = "https://api.sociallens.kishankumardas.com/auth";
// const BASE_URL = "https://api.sociallens.kishankumardas.com/api";

const AUTH_URL = "http://localhost:8000/auth";
const BASE_URL = "http://localhost:8000/api";

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
export const ContactAPI = BASE_URL + "/contact-form";

//Support Api
export const SupportAPI = BASE_URL + "/support-form";

//Accounts Api
export const AccountsAPI = BASE_URL + "/accounts";
export const LinkedInAccountDetailsAPI = BASE_URL + "/accounts/linkedin";

//LinkedIn Api
export const LinkedInAPI = AUTH_URL + "/linkedin";
export const LinkedInAPIProfileUrl = (userId) =>
  `${AUTH_URL}/linkedin/profileUrl/${encodeURIComponent(userId)}`;

export const LinkedInAuthDelete = AUTH_URL + "/linkedin/unlink";
