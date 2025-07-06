import React, { useState } from "react";
import { apiPut } from "../../../utils/utils";
import { AuthAPIUpdatePassword } from "../../../api/api";
import { showError, showSuccess } from "../../../utils/helperFunction";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = ({ setLoading }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-]).{6,}$/;

  const handleChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return showError("Fill all fields.");
    }
    if (newPassword !== confirmPassword) {
      return showError("Passwords do not match.");
    }
    if (!passwordRegex.test(newPassword)) {
      return showError("Use letters, numbers & special.");
    }
    try {
      setLoading(true);
      await apiPut(AuthAPIUpdatePassword, { oldPassword, newPassword });
      showSuccess("Password updated!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showError(err?.message || "Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card-white-custom space-y-4">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      {[
        ["Current", oldPassword, setOldPassword, showOld, setShowOld],
        ["New", newPassword, setNewPassword, showNew, setShowNew],
        [
          "Confirm",
          confirmPassword,
          setConfirmPassword,
          showConfirm,
          setShowConfirm,
        ],
      ].map(([label, val, setVal, show, setShow]) => (
        <div className="relative" key={label}>
          <input
            type={show ? "text" : "password"}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={`${label} Password`}
            className="input-default bg-white text-black w-full"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute top-[12px] right-3"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      ))}
      <button className="btn-primary mt-4" onClick={handleChange}>
        Update Password
      </button>
    </section>
  );
};

export default ChangePassword;
