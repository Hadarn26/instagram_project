import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/user/user";
import type { TUser } from "../../services/user/types/TypeUser";
import { useSetAtom } from "jotai";
import { userAtom } from "../../store/userAtom";

export function useLoadUser(): UseQueryResult<TUser, Error> {
  const setUser = useSetAtom(userAtom);

  const query = useQuery<TUser, Error>({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(1),
  });

  useEffect(() => {
    if (query.data) {
      setUser({
        isAuthenticated: true,
        id: query.data.id,
        username: query.data.username,
        profileImg: query.data.profileImg,
      });
    }
  }, [query.data, setUser]);

  return query;
}
