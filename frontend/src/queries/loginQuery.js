import { loginEndpoint } from "../api/endpoint";

const loginUser = async (data) => {
  try {
    const res = await fetch(loginEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 200) {
      return { success: true, data: result };
    }

    return { success: false, error: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default loginUser;