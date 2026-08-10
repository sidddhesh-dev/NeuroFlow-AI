import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/noteApi";

export function useNotesQuery(search = "") {
    return useQuery({
        queryKey: ["notes", search],
        queryFn: () => getNotes(search),
    });
}