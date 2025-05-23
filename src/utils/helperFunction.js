import { toast } from "react-toastify";

// function to show the flash message
const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

const showErrorBottom = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
  });
};

const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

const showSuccessBottom = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
  });
};

export { showError, showSuccess, showErrorBottom, showSuccessBottom };
