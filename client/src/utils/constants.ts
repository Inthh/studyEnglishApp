import { Zoom } from "react-toastify";

export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const EMAIL_VALIDATION_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const REGISTER_FIELD_ERROR_MESSAGES = {
    firstname: "The 'firstname' field is required",
    email: "The 'email' field is invalid",
    username: "The 'username' field is required",
    password: "The 'password' field must be at least 6 characters long",
    confirmedPassword: "The confirmed password does not match the entered password",
    invalid: "",
};

export const LOGO_PATH = '/images/DolphinLearningLogo.png';

export const COMMON_TOAST_OPTIONS = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
};

export const TOPICS_PAGE_SIZE = 6;