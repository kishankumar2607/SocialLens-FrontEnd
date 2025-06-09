import React, { useState, useEffect } from "react";
import Icon from "../../components/AppIcon";
import FormInput from "./components/FormInput";
import PlatformSelector from "./components/PlatformSelector";
import PostPreview from "./components/PostPreview";
import ActionButton from "./components/ActionButton";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState({
    message: false,
    platforms: false,
  });

  const handleMessageChange = (value) => {
    if (value.length <= 280) {
      setMessage(value);
      if (formErrors.message && value.trim().length > 0) {
        setFormErrors({ ...formErrors, message: false });
      }
    }
  };

  const handlePlatformToggle = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
      if (formErrors.platforms && selectedPlatforms.length > 0) {
        setFormErrors({ ...formErrors, platforms: false });
      }
    }
  };

  const validateForm = () => {
    const errors = {
      message: message.trim().length === 0,
      platforms: selectedPlatforms.length === 0,
    };
    setFormErrors(errors);
    return !errors.message && !errors.platforms;
  };

  const handleCreatePost = () => {
    if (validateForm()) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="flex h-screen bg-white text-text-primary overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-surface-dark border-b border-border-dark p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Create Post</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-text-secondary hover:text-text-primary p-2 rounded-full hover:bg-surface-medium transition-colors duration-200">
              <Icon name="Bell" size={20} />
            </button>
            <button className="text-text-secondary hover:text-text-primary p-2 rounded-full hover:bg-surface-medium transition-colors duration-200">
              <Icon name="HelpCircle" size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Post Creation Form */}
              <div className="card-white bg-opacity-70 backdrop-blur-md border border-border-dark border-opacity-20 p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-6 text-black">Create New Post</h2>

                {/* Message Input */}
                <FormInput
                  value={message}
                  onChange={handleMessageChange}
                  maxLength={280}
                  error={formErrors.message}
                  errorMessage="Please enter a message"
                />

                {/* Platform Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-black mb-2">
                    Select Platforms
                  </label>
                  <PlatformSelector
                    selectedPlatforms={selectedPlatforms}
                    onToggle={handlePlatformToggle}
                    error={formErrors.platforms}
                    errorMessage="Please select at least one platform"
                  />
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
                  <ActionButton
                    variant="secondary"
                    onClick={() => {
                      setMessage("");
                      setSelectedPlatforms([]);
                      setFormErrors({ message: false, platforms: false });
                    }}
                    icon="RefreshCw"
                    label="Reset"
                  />
                  <ActionButton
                    variant="primary"
                    onClick={handleCreatePost}
                    icon="Send"
                    label="Create Post"
                  />
                </div>
              </div>

              {/* Post Preview */}
              <div className="card-white bg-opacity-70 backdrop-blur-md border border-border-dark border-opacity-20 p-6 rounded-lg">
                <h2 className="text-lg font-bold text-black mb-6">Preview</h2>
                <PostPreview message={message} platforms={selectedPlatforms} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 animate-fade-in">
          <div className="bg-success text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            <span>Post created successfully!</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-white hover:text-text-secondary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
