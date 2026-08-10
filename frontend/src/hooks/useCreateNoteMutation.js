import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/noteApi";

export function useCreateNoteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}