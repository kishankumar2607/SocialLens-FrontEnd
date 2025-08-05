import React, { useState, useEffect } from "react";
import {
  GeneratePostAPI,
  SaveGeneratedPostAPI,
  GetGeneratedPostDetailsAPI,
} from "../../api/api";
import { apiPost, apiGet } from "../../utils/utils";
import { getCookie, getSessionStorage } from "../../utils/utils";
import { decryptData } from "../../utils/encryptDecryptData";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { Copy } from "lucide-react";

const GeneratePost = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const userFromCookie = getCookie("userId");
  const userFromSession = getSessionStorage("userId");

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

  const userId = user ? decryptData(user) : null;

  useEffect(() => {
    if (userId) {
      fetchSavedPosts();
    }
  }, [userId]);

  const fetchSavedPosts = async (id) => {
    try {
      const response = await apiGet(GetGeneratedPostDetailsAPI(id));
      // console.log("Fetched saved posts:", response.data);
      setSavedPosts(response.data || []);
    } catch (err) {
      console.error("Error fetching saved posts:", err);
      alert("Failed to fetch saved posts. Please try again later.");
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await apiPost(GeneratePostAPI, { prompt });
      setResult(response.data);
      setPrompt("");

      await apiPost(SaveGeneratedPostAPI, {
        userId,
        prompt,
        text: response.data.text,
        hashtags: response.data.hashtags,
        imageUrl: response.data.imageUrl,
      });

      fetchSavedPosts();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to generate content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.text) {
      navigator.clipboard.writeText(
        result.text + "\n\n" + result.hashtags.map((tag) => `#${tag}`).join(" ")
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  //Hangle fetched image download
  const handleImageDownload = async (imageUrl) => {
    if (!imageUrl) return;

    const fullUrl = `http://localhost:8000${imageUrl}`;
    try {
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = imageUrl.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Image download failed:", err);
      alert("Failed to download image.");
    }
  };

  const toggleAccordion = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="min-h-screen max-w-4xl mx-auto bg-surface-light">
        <h1 className="text-2xl font-bold mb-4">Generate Your Post</h1>

        <textarea
          className="w-full h-32 p-3 border border-border-dark text-black rounded"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            if (error) setError("");
          }}
        ></textarea>
        {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}

        <Button
          className={`btn-secondary text-sm mt-3 px-4 py-1.5 rounded-md border border-primary ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-surface-medium"
          }`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>

        {loading && <Loader />}

        {!loading && result && (
          <div className="mt-6 p-4 bg-surface-medium border border-border-dark rounded text-white relative">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 text-white hover:text-primary transition"
              title="Copy to clipboard"
            >
              <Copy size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-2">Generated Post:</h2>
            <p className="mb-4 whitespace-pre-line">{result.text}</p>

            {result.hashtags?.length > 0 && (
              <>
                <h3 className="font-semibold mb-1">Hashtags:</h3>
                <div className="mb-4">
                  {result.hashtags.map((tag, index) => (
                    <span key={index} className="mr-2 text-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}

            {copied && (
              <span className="absolute top-4 right-10 text-sm text-green-400">
                Copied!
              </span>
            )}

            {result.imageUrl && (
              <div className="mt-6">
                <h3 className="font-semibold mb-1">Generated Image:</h3>
                <img
                  src={`http://localhost:8000${result.imageUrl}`}
                  alt="Generated visual"
                  className="rounded mt-2 w-full max-w-md"
                />
                <Button
                  className="inline-block mt-3 text-sm px-3 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
                  onClick={() => handleImageDownload(result.imageUrl)}
                >
                  Download Image
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Previous Posts Accordion */}
        {savedPosts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-3">Your Previous Posts</h2>
            {savedPosts.map((post) => (
              <div
                key={post._id}
                className="border rounded mb-2 bg-surface-white border-border-dark p-3 cursor-pointer"
              >
                <button
                  className="w-full text-left font-semibold text-black"
                  onClick={() => toggleAccordion(post._id)}
                >
                  {post.prompt}
                </button>
                {expandedPostId === post._id && (
                  <div className="text-black border-t border-border-dark pt-4 mt-5">
                    <p className="whitespace-pre-line">{post.text}</p>
                    {post.hashtags?.length > 0 && (
                      <div className="mt-2">
                        {post.hashtags.map((tag, index) => (
                          <span key={index} className="mr-2 text-primary">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {post.imageUrl && (
                      <img
                        src={`http://localhost:8000${post.imageUrl}`}
                        alt="Old Post"
                        className="mt-3 rounded w-full max-w-sm"
                      />
                    )}
                    <Button
                      className="inline-block mt-3 text-sm px-3 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
                      onClick={() => handleImageDownload(post.imageUrl)}
                    >
                      Download Image
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePost;
