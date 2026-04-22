import { signupEndpoint } from "../api/endpoint";

const signupUser = async (data) => {
  try {
    const res = await fetch(signupEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 200 || res.status === 201) {
      return { success: true, data: result };
    }

    return { success: false, error: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default signupUser;