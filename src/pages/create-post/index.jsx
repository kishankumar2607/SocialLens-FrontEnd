import React, { useState } from "react";
import { LinkedInPostsAPI } from "../../api/api";
import { getCookie, getSessionStorage } from "../../utils/utils";
import { decryptData } from "../../utils/encryptDecryptData";
import { showError, showSuccess } from "../../utils/helperFunction";
import Icon from "../../components/AppIcon";
import FormInput from "./components/FormInput";
import PlatformSelector from "./components/PlatformSelector";
import ImageUploader from "./components/ImageUploader";
import PostPreview from "./components/PostPreview";
import ActionButton from "./components/ActionButton";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [images, setImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    message: false,
    platforms: false,
    images: false,
  });

  const getAuthToken = () => {
    const userFromCookie = getCookie("token");
    const userFromSession = getSessionStorage("token");

    let user = null;

    if (userFromCookie) {
      try {
        user = JSON.parse(userFromCookie);
      } catch (e) {
        console.error("Error parsing userFromCookie:", e);
        user = userFromSession;
      }
    } else {
      user = userFromSession;
    }

    const token = user ? decryptData(user) : null;
    // console.log("Retrieved token:", token);
    return token;
  };

  const handleHashtagChange = (e) => {
    const value = e.target.value;
    setHashtagInput(value);

    const raw = value.trim().split(/\s+/).filter(Boolean);
    setHashtags(raw.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)));
  };

  const handleMessageChange = (value) => {
    if (value.length > 3000) {
      showError("Message cannot exceed 3000 characters");
      return;
    }
    setMessage(value);
    if (formErrors.message && value.trim().length > 0) {
      setFormErrors((prev) => ({ ...prev, message: false }));
    }
  };

  const handlePlatformToggle = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms((prev) => prev.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms((prev) => [...prev, platform]);
      if (formErrors.platforms && selectedPlatforms.length > 0) {
        setFormErrors((prev) => ({ ...prev, platforms: false }));
      }
    }
  };

  const handleImageUpload = (files) => {
    setImages((prev) => [...prev, ...files]);
    if (formErrors.images && files.length > 0) {
      setFormErrors((prev) => ({ ...prev, images: false }));
    }
  };

  const validateForm = () => {
    const errors = {
      message: message.trim().length === 0,
      images: images.length === 0,
      platforms: selectedPlatforms.length === 0,
    };
    setFormErrors(errors);
    return !errors.message && !errors.images;
  };

  const handleCreatePost = async () => {
    if (!validateForm()) return;

    const token = getAuthToken();
    if (!token) {
      showError("Please sign in to post");
      return;
    }

    const formData = new FormData();
    formData.append("text", `${message} ${hashtags.join(" ")}`);

    if (images[0]) {
      formData.append("image", images[0]);
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(LinkedInPostsAPI, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Response status:", response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "LinkedIn Account not connected");
      }

      showSuccess("Post created successfully!");
      handleReset();
    } catch (error) {
      showError(
        error.message.includes("token")
          ? "Session expired. Please log in again"
          : error.message || "Failed to create post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setMessage("");
    setSelectedPlatforms([]);
    setImages([]);
    setHashtags("");
    setHashtagInput("");
    setFormErrors({ message: false, platforms: false, images: false });
  };

  return (
    <div className="flex h-screen bg-white text-text-primary">
      {/* Header + Form & Preview Columns */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="lg:sticky lg:top-0 z-10 bg-surface-light border-b border-border-dark p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Create Post</h1>
          <div className="flex items-center space-x-4">
            <button className="text-text-secondary hover:text-text-primary p-2 rounded-full hover:bg-surface-medium transition-colors">
              <Icon name="Bell" size={20} />
            </button>
            <button className="text-text-secondary hover:text-text-primary p-2 rounded-full hover:bg-surface-medium transition-colors">
              <Icon name="HelpCircle" size={20} />
            </button>
          </div>
        </header>

        {/* Two-Column Layout */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Sticky Form */}
            <div className="lg:sticky lg:top-20 lg:self-start card-white bg-opacity-70 backdrop-blur-md border border-border-dark border-opacity-20 p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-6 text-black">
                Create New Post
              </h2>

              <div className="mb-6">
                <ImageUploader
                  images={images}
                  onUpload={handleImageUpload}
                  error={formErrors.images}
                  errorMessage="Please upload files (images, PDFs, or Word docs)"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Hashtags (space-separated)
                </label>
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={handleHashtagChange}
                  placeholder="#react #social"
                  className="w-full text-black border border-border-dark rounded-md px-3 py-2 placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-light transition-all"
                />
              </div>

              <FormInput
                value={message}
                onChange={handleMessageChange}
                error={formErrors.message}
                errorMessage="Please enter a message"
                maxLength={3000}
              />

              <div className="mt-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Select Platform
                </label>
                <PlatformSelector
                  selectedPlatforms={selectedPlatforms}
                  onToggle={handlePlatformToggle}
                  error={formErrors.platforms}
                  errorMessage="Please select platform"
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
                <ActionButton
                  variant="secondary"
                  onClick={handleReset}
                  icon="RefreshCw"
                  label="Reset"
                  disabled={isSubmitting}
                />
                <ActionButton
                  variant="primary"
                  onClick={handleCreatePost}
                  icon="Send"
                  label={isSubmitting ? "Posting..." : "Create Post"}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Scrollable Preview */}
            <div className="card-white overflow-Y-scroll bg-opacity-70 backdrop-blur-md border border-border-dark border-opacity-20 flex flex-col flex-1 overflow-hidden p-6 rounded-lg">
              <h2 className="text-lg font-bold text-black mb-4">Preview</h2>
              <div className="flex-1 overflow-y-auto">
                <PostPreview
                  message={message}
                  platforms={selectedPlatforms}
                  images={images}
                  hashtags={hashtags}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePost;
