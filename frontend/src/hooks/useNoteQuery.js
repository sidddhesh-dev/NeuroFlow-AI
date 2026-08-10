import { useQuery } from "@tanstack/react-query";
import { getNote } from "../api/noteApi";

export function useNoteQuery(id) 
{
    return useQuery({
        queryKey: ["note", id],
        queryFn: () => getNote(id),
        enabled: !!id,
    });
}