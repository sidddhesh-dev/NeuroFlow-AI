import { useEffect } from "react";
import { useSettingsQuery } from "./useSettingsQuery";

export function useAnimationSettings() {
    const { data: settings } = useSettingsQuery();

    useEffect(() => {
        if (!settings) return;
        
        if (settings.animations) {
            document.body.classList.remove("disable-animations");
        } else {
            document.body.classList.add("disable-animations");
        }
        return () => document.body.classList.remove("disable-animations");
    }, [settings]);
}