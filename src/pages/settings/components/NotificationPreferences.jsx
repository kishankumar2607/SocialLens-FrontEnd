import React, { useState, useEffect } from "react";
import { apiGet, apiPut } from "../../../utils/utils";
import { AccountsAPI, AuthAPINotifications } from "../../../api/api";
import { showError, showSuccess } from "../../../utils/helperFunction";

const NotificationPreferences = ({ setLoading }) => {
  const [emailNotifications, setEmailNotifications] = useState(false);

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        setLoading(true);
        const res = await apiGet(AccountsAPI);
        if (res.status === 200) {
          setEmailNotifications(res.data.emailNotification || false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrefs();
  }, [setLoading]);

  const save = async () => {
    try {
      setLoading(true);
      await apiPut(AuthAPINotifications, {
        emailNotification: emailNotifications,
      });
      showSuccess("Preferences saved!");
    } catch (err) {
      showError(err?.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <button className="btn-primary mt-4" onClick={save}>
        Save Preferences
      </button>
    </section>
  );
};

export default NotificationPreferences;
