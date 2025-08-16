import React, { useState, useEffect, useCallback } from "react";
import { apiGet } from "../../../utils/utils";
import {
  LinkedInAccountDetailsAPI,
  LinkedInAuthDelete,
} from "../../../api/api";
import Swal from "sweetalert2";
import { FaLinkedin, FaUnlink, FaPlug } from "react-icons/fa";
import { showError, showSuccess } from "../../../utils/helperFunction";
import axios from "axios";
import defaultIcon from "../../../assets/teams/defaultUser.png";

const LinkedInAccount = ({ setLoading }) => {
  const [accounts, setAccounts] = useState({});

  const fetchAccount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiGet(
        LinkedInAccountDetailsAPI,
        {},
        {},
        { withCredentials: true }
      );
      const data = response.data.accountDetails || {};
      // console.log("LinkedIn Account Response:", data);
      if (response.status === 200) {
        setAccounts(data);
      } else {
        showError("Failed to fetch LinkedIn account details.");
      }
    } catch (error) {
      showError("An error occurred while fetching LinkedIn account details.");
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const handleDisconnect = async () => {
    const result = await Swal.fire({
      title: "Disconnect LinkedIn",
      text: "Are you sure you want to disconnect your LinkedIn account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, disconnect!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(LinkedInAuthDelete, {
        withCredentials: true,
      });

      if (response.status === 200) {
        showSuccess("LinkedIn account disconnected successfully.");
        fetchAccount();
      }
    } catch {
      showError("An error occurred while disconnecting your LinkedIn account.");
    }
  };

  const linkedIn = accounts || {};

  const isConnected = linkedIn.connected || false;

  // console.log("LinkedIn Account Details:", linkedIn);

  return (
    <section
      className={`rounded-lg border p-5 shadow-sm ${
        isConnected ? "border-green-400 bg-green-50" : "border-gray-300"
      }`}
    >
      <div className="flex flex-wrap items-center gap-1">
        <FaLinkedin className="text-blue-700 size-8" />
        <h2 className="text-black font-semibold text-lg capitalize">
          LinkedIn
        </h2>
        <span
          className={`ml-auto text-sm ${
            isConnected ? "text-green-600" : "text-red-500"
          }`}
        >
          {isConnected ? "Connected" : "Not Connected"}
        </span>
      </div>

      {linkedIn.connected ? (
        <>
          <div className="flex items-center gap-2 mb-3 mt-3">
            <img
              src={linkedIn.profileURL || defaultIcon}
              alt="LinkedIn Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <span className="text-blue-700 font-semibold text-lg capitalize">
                {linkedIn.name}
              </span>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="btn-secondary text-sm bg-red-100 hover:bg-red-200 text-red-700"
          >
            <FaUnlink className="inline-block mr-1" /> Disconnect
          </button>
        </>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-3 mt-3">
            <span className="text-blue-700 font-semibold text-lg capitalize">
              Connect your LinkedIn account.
            </span>
          </div>
          <a
            href="https://api.sociallens.kishankumardas.com/auth/linkedin"
            className="btn-primary text-sm bg-blue-600 hover:bg-blue-700"
          >
            <FaPlug className="inline-block mr-1" /> Connect
          </a>
        </div>
      )}
    </section>
  );
};

export default LinkedInAccount;
