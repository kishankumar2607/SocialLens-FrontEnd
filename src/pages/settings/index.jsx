
import React, { useState } from "react";
import UserDetails from "./components/UserDetails";
import ChangePassword from "./components/ChangePassword";
import NotificationPreferences from "./components/NotificationPreferences";
import ConnectedAccounts from "./components/ConnectedAccounts";
import DeleteAccount from "./components/DeleteAccount";
import Loader from "../../components/Loader";


const SettingsPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white text-white px-6 py-12">
      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center text-3xl font-bold">
            S
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">Settings</h1>
            <p className="text-black text-lg pt-1">
              Manage your account details, preferences, and security.
            </p>
          </div>
        </div>

        <UserDetails setLoading={setLoading} />
        <ChangePassword setLoading={setLoading} />
        <NotificationPreferences setLoading={setLoading} />
        <ConnectedAccounts setLoading={setLoading} />
        <DeleteAccount setLoading={setLoading} />
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default SettingsPage;
