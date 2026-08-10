import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../api/accountSecurityApi";

export function useDeleteAccountMutation() {
    return useMutation({
        mutationFn: deleteAccount,
    });
}