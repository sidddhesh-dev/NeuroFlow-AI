import { useMutation } from "@tanstack/react-query";

import { changePassword } from "../api/accountSecurityApi";

export function useChangePasswordMutation() {

    return useMutation({

        mutationFn: changePassword,

    });

}