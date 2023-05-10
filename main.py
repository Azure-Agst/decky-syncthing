#!/usr/bin/env python
import decky_plugin
from settings import SettingsManager

# Give logger a useful alias
LOG = decky_plugin.logger

# Init Settings Manager
SETTINGS = SettingsManager(
    name="DeckySyncThing",
    settings_directory=decky_plugin.DECKY_PLUGIN_SETTINGS_DIR
)


# Define main plugin class, to be imported by loader
class Plugin:
    """
    Main Syncthing Decky Backend
    - Predominantly used for saving/loading settings
    """

    #
    # Internal Functions
    #

    async def _main(self):
        LOG.info("Starting up Decky SyncThing!")
        self.read_settings()

    async def _unload(self):
        LOG.info("Stopping Decky SyncThing!")

    #
    # Public Functions
    #

    async def readSettings(self):
        LOG.info("Reading settings!")
        return SETTINGS.read()

    async def saveSettings(self):
        LOG.info("Committing settings!")
        return SETTINGS.commit()

    async def getSetting(self, key: str, defaults):
        LOG.info('Get {}'.format(key))
        return SETTINGS.getSetting(key, defaults)

    async def setSetting(self, key: str, value):
        LOG.info('Set {}: {}'.format(key, value))
        return SETTINGS.setSetting(key, value)
