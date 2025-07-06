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
  const [original, setOriginal] = useState({});

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiGet(AccountsAPI);
      const data = res.data || {};
      //   console.log(data);
      if (res.status === 200) {
        const decryptedPhone = decryptData(data.phoneNumber || "");
        const phoneNumber = decryptedPhone
          ? decryptedPhone.replace(/\D/g, "")
          : "";
        setPhone({
          countryCode: data.phoneCountryCode || "+1",
          number: phoneNumber,
        });
        setPhoneValue(`${data.phoneCountryCode || "+1"}${phoneNumber}`);
        setOriginal({
          name,
          phoneCountryCode: data.phoneCountryCode || "+1",
          phoneNumber,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [name, setLoading]);

  useEffect(() => {
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
    setName(decryptData(user));
    setDecryptedEmail(decryptData(userEmail));
    fetchDetails();
  }, [fetchDetails]);

  //   console.log("Data in phone:", phone);

  const hasChanges = () =>
    name !== original.name ||
    phone.countryCode !== original.phoneCountryCode ||
    phone.number !== original.phoneNumber;

  const save = async () => {
    if (!name || !phoneValue) {
      return showError("Please fill all fields.");
    }
    try {
      setLoading(true);
      await apiPut(AuthAPIProfile, {
        name,
        phoneNumber: encryptData(phone.number),
        phoneCountryCode: phone.countryCode,
      });
      const userName = encryptData(name);
      getCookie("userName")
        ? setCookie("userName", userName, 7)
        : setSessionStorage("userName", userName);
      showSuccess("Details saved!");
      fetchDetails();
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
          let clean = value.replace(/\D/g, "");
          if (clean.startsWith(country.dialCode))
            clean = clean.slice(country.dialCode.length);
          setPhone({ countryCode: `+${country.dialCode}`, number: clean });
          setPhoneValue(value);
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
