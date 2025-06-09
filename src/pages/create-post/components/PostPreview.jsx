
import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const PostPreview = ({ message, platforms, images, hashtags }) => {
  const user = {
    name: "John Smith",
    handle: "@johnsmith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  // Highlight #tags & @mentions
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

  // Truncate to 200 words
  const truncated = message.split(/\s+/).slice(0, 200).join(" ");

  // No content at all
  if (!images.length && !message.trim() && !platforms.length) {
    return (
      <div className="h-auto flex flex-col items-center justify-center text-center p-8">
        <div className="h-16 w-16 rounded-full bg-surface-medium flex items-center justify-center mb-4">
          <Icon name="Eye" size={32} className="text-white" />
        </div>
        <h3 className="text-lg font-medium text-black mb-2">
          No Preview Available
        </h3>
        <p className="text-text-tertiary text-sm max-w-xs">
          Enter text, upload an image, add a hashtag, or select a platform to
          see a preview.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {platforms.map((platform) => (
        <div
          key={platform}
          className="card-white rounded-lg border border-border-dark overflow-hidden"
        >
          {/* Platform Header */}
          <div className="p-3 border-b border-border-dark flex items-center justify-between">
            <div className="flex items-center">
              <Icon
                name={
                  platform === "facebook"
                    ? "Facebook"
                    : platform === "instagram"
                    ? "Instagram"
                    : "Linkedin"
                }
                size={18}
                color={
                  platform === "facebook"
                    ? "#1877F2"
                    : platform === "instagram"
                    ? "#E4405F"
                    : "#0A66C2"
                }
                className="mr-2"
              />
              <span className="text-sm font-semibold text-black capitalize">
                {platform} Preview
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <div className="flex items-start">
              {/* Avatar */}
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content Body */}
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-semibold text-black text-sm">
                    {user.name}
                  </span>
                  {platform !== "linkedin" && (
                    <span className="text-text-tertiary text-xs ml-2">
                      {user.handle}
                    </span>
                  )}
                </div>

                {/* Images Gallery */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 my-4">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={img.preview}
                        alt={`upload-${i}`}
                        className="w-full h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}

                {/* Hashtag Chips */}
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

                {/* Message Text */}
                {message.trim() && (
                  <p className="text-sm text-black whitespace-pre-wrap">
                    {formatMessage(truncated)}
                    {message.split(/\s+/).length > 200 && "..."}
                  </p>
                )}

                {/* Platform-specific Actions */}
                <div className="mt-4 flex items-center space-x-4 text-text-tertiary">
                  {platform === "facebook" && (
                    <>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="ThumbsUp" size={14} className="mr-1" />
                        Like
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Comment
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="Share2" size={14} className="mr-1" />
                        Share
                      </button>
                    </>
                  )}
                  {platform === "instagram" && (
                    <>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="Heart" size={14} className="mr-1" />
                        Like
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Comment
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="Send" size={14} className="mr-1" />
                        Share
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="Bookmark" size={14} className="mr-1" />
                        Save
                      </button>
                    </>
                  )}
                  {platform === "linkedin" && (
                    <>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="ThumbsUp" size={14} className="mr-1" />
                        Like
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Comment
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="Share2" size={14} className="mr-1" />
                        Repost
                      </button>
                      <button className="flex items-center text-xs hover:text-blue-800">
                        <Icon name="Send" size={14} className="mr-1" />
                        Send
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPreview;
