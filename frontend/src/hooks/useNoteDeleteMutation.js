import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../api/noteApi";

export function useNoteDeleteMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"],
            });
        },
    });
}