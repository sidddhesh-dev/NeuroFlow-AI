import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/settingsApi";

export function useSettingsQuery() {
    return useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });
}