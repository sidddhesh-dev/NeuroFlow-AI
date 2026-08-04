import { useQuery } from "@tanstack/react-query";

import { getChatSessions } from "../api/chatApi";

export function useChatHistoryQuery() {

    return useQuery({

        queryKey: ["chat-history"],

        queryFn: getChatSessions,

        staleTime: 1000 * 60 * 5,

    });

}