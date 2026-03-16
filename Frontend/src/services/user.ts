import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getCurrentUser = async (id: number) => {
    const { data } = await api.get(`/api/users/${id}`);
    return data;
};
