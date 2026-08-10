import { useQuery } from "@tanstack/react-query";
import { searchWorkspace } from "../api/searchApi";

export function useSearchQuery(query) {
    return useQuery({
        queryKey: ["workspace-search", query],
        queryFn: () => searchWorkspace(query),
        enabled: query.trim().length > 0,
        staleTime: 1000 * 60,
    });
}