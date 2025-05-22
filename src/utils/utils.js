import axios from "axios";
import Cookies from "js-cookie";

// Check if running on the client-side
const isClient = typeof window !== "undefined";

// Function to get headers
export async function getHeaders() {
  let userData;
  if (isClient) {
    userData = Cookies.get("userData");
  }

  // console.log("user data ===================", userData);

  if (userData) {
    try {
      // Check if userData is a string before parsing
      userData = typeof userData === "string" ? JSON.parse(userData) : userData;
      const accessToken = userData.token;
      // console.log("token in utils file-------------", accessToken);
      return {
        authorization: `Bearer ${accessToken}`,
      };
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  return {};
}

// Function to handle Axios requests
export async function apiReq(
  endPoint,
  data = {},
  method,
  headers = {},
  requestOptions = {}
) {
  return new Promise(async (res, rej) => {
    try {
      // Get headers
      const getTokenHeader = await getHeaders();
      headers = {
        ...getTokenHeader,
        ...headers,
      };

      // console.log("header token================", getTokenHeader);

      if (method === "get" || method === "delete") {
        data = {
          ...requestOptions,
          ...data,
          headers,
        };
      }

      // Axios request
      const result = await axios[method](endPoint, data, { headers });
      const { data: responseData } = result;

      if (responseData.status === false) {
        return rej(responseData);
      }

      return res(responseData);
    } catch (error) {
      if (error.response && error.response.data) {
        return rej(error.response.data);
      }

      if (error.message === "Network Error") {
        return rej({ message: "Network Error", msg: "Network Error" });
      } else {
        return rej(error);
      }
    }
  });
}

// Function to set a cookie
export function setCookie(key, value, options = {}) {
  if (isClient) {
    Cookies.set(key, JSON.stringify(value), { ...options, path: "/" });
  }
}

// Function to get a cookie
export function getCookie(key) {
  const cookieValue = isClient ? Cookies.get(key) : null;
  // console.log("Cookie Value:", cookieValue);
  return cookieValue;
}

// Function to remove a cookie
export function removeCookie(key, options = {}) {
  if (isClient) {
    Cookies.remove(key, options);
  }
}

// Function to delete all cookies
export function deleteAllCookies() {
  if (isClient) {
    const cookieKeys = Object.keys(Cookies.get());
    for (let cookieKey of cookieKeys) {
      Cookies.remove(cookieKey);
    }
  }
}

// Function to set user authentication state
export function setUserAuthState(isAuthenticated) {
  if (isClient) {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }
}

// Function to check user authentication state
export function getUserAuthState() {
  return isClient ? localStorage.getItem("isAuthenticated") === "true" : false;
}

// Function to set a value in local storage
export function setLocalStorage(key, value) {
  if (isClient) {
    localStorage.setItem(key, value);
  }
}

// Function to get a value from local storage
export function getLocalStorage(key) {
  return isClient ? localStorage.getItem(key) : null;
}

// Function to delete a value from local storage
export function deleteLocalStorage(key) {
  if (isClient) {
    localStorage.removeItem(key);
  }
}

// Function to delete all data from local storage
export function clearAllLocalStorage() {
  if (isClient) {
    localStorage.clear();
  }
}

//post api request function
export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}

//delete api request function
export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "delete", headers);
}

//get api request function
export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}

//put api request function
export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}

//patch api request function
export function apiPatch(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, "patch", headers);
}
