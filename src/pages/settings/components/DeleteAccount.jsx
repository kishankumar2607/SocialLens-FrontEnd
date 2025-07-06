import React from "react";
import { useNavigate } from "react-router-dom";
import {
  apiDelete,
  deleteAllCookies,
  clearAllSessionStorage,
} from "../../../utils/utils";
import { AuthAPIDeleteAccount } from "../../../api/api";
import Swal from "sweetalert2";
import { showError, showSuccess } from "../../../utils/helperFunction";

const DeleteAccount = ({ setLoading }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete account?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await apiDelete(AuthAPIDeleteAccount);
          if (res.status === 200) {
            showSuccess("Account deleted.");
            deleteAllCookies();
            clearAllSessionStorage();
            navigate("/register");
          } else {
            showError("Failed to delete account");
          }
        } catch (err) {
          showError("Delete failed.");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <section className="card-white-custom space-y-4">
      <h2 className="text-xl font-bold mb-4 text-error">Danger Zone</h2>
      <p className="text-black">
        Deleting your account is permanent and cannot be undone.
      </p>
      <button
        onClick={handleDelete}
        className="btn-secondary bg-error hover:bg-error-dark mt-2"
      >
        Delete My Account
      </button>
    </section>
  );
};

export default DeleteAccount;
