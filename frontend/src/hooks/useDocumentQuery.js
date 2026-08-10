import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../api/documentApi";

export function useDocumentsQuery() {
    return useQuery({
        queryKey: ["documents"],
        queryFn: getDocuments,
        refetchInterval: 3000,
        refetchOnWindowFocus: true,
    });
}