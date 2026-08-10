import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../api/noteApi";

export function useUpdateNoteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, note }) => updateNote(id, note),
        onSuccess: (updatedNote) => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            queryClient.setQueryData(["note", updatedNote.id], updatedNote);
        },
    });
}