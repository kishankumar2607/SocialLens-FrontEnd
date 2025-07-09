import React from "react";
import { FaFacebookSquare, FaUnlink, FaPlug } from "react-icons/fa";

const FacebookAccount = ({ setLoading }) => {
  const isConnected = false;
  const userName = "Kishan Kumar Das";

  return (
    <div
      className={`rounded-lg border p-5 shadow-sm ${
        isConnected ? "border-green-400 bg-green-50" : "border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <FaFacebookSquare className="text-blue-600 size-8" />
        <h3 className="text-black font-semibold text-lg capitalize">
          facebook
        </h3>
        <span
          className={`ml-auto text-sm ${
            isConnected ? "text-green-600" : "text-red-500"
          }`}
        >
          {isConnected ? "Connected" : "Not Connected"}
        </span>
      </div>
      {isConnected ? (
        <div className="flex items-center gap-2 mb-3 mt-3">
          <span className="font-bold text-lg capitalize text-black">Name:</span>
          <span className="text-blue-600 font-semibold text-lg capitalize">
            {userName}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-3 mt-3">
          <span className="text-blue-600 font-semibold text-lg capitalize">
            Connect your facebook account.
          </span>
        </div>
      )}
      {isConnected ? (
        <button
          className="btn-secondary text-sm bg-red-100 hover:bg-red-200 text-red-700"
          onClick={() => console.log("Disconnect facebook Account")}
        >
          <FaUnlink className="inline-block mr-1" />
          Disconnect
        </button>
      ) : (
        <button
          className="btn-primary text-sm bg-blue-600 hover:bg-blue-700"
          onClick={() => console.log("Connect facebook Account")}
        >
          <FaPlug className="inline-block mr-1" />
          Connect
        </button>
      )}
    </div>
  );
};

export default FacebookAccount;
