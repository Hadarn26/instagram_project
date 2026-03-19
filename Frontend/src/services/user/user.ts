import axios from "axios";
import { TUser } from "./types/TypeUser";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getCurrentUser = async (id: TUser['id']): Promise<TUser> => {
    const { data } = await api.get(`/api/users/${id}`);
    return data as TUser;
};
