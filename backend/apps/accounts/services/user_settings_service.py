from apps.accounts.models import UserSettings

class UserSettingsService:
    @staticmethod
    def get_settings(user):
        settings, _ = UserSettings.objects.get_or_create(user=user)
        return settings

    @staticmethod
    def update_settings(user, data):
        settings = UserSettingsService.get_settings(user)
        for field, value in data.items():
            setattr(settings, field, value)
        settings.save()
        return settings