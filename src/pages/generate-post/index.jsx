import React, { useState } from "react";
import { GeneratePostAPI } from "../../api/api";
import { apiPost } from "../../utils/utils";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { Copy } from "lucide-react";

const GeneratePost = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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

  const handleImageDownload = async () => {
    const imageUrl = `http://localhost:8000${result.imageUrl}`;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = result.imageUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="min-h-screen max-w-4xl mx-auto bg-surface-light">
        <h1 className="text-2xl font-bold mb-4">Generate Your Post</h1>

        <textarea
          className="w-full h-32 p-3 border border-border-dark text-black rounded"
          placeholder="Enter your prompt here (e.g., Promote new feature, Share motivation)..."
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

            {result.hashtags && result.hashtags.length > 0 && (
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
                  onClick={handleImageDownload}
                >
                  Download Image
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePost;
