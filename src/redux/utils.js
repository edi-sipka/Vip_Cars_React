import { toast } from "react-toastify";

export const API_URL = 'https://microverse-final-capstone-backend.onrender.com/';
export const API_KEY = "";
export const handleToast = ({ msg, type = "success" }) => toast(msg, { position: "top-center", type, autoClose: 5000 });