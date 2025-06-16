import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  getCookie,
  getSessionStorage,
  apiDelete,
  deleteAllCookies,
  clearAllSessionStorage,
} from "../../utils/utils";
import { AuthAPIDeleteAccount } from "../../api/api";
import { decryptData } from "../../utils/encryptDecryptData";
import Swal from "sweetalert2";
import { showError, showSuccess } from "../../utils/helperFunction";
import Loader from "../../components/Loader";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  // console.log(decryptedEmail);

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
            value={decryptedData}
            placeholder="Full Name"
            className="input-default bg-white text-black w-full"
          />
          <input
            type="email"
            value={decryptedEmail}
            placeholder="Email Address"
            className="input-default bg-white text-black w-full"
          />
          <button className="btn-primary mt-4">Save Details</button>
        </section>

        {/* Change Password */}
        <section className="card-white-custom space-y-4">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            className="input-default bg-white text-black w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            className="input-default bg-white text-black w-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="input-default bg-white text-black w-full"
          />
          <button className="btn-primary mt-4">Update Password</button>
        </section>

        {/* Notification Preferences */}
        <section className="card-white-custom space-y-4">
          <h2 className="text-xl font-bold mb-4">
            Notification Preferences
          </h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Push Notifications
          </label>
          <button className="btn-primary mt-4">Save Preferences</button>
        </section>

        {/* Connected Accounts */}
        <section className="card-white-custom space-y-4">
          <h2 className="text-xl font-bold mb-4">Connected Accounts</h2>
          <div className="flex justify-between">
            <span>Instagram</span>
            <button className="btn-secondary text-black text-sm">Disconnect</button>
          </div>
          <div className="flex justify-between">
            <span>Twitter</span>
            <button className="btn-secondary text-black text-sm">Disconnect</button>
          </div>
          <div className="flex justify-between">
            <span>LinkedIn</span>
            <button className="btn-secondary text-black text-sm">Disconnect</button>
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
