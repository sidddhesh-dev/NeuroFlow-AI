import { useQuery } from "@tanstack/react-query";
import { getAccountSecurity } from "../api/accountSecurityApi";

export function useAccountSecurityQuery() {
    return useQuery({
        queryKey: ["account-security"],
        queryFn: getAccountSecurity,
    });
}