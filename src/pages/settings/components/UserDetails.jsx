import React, { useState, useEffect, useCallback } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  apiGet,
  apiPut,
  getCookie,
  getSessionStorage,
  setCookie,
  setSessionStorage,
} from "../../../utils/utils";
import { encryptData, decryptData } from "../../../utils/encryptDecryptData";
import { AuthAPIProfile, AccountsAPI } from "../../../api/api";
import { showError, showSuccess } from "../../../utils/helperFunction";

const UserDetails = ({ setLoading }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState({ countryCode: "", number: "" });
  const [phoneValue, setPhoneValue] = useState("");
  const [decryptedEmail, setDecryptedEmail] = useState("");
  const [original, setOriginal] = useState({
    name: "",
    phoneCountryCode: "+1",
    phoneNumber: "",
  });

  // helpers to load cookie/session fallbacks
  const getStoredName = () => {
    const raw =
      (getCookie("userName") && JSON.parse(getCookie("userName"))) ||
      getSessionStorage("userName") ||
      null;
    return decryptData(raw) || "";
  };

  const getStoredEmail = () => {
    const raw =
      (getCookie("userEmail") && JSON.parse(getCookie("userEmail"))) ||
      getSessionStorage("userEmail") ||
      null;
    return decryptData(raw) || "";
  };

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiGet(AccountsAPI);
      const data = res?.data || {};

      if (res.status === 200) {
        const apiName = data.name?.toString?.() || ""; // <- take name from API
        const nameFromApiOrStored = apiName || getStoredName();
        setName(nameFromApiOrStored);

        const decryptedPhone = decryptData(data.phoneNumber || "");
        const phoneNumberDigits = decryptedPhone
          ? decryptedPhone.replace(/\D/g, "")
          : "";
        const cc = data.phoneCountryCode || "+1";

        setPhone({ countryCode: cc, number: phoneNumberDigits });
        setPhoneValue(`${cc}${phoneNumberDigits}`);

        // IMPORTANT: set original from API response, not from state `name`
        setOriginal({
          name: nameFromApiOrStored,
          phoneCountryCode: cc,
          phoneNumber: phoneNumberDigits,
        });
      }
    } catch (err) {
      // optional: showError("Failed to fetch user details.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    setDecryptedEmail(getStoredEmail());
    fetchDetails();
  }, [fetchDetails]);

  const hasChanges = () =>
    name.trim() !== (original.name || "").trim() ||
    phone.countryCode !== original.phoneCountryCode ||
    phone.number !== original.phoneNumber;

  const save = async () => {
    if (!name.trim() || !phoneValue) {
      return showError("Please fill all fields.");
    }

    try {
      setLoading(true);

      await apiPut(AuthAPIProfile, {
        name: name.trim(),
        phoneNumber: encryptData(phone.number),
        phoneCountryCode: phone.countryCode,
      });

      // Persist the new name to cookie/session
      const userNameEncrypted = encryptData(name.trim());
      if (getCookie("userName")) {
        setCookie("userName", userNameEncrypted, 7);
      } else {
        setSessionStorage("userName", userNameEncrypted);
      }

      // Update originals locally so the Save button disables correctly
      setOriginal({
        name: name.trim(),
        phoneCountryCode: phone.countryCode,
        phoneNumber: phone.number,
      });

      showSuccess("Details saved!");
      // Optional: refetch if the backend can mutate/normalize data
      // await fetchDetails();
    } catch (err) {
      showError(err?.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          // value may include + and spaces; keep digits only for storage
          let clean = (value || "").replace(/\D/g, "");
          const dial = country?.dialCode || "1";
          if (clean.startsWith(dial)) clean = clean.slice(dial.length);
          const cc = `+${dial}`;
          setPhone({ countryCode: cc, number: clean });
          setPhoneValue(`${cc}${clean}`);
        }}
        international
        withCountryCallingCode
        inputStyle={{
          width: "100%",
          background: "white",
          color: "black",
          border: "1px solid #000",
        }}
        buttonStyle={{ background: "white", border: "1px solid #000" }}
      />

      <input
        type="email"
        value={decryptedEmail}
        disabled
        className="input-default bg-gray-200 text-black w-full cursor-not-allowed"
      />

      <button
        className={`btn-primary mt-4 ${
          !hasChanges() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={save}
        disabled={!hasChanges()}
      >
        Save Details
      </button>
    </section>
  );
};

export default UserDetails;
