import { verifyOtpEndpoint, resendOtpEndpoint } from "../api/endpoint";

// ✅ verify OTP
const verifyOtpQuery = async (data) => {
  try {
    const res = await fetch(verifyOtpEndpoint(), {
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

// ✅ resend OTP (NAMED EXPORT)
export const resendOtpQuery = async (email) => {
  try {
    const res = await fetch(resendOtpEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
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

export default verifyOtpQuery;