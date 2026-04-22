const BASE_URL = import.meta.env.VITE_API_URL;

export const signupEndpoint = () => `${BASE_URL}signup/`;
export const loginEndpoint = () => `${BASE_URL}login/`;