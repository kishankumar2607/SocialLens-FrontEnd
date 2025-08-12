import { useEffect, useState } from "react";
import { apiGet } from "../utils/utils";
import { LinkedInAccountDetailsAPI } from "../api/api";
import { linkedInMock } from "../utils/mockLinkedInData";

export default function useLinkedIn() {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //   console.log("isConnected:", isConnected);
  //   console.log("data:", data);
  //   console.log("errorMessage:", errorMessage);
  // console.log("userData:", userData);

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

      let connected = false;

      if (typeof payload.connected === "boolean") {
        connected = payload.connected;
      } else if (typeof accountDetails.connected === "boolean") {
        connected = accountDetails.connected;
      } else {
        connected = Boolean(accountDetails.id || accountDetails.urn);
      }

      setIsConnected(connected);

      if (!connected) {
        setUserData(null);
        setData(null);
        setErrorMessage(
          "Please connect your LinkedIn account. Go to Settings → Linked Accounts and connect it."
        );
        return;
      }

      setUserData({
        accountDetails,
      });

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
