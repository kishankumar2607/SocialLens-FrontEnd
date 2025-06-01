import React from "react";
import { getCookie } from "../../utils/utils";
import { decryptData } from "../../utils/encryptDecryptData";

const SettingsPage = () => {
  const user = JSON.parse(getCookie("userName"));
  const decryptedDate = decryptData(user);
  // console.log(decryptedDate);

  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-12">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center text-3xl font-bold">
            {(decryptedDate?.[0] || "U").toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-text-secondary text-sm">
              Manage your account details, preferences, and security.
            </p>
          </div>
        </div>

        {/* User Details */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="input-default w-full"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input-default w-full"
          />
          <button className="btn-primary mt-4">Save Details</button>
        </section>

        {/* Change Password */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            className="input-default w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            className="input-default w-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="input-default w-full"
          />
          <button className="btn-primary mt-4">Update Password</button>
        </section>

        {/* Notification Preferences */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">
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

        {/* Privacy Settings */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          <select className="input-default w-full">
            <option>Public Profile</option>
            <option>Private Profile</option>
            <option>Friends Only</option>
          </select>
          <button className="btn-primary mt-4">Save Privacy</button>
        </section>

        {/* Connected Accounts */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
          <div className="flex justify-between">
            <span>Instagram</span>
            <button className="btn-secondary text-sm">Disconnect</button>
          </div>
          <div className="flex justify-between">
            <span>Twitter</span>
            <button className="btn-secondary text-sm">Disconnect</button>
          </div>
          <div className="flex justify-between">
            <span>LinkedIn</span>
            <button className="btn-secondary text-sm">Disconnect</button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-error">Danger Zone</h2>
          <p className="text-text-secondary">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button className="btn-secondary bg-error hover:bg-error-dark mt-2">
            Delete My Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
