import { useSettingsQuery } from "./useSettingsQuery";

export function useDeleteConfirmation() {
    const { data: settings } = useSettingsQuery();

    function confirmDelete(message) {
        if (!settings?.confirm_before_delete) return Promise.resolve(true);

        return Promise.resolve(
            window.confirm(message || "Are you sure you want to delete this item?")
        );
    }

    return { confirmDelete };
}