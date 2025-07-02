import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  apiGet,
  apiPut,
  getCookie,
  getSessionStorage,
  setCookie,
  setSessionStorage,
  apiDelete,
  deleteAllCookies,
  clearAllSessionStorage,
} from "../../utils/utils";
import {
  AuthAPIProfile,
  AuthAPIUpdatePassword,
  AuthAPIDeleteAccount,
  AccountsAPI,
  AuthAPINotifications,
} from "../../api/api";
import { encryptData, decryptData } from "../../utils/encryptDecryptData";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { showError, showSuccess } from "../../utils/helperFunction";
import Loader from "../../components/Loader";
import {
  FaInstagramSquare,
  FaLinkedin,
  FaFacebookSquare,
  FaPlug,
  FaUnlink,
  FaEdit,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Eye, EyeOff } from "lucide-react";

const platforms = ["instagram", "twitter", "facebook", "linkedin"];

const SettingsPage = () => {
  const navigate = useNavigate();
  const user = getCookie("userName")
    ? JSON.parse(getCookie("userName"))
    : getSessionStorage("userName")
    ? getSessionStorage("userName")
    : null;

  const userEmail = getCookie("userEmail")
    ? JSON.parse(getCookie("userEmail"))
    : getSessionStorage("userEmail")
    ? getSessionStorage("userEmail")
    : null;

  const decryptedData = decryptData(user);
  const decryptedEmail = decryptData(userEmail);
  // console.log(decryptedData);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(decryptedData);
  const [phone, setPhone] = useState({ countryCode: "+1", number: "" });
  const [phoneValue, setPhoneValue] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accounts, setAccounts] = useState(null);
  const [urlInputs, setUrlInputs] = useState({});
  const [editMode, setEditMode] = useState({});
  // const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return showError("Please fill in all password fields.");
    }

    if (newPassword !== confirmPassword) {
      return showError("New password and confirm password do not match.");
    }

    if (newPassword.length < 6 || !passwordRegex.test(newPassword)) {
      return showError(
        "Password must be at least 6 characters and include letters, numbers, and a special character"
      );
    }

    try {
      setLoading(true);
      const payload = {
        oldPassword,
        newPassword,
      };

      // console.log("Password Update Payload:", payload);

      const response = await apiPut(AuthAPIUpdatePassword, payload);
      // console.log("Password Update Response:", response);
      showSuccess(response?.message || "Password updated successfully!");

      // Reset password fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showError(error?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const saveUserDetails = async () => {
    if (!name && !phoneValue) {
      return showError("Please enter your name and phone number.");
    } else if (!name) {
      return showError("Please enter your name.");
    } else if (!phoneValue) {
      return showError("Please enter your phone number.");
    }

    try {
      setLoading(true);
      await apiPut(AuthAPIProfile, {
        name,
        phoneNumber: encryptData(phone.number),
        phoneCountryCode: phone.countryCode,
      });

      // Update cookies and session storage
      const userName = encryptData(name);
      if (getCookie("userName")) {
        setCookie("userName", userName, 7);
      } else {
        setSessionStorage("userName", userName);
      }

      showSuccess("Details saved successfully!");
      fetchAccountDetails();
      setLoading(false);
    } catch (err) {
      showError(err?.message || "Failed to update details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const response = await apiGet(AccountsAPI);
      // console.log("Account Details Response:", response.data);
      if (response.status === 200) {
        const data = response.data.accounts || {};
        const phoneNumber = response.data.phoneNumber || "";
        const phoneCountryCode = response.data.phoneCountryCode || "+1";
        const emailNotifications = response.data.emailNotification || false;
        const decryptedPhoneNumber = decryptData(phoneNumber);
        setPhone({
          countryCode: phoneCountryCode,
          number: decryptedPhoneNumber.replace(/\D/g, ""),
        });
        setPhoneValue(decryptedPhoneNumber);
        setAccounts(data);
        setUrlInputs(data);
        setEditMode({});
        setEmailNotifications(emailNotifications);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching account details:", error);
      setLoading(false);
    }
  };

  const handleAddOrUpdateAccount = async (platform, isUpdate = false) => {
    const url = urlInputs[platform]?.url || "";
    if (!url) return showError("Please enter a valid URL before saving.");

    try {
      setLoading(true);
      const payload = {
        accounts: {
          [platform]: {
            connected: true,
            url,
          },
        },
      };
      const response = await apiPut(AccountsAPI, payload);
      showSuccess(
        response.message || `${platform} ${isUpdate ? "updated" : "connected"}!`
      );
      fetchAccountDetails();
    } catch (err) {
      const errorMsg =
        err?.error?.includes("not a valid URL") ||
        err?.message?.includes("not a valid URL")
          ? `The URL "${url}" is not valid for ${platform}. Please enter a full profile link (e.g. https://www.${platform}.com/yourusername)`
          : err?.message || `Failed to connect ${platform}`;
      Swal.fire({
        title: "Update Failed",
        text: errorMsg,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = (platform) => {
    Swal.fire({
      title: `Disconnect ${platform}?`,
      text: "This will remove the connected URL.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, disconnect!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await apiDelete(`${AccountsAPI}/${platform}`);
          showSuccess(response.message || `${platform} disconnected!`);
          fetchAccountDetails();
        } catch (err) {
          showError(err?.message || `Failed to disconnect ${platform}`);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleUrlChange = (platform, value) => {
    setUrlInputs((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], url: value },
    }));

    setEditMode((prev) => ({
      ...prev,
      [platform]: accounts?.[platform]?.url !== value,
    }));
  };

  const savePreferences = async () => {
    try {
      setLoading(true);
      const payload = {
        emailNotification: emailNotifications,
      };
      const response = await apiPut(AuthAPINotifications, payload);
      showSuccess(response?.message || "Preferences saved successfully!");
      fetchAccountDetails();
    } catch (err) {
      showError(err?.message || "Failed to save preferences!");
    } finally {
      setLoading(false);
    }
  };

  const deleteApiResponse = async () => {
    try {
      setLoading(true);
      const response = await apiDelete(AuthAPIDeleteAccount);

      // console.log("delete response", response);

      if (response.status === 200) {
        showSuccess(response?.data?.message);
        deleteAllCookies();
        clearAllSessionStorage();
        navigate("/register");
        setLoading(false);
      } else {
        showError("Failed to delete the account");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete account?",
      text: "This action can't be undone and your data will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApiResponse();
      }
    });
  };

  const platformIcons = {
    instagram: <FaInstagramSquare className="text-pink-500 size-8" />,
    twitter: <FaSquareXTwitter className="text-black size-8" />,
    facebook: <FaFacebookSquare className="text-blue-600 size-8" />,
    linkedin: <FaLinkedin className="text-blue-700 size-8" />,
  };

  return (
    <div className="min-h-screen bg-white text-white px-6 py-12">
      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center text-3xl font-bold">
            {(decryptedData?.[0] || "U").toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">Settings</h1>
            <p className="text-black text-lg pt-1">
              Manage your account details, preferences, and security.
            </p>
          </div>
        </div>

        {/* User Details */}
        <section className="card-white-custom space-y-4">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="input-default bg-white text-black w-full"
          />

          <PhoneInput
            country={"ca"}
            value={phoneValue}
            onChange={(value, country) => {
              let cleanNumber = value.replace(/\D/g, "");
              if (cleanNumber.startsWith(country.dialCode)) {
                cleanNumber = cleanNumber.slice(country.dialCode.length);
              }
              setPhone({
                countryCode: `+${country.dialCode}`,
                number: cleanNumber,
              });
              setPhoneValue(value);
            }}
            international
            withCountryCallingCode
            // containerClass="input-default bg-white text-black w-full"
            buttonStyle={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid #000000",
            }}
            inputStyle={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              border: "1px solid #000000",
            }}
            dropdownClass="bg-white text-black"
          />

          <input
            type="email"
            value={decryptedEmail}
            placeholder="Email Address"
            disabled
            className="input-default bg-gray-200 text-black w-full cursor-not-allowed"
          />

          <button className="btn-primary mt-4" onClick={saveUserDetails}>
            Save Details
          </button>
        </section>

        {/* Change Password */}
        <section className="card-white-custom space-y-4">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current Password"
              className="input-default bg-white text-black w-full"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute top-[12px] right-3 text-text-tertiary"
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="input-default bg-white text-black w-full"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute top-[12px] right-3 text-text-tertiary"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="input-default bg-white text-black w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[12px] right-3 text-text-tertiary"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            className="btn-primary mt-4"
            onClick={() => handlePasswordChange()}
          >
            Update Password
          </button>
        </section>

        {/* Notification Preferences */}
        <section className="card-white-custom space-y-4">
          <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            Email Notifications
          </label>

          {/* <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
            Push Notifications
          </label> */}

          <button className="btn-primary mt-4" onClick={savePreferences}>
            Save Preferences
          </button>
        </section>

        {/* Connected Accounts */}
        <section className="card-white-custom space-y-6">
          <h2 className="text-xl font-bold mb-6">Connected Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform) => {
              const isConnected = accounts?.[platform]?.connected;
              const urlValue = urlInputs?.[platform]?.url || "";
              return (
                <div
                  key={platform}
                  className={`rounded-lg border p-5 shadow-sm ${
                    isConnected
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {platformIcons[platform]}
                    <h3 className="text-black font-semibold text-lg capitalize">
                      {platform}
                    </h3>
                    <span
                      className={`ml-auto text-sm ${
                        isConnected ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isConnected ? "Connected" : "Not Connected"}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={urlValue}
                    onChange={(e) => handleUrlChange(platform, e.target.value)}
                    className="input-default bg-white text-black w-full mb-4"
                    placeholder={`Enter ${platform} URL`}
                  />

                  <div className="flex justify-end gap-2">
                    {isConnected && editMode[platform] && (
                      <button
                        className="btn-secondary text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                        onClick={() => handleAddOrUpdateAccount(platform, true)}
                      >
                        <FaEdit className="inline-block mr-1" />
                        Update
                      </button>
                    )}
                    {isConnected ? (
                      <button
                        className="btn-secondary text-sm bg-red-100 hover:bg-red-200 text-red-700"
                        onClick={() => handleDisconnect(platform)}
                      >
                        <FaUnlink className="inline-block mr-1" />
                        Disconnect
                      </button>
                    ) : (
                      <button
                        className="btn-primary text-sm bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleAddOrUpdateAccount(platform)}
                      >
                        <FaPlug className="inline-block mr-1" />
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="card-white-custom space-y-4">
          <h2 className="text-xl font-bold mb-4 text-error">Danger Zone</h2>
          <p className="text-black">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button
            onClick={() => handleDelete()}
            className="btn-secondary bg-error hover:bg-error-dark mt-2"
          >
            Delete My Account
          </button>
        </section>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default SettingsPage;
