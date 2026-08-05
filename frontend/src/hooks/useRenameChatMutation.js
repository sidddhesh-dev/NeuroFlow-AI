import { useMutation, useQueryClient } from "@tanstack/react-query";

import { renameChatSession } from "../api/chatApi";

export function useRenameChatMutation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({ sessionId, title }) =>
            renameChatSession(sessionId, title),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["chat-history"],
            });

            queryClient.invalidateQueries({
                queryKey: ["chat-session"],
            });

        },

    });

}