import React, { useEffect, useState } from "react";
import { apiGet } from "../../../utils/utils";
import { LinkedInAccountDetailsAPI } from "../../../api/api";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import DefaultIcon from "../../../assets/teams/defaultUser.png";

const PostPreview = ({ message, images, hashtags }) => {
  const [accounts, setAccounts] = useState({});

  const fetchAccount = async () => {
    try {
      const response = await apiGet(
        LinkedInAccountDetailsAPI,
        {},
        {},
        { withCredentials: true }
      );
      const data = response.data.accountDetails || {};

      if (response.status === 200) {
        setAccounts(data);
      } else {
        console.error("Failed to fetch LinkedIn account details.");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching LinkedIn account details."
      );
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  // console.log("LinkedIn Account Data:", accounts);

  const user = {
    name: accounts.name,
    avatar: accounts.profileURL || DefaultIcon,
    handle:
      accounts.handle ||
      `@${(accounts.name || "").trim().toLowerCase().replace(/\s+/g, "")}`,
  };

  const formatMessage = (text) =>
    text.split(/(\s+)/).map((word, i) =>
      word.startsWith("#") || word.startsWith("@") ? (
        <span key={i} className="text-blue-500">
          {word}
        </span>
      ) : (
        word
      )
    );

  if (!images.length && !message.trim() && !hashtags.length) {
    return (
      <div className="h-auto flex flex-col items-center justify-center text-center p-8">
        <div className="h-16 w-16 rounded-full bg-surface-medium flex items-center justify-center mb-4">
          <Icon name="Eye" size={32} className="text-white" />
        </div>
        <h3 className="text-lg font-medium text-black mb-2">
          No Preview Available
        </h3>
        <p className="text-text-tertiary text-sm max-w-xs">
          Enter text, upload an image, or add a hashtag to see a preview.
        </p>
      </div>
    );
  }

  return (
    <div className="card-white rounded-lg border border-border-dark overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-border-dark flex items-center">
        <Icon name="Linkedin" size={18} color="#0A66C2" className="mr-2" />
        <span className="text-sm font-semibold text-black">
          LinkedIn Preview
        </span>
      </div>

      {/* Post Body */}
      <div className="p-4 flex flex-col items-start">
        <div className="flex items-center mb-4">
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
            <Image
              src={user.avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-black text-sm">
              {user.name}
            </span>
            <span className="text-text-tertiary text-xs">{user.handle}</span>
          </div>
        </div>

        <div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 my-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.preview || URL.createObjectURL(img)}
                  alt={`upload-${i}`}
                  className="w-full h-full object-cover rounded-md"
                />
              ))}
            </div>
          )}

          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="text-blue-500 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {message.trim() && (
            <p className="text-sm text-black whitespace-pre-wrap">
              {formatMessage(message)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
