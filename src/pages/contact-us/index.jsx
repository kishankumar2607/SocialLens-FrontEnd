import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import TextInput from "../../components/TextInput";
import TextareaInput from "../../components/TextareaInput";
import { apiPost } from "../../utils/utils";
import { ContactAPI } from "../../api/api";
import { showError, showSuccess } from "../../utils/helperFunction";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

const initialState = {
  isLoading: false,
  fullName: "",
  email: "",
  message: "",
};

const ContactPage = () => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const { isLoading, fullName, email, message } = state;

  // console.log("state value", state);

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!fullName) {
      newErrors.fullName = "Name is required";
    } else if (!fullName.match(/^[a-zA-Z\s]+$/)) {
      newErrors.fullName = "Enter valid name";
    }

    // Validate Email
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (
      !email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,4})$/i)
    ) {
      newErrors.email = "Enter valid email address";
    }

    // Validate Message
    if (!message) {
      newErrors.message = "Message is required";
    }
    // else if (!/^[a-zA-Z0-9\s]*$/.test(message)) {
    //   newErrors.message = "Enter valid message";
    // }
    // else if (
    //   message.includes("'") ||
    //   message.includes('"') ||
    //   message.includes(";")
    // ) {
    //   newErrors.message = "Message contains illegal characters";
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const params = {
    fullName,
    email,
    message,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateState({ isLoading: true });
      try {
        const response = await apiPost(ContactAPI, params);
        // console.log("contact response", response);

        const { data, status } = response;

        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title:
        //     "Thank you so much for your interest. We will get back to you shortly.",
        //   showConfirmButton: true,
        //   timer: 3500,
        // });

        if (status === 201) {
          showSuccess(data.message);
        }
        updateState({ isLoading: false });
        setState(initialState);
      } catch (error) {
        showError(
          error.errors.fullname || error.errors.email || error.errors.message
        );
        updateState({ isLoading: false });
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden px-6 py-16">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
        {/* Left Info Section (no image, with icons) */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold mb-4">Let’s Connect</h2>
          <p className="text-text-secondary text-lg">
            We’re here to help you grow your social media presence. Reach out
            and let’s start a conversation!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FiMail className="text-primary-light text-3xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-text-secondary text-sm">
                  support@sociallens.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="text-primary-light text-3xl" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-text-secondary text-sm">+1 (234) 567-8901</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FiMapPin className="text-primary-light text-3xl" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-text-secondary text-sm">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <TextInput
                name="name"
                type="text"
                value={fullName}
                onChange={(fullName) => updateState({ fullName })}
                placeholder="John Doe"
                error={errors.fullName}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <TextInput
                name="email"
                type="email"
                value={email}
                onChange={(email) => updateState({ email })}
                placeholder="you@example.com"
                error={errors.email}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <TextareaInput
                name="message"
                value={message}
                onChange={(message) => updateState({ message })}
                rows={5}
                placeholder="Your message..."
                error={errors.message}
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
              onClick={(e) => handleSubmit(e)}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
