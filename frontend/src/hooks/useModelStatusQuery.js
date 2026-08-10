import { useQuery } from "@tanstack/react-query";
import { getModelStatus } from "../api/modelApi";

export function useModelStatusQuery() {
    return useQuery({
        queryKey: ["model-status"],
        queryFn: getModelStatus,
        staleTime: 1000 * 60,
    });
}