import { useQuery } from "@tanstack/react-query";
import { getChatSession } from "../api/chatApi";

export function useChatSessionQuery(sessionId) {
    return useQuery({
        queryKey: ["chat-session", sessionId],
        queryFn: () => getChatSession(sessionId),
        enabled: !!sessionId,
        staleTime: 1000 * 60 * 5,
    });
}