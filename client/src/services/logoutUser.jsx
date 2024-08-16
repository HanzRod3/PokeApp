import axios from "axios";

export const logout = async () => {
  try {
    await axios.post(
      "http://localhost:8004/user/logout",
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.error("Error logging out", err);
    throw err; // Re-throw the error so it can be handled by the caller if needed
  }
};
