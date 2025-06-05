import axios from "axios";
import Cookies from "js-cookie";
import { decryptData } from "../utils/encryptDecryptData";

const isClient = typeof window !== "undefined";

// Safely parse JSON
function parseJSONSafely(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

// Get headers with token
export async function getHeaders() {
  if (isClient) {
    const encrypted = JSON.parse(Cookies.get("token")) || sessionStorage.getItem("token");
    // console.log("encrypted token cookie →", encrypted);

    if (encrypted) {
      const decryptedToken = decryptData(encrypted);
      // console.log("decrypted token cookie →", decryptedToken);
      return {
        Authorization: `Bearer ${decryptedToken}`,
      };
    }
  }
  return {};
}

// Generic API request handler
export async function apiReq(
  endPoint,
  data = {},
  method,
  headers = {},
  requestOptions = {}
) {
  try {
    const tokenHeader = await getHeaders();
    headers = { ...tokenHeader, ...headers };

    // console.log("Request Headers →", headers);

    let response;

    if (method === "get" || method === "delete") {
      const config = {
        ...requestOptions,
        headers,
        params: data,
      };
      response = await axios[method](endPoint, config);
    } else {
      response = await axios[method](endPoint, data, {
        ...requestOptions,
        headers,
      });
    }

    const responseData = response.data;

    if (responseData?.status === false) {
      throw responseData;
    }

    return response;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    } else if (error.message === "Network Error") {
      throw { message: "Network Error", msg: "Network Error" };
    } else {
      throw error;
    }
  }
}

// Cookie helpers
export function setCookie(key, value, options = {}) {
  if (isClient) {
    Cookies.set(key, JSON.stringify(value), { ...options, path: "/" });
  }
}

export function getCookie(key) {
  if (isClient) {
    return Cookies.get(key);
  }
  return null;
}

export function removeCookie(key, options = {}) {
  if (isClient) {
    Cookies.remove(key, options);
  }
}

export function deleteAllCookies() {
  if (isClient) {
    const keys = Object.keys(Cookies.get());
    keys.forEach((key) => Cookies.remove(key));
  }
}

// Auth state helpers
export function setUserAuthState(isAuthenticated) {
  if (isClient) {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }
}

export function getUserAuthState() {
  return isClient
    ? JSON.parse(localStorage.getItem("isAuthenticated")) === true
    : false;
}

// Local storage helpers
export function setLocalStorage(key, value) {
  if (isClient) {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }
}

export function getLocalStorage(key) {
  if (isClient) {
    const value = localStorage.getItem(key);
    return parseJSONSafely(value, value);
  }
  return null;
}

export function deleteLocalStorage(key) {
  if (isClient) {
    localStorage.removeItem(key);
  }
}

export function clearAllLocalStorage() {
  if (isClient) {
    localStorage.clear();
  }
}

//Session storage helper
export function setSessionStorage(key, value) {
  if (isClient) {
    sessionStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }
}

export function getSessionStorage(key) {
  if (isClient) {
    const value = sessionStorage.getItem(key);
    return parseJSONSafely(value, value);
  }
}

export function deleteSessionStorage(key) {
  if (isClient) {
    sessionStorage.removeItem(key);
  }
}

export function clearAllSessionStorage() {
  if (isClient) {
    sessionStorage.clear();
  }
}

// Shorthand API methods
export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "delete", headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions = {}) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}

export function apiPatch(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "patch", headers);
}
