import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "../api/documentApi";

export function useDeleteDocumentMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        },
    });
}