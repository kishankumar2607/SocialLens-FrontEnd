import React, { useState, useEffect, useCallback } from "react";
import { apiGet, apiDelete } from "../../../utils/utils";
import { AccountsAPI } from "../../../api/api";
import Swal from "sweetalert2";
import { FaLinkedin, FaUnlink, FaPlug } from "react-icons/fa";
import { showError, showSuccess } from "../../../utils/helperFunction";

const ConnectedAccounts = ({ setLoading }) => {
  const [accounts, setAccounts] = useState(null);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiGet(AccountsAPI);
      if (res.status === 200) {
        setAccounts(res.data.accounts || {});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleDisconnect = (platform) => {
    Swal.fire({
      title: `Disconnect ${platform}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, disconnect!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await apiDelete(`${AccountsAPI}/${platform}`);
          showSuccess(`${platform} disconnected!`);
          fetchAccounts();
        } catch (err) {
          showError(err?.message || `Failed to disconnect ${platform}`);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <section className="card-white-custom space-y-6">
      <h2 className="text-xl font-bold mb-6">Connected Accounts</h2>
      <div className="rounded-lg border p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <FaLinkedin className="text-blue-700 size-8" />
          <h3 className="text-black font-semibold text-lg">LinkedIn</h3>
          <span
            className={`ml-auto text-sm ${
              accounts?.linkedin?.connected ? "text-green-600" : "text-red-500"
            }`}
          >
            {accounts?.linkedin?.connected ? "Connected" : "Not Connected"}
          </span>
        </div>
        {accounts?.linkedin?.connected ? (
          <>
            <a
              className="text-blue-700 underline mb-4 block"
              href={accounts.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {accounts.linkedin.url}
            </a>
            <button
              className="btn-secondary text-sm bg-red-100 hover:bg-red-200 text-red-700"
              onClick={() => handleDisconnect("linkedin")}
            >
              <FaUnlink className="inline-block mr-1" /> Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              (window.location.href =
                "https://api.sociallens.kishankumardas.com/auth/linkedin")
            }
            className="btn-primary text-sm bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <FaPlug /> Connect LinkedIn
          </button>
        )}
      </div>
    </section>
  );
};

export default ConnectedAccounts;
