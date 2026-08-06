import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteHistoryItem } from "../api/historyApi";

export function useDeleteHistoryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ type, targetId }) =>
            deleteHistoryItem(type, targetId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["history"],
            });
        },
    });
}