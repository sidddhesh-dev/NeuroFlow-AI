import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pinChatSession, unpinChatSession } from "../api/chatApi";

export function usePinChatMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ sessionId, isPinned }) =>
            isPinned ? unpinChatSession(sessionId) : pinChatSession(sessionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat-history"] });
            queryClient.invalidateQueries({ queryKey: ["chat-session"] });
        },
    });
}