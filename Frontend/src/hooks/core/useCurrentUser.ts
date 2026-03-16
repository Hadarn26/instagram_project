import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/user";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: () => getCurrentUser(1),
    });
}