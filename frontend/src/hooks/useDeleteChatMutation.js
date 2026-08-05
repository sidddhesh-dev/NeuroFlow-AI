import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteChatSession } from "../api/chatApi";

export function useDeleteChatMutation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteChatSession,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["chat-history"],
            });

            queryClient.removeQueries({
                queryKey: ["chat-session"],
            });

        },

    });

}