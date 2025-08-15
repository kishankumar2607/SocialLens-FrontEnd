import { useEffect, useState } from "react";
import { apiGet } from "../utils/utils";
import { LinkedInAccountDetailsAPI } from "../api/api";
import { linkedInMock } from "../utils/mockLinkedInData";

// Optional env toggle: VITE_USE_MOCK_LINKEDIN=true
const useEnvMock =
  typeof import.meta !== "undefined" &&
  import.meta?.env?.VITE_USE_MOCK_LINKEDIN === "true";

const handleFromUrl = (url) => {
  try {
    if (!url) return "";
    const u = new URL(url);
    const segs = u.pathname.split("/").filter(Boolean);
    return segs[segs.length - 1] || "";
  } catch {
    return "";
  }
};

export default function useLinkedIn() {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const checkConnection = async () => {
    try {
      const response = await apiGet(
        LinkedInAccountDetailsAPI,
        {},
        {},
        { withCredentials: true }
      );

      const payload = response?.data ?? {};
      const accountDetails = payload?.accountDetails ?? {};

      // decide if connected
      const connected =
        typeof payload.connected === "boolean"
          ? payload.connected
          : typeof accountDetails.connected === "boolean"
          ? accountDetails.connected
          : Boolean(accountDetails.id || accountDetails.urn);

      // allow a query param to force mock (e.g. ?mock=1)
      const params = new URLSearchParams(window.location.search);
      const mockQ = params.get("mock") === "1";

      setIsConnected(connected || useEnvMock || mockQ);

      if (!(connected || useEnvMock || mockQ)) {
        setUserData(null);
        setData(null);
        setErrorMessage(
          "Please connect your LinkedIn account. Go to Settings → Linked Accounts and connect it."
        );
        return;
      }

      // Normalize fields from DB for the UI chip
      const normalized = {
        name: accountDetails.name || "LinkedIn",
        url: accountDetails.url || "",
        avatar: accountDetails.profileURL || "",
        profileURL: accountDetails.profileURL || "",
        handle:
          accountDetails.handle ||
          handleFromUrl(accountDetails.url) ||
          (accountDetails.name
            ? accountDetails.name.trim().toLowerCase().replace(/\s+/g, "")
            : "account"),
        id: accountDetails.id || "",
        urn: accountDetails.urn || "",
      };

      setUserData({ accountDetails: normalized });

      // Always feed the dashboard with mock analytics for now
      setData(linkedInMock);

      setErrorMessage("");
    } catch (err) {
      setIsConnected(false);
      setUserData(null);
      setData(null);
      setErrorMessage(
        "We couldn’t verify your LinkedIn connection. Please try again or connect it in Settings → Linked Accounts."
      );
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await checkConnection();
      setLoading(false);
    })();
  }, []);

  return { loading, isConnected, data, userData, errorMessage };
}
