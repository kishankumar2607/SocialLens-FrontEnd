import { toast } from "react-toastify";

// function to show the flash message
const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    style: {
      backgroundColor: "#1F2937",
      color: "#FFFFFF",
    },
  });
};

const showErrorBottom = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    theme: "dark",
    style: {
      backgroundColor: "#1F2937",
      color: "#FFFFFF",
    },
  });
};

const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    style: {
      backgroundColor: "#1F2937",
      color: "#FFFFFF",
    },
  });
};

const showSuccessBottom = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    theme: "dark",
    style: {
      backgroundColor: "#1F2937",
      color: "#FFFFFF",
    },
  });
};

export { showError, showSuccess, showErrorBottom, showSuccessBottom };
