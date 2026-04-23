const BASE_URL = import.meta.env.VITE_API_URL;

export const signupEndpoint = () => `${BASE_URL}signup/`;
export const loginEndpoint = () => `${BASE_URL}login/`;

//for otp verification
export const verifyOtpEndpoint = () => `${BASE_URL}verify-otp/`;

export const resendOtpEndpoint = () => `${BASE_URL}resend-otp/`;