#!/usr/bin/env python
import os
import re
import subprocess

import decky_plugin
from settings import SettingsManager

# Useful Constants
FP_USER_PATH = "/home/deck/.var/app/"
ST_CONFIG_PATH = "me.kozec.syncthingtk/config/syncthing/config.xml"

# Give logger a useful alias
LOG = decky_plugin.logger

# Init Settings Manager
SETTINGS = SettingsManager(
    name="settings",
    settings_directory=decky_plugin.DECKY_PLUGIN_SETTINGS_DIR
)


# Define main plugin class, to be imported by loader
class Plugin:
    """
    Main Syncthing Decky Backend
    - Predominantly used for saving/loading settings
    - Also for reading files from host
    """

    #
    # Internal Functions
    #

    async def _main(self):
        """Main Entrypoint"""

        # Logging
        LOG.info("Starting up Decky SyncThing!")

        # Init
        self.st_apiKey = None
        self.st_hostAddr = None

        # Load
        await self._read_st_config(self)
        await self._read_settings(self)

    async def _unload(self):
        LOG.info("Stopping Decky SyncThing!")

    async def _read_st_config(self):
        """Parses relevant info from SyncThing configs"""

        # Log
        LOG.info("Parsing Config!")

        # Ensure file exists
        config_path = os.path.join(FP_USER_PATH, ST_CONFIG_PATH)
        if not os.path.exists(config_path):
            LOG.error("SyncThing config not found")
            return

        # Parse file
        with open(config_path, 'r') as file:
            contents = file.read()

            # Get GUI data
            gui = re.search(r'<gui(.+?)</gui>', contents, re.M | re.S)
            if not gui:
                LOG.error("Failed to parse SyncThing config! (GUI)")
            gui_str = gui.group(1)

            # Get API Key
            key = re.search(r'<apikey>(.+?)</apikey>', gui_str, re.M | re.S)
            if not key:
                LOG.error("Failed to parse SyncThing config! (Key)")
            self.st_apiKey = key.group(1)

            # Get Host Address
            addr = re.search(r'<address>(.+?)</address>', gui_str, re.M | re.S)
            if not addr:
                LOG.error("Failed to parse SyncThing config! (Host)")
            self.st_hostAddr = addr.group(1)

    async def _read_settings(self):
        LOG.info("Reading settings!")
        return SETTINGS.read()

    #
    # Settings Functions
    #

    async def saveSettings(self):
        LOG.info("Committing settings!")
        return SETTINGS.commit()

    async def getSetting(self, key: str, defaults):
        LOG.info('Get {}'.format(key))
        return SETTINGS.getSetting(key, defaults)

    async def setSetting(self, key: str, value):
        LOG.info('Set {}: {}'.format(key, value))
        return SETTINGS.setSetting(key, value)

    #
    # SyncThing Functions
    #

    async def isStInstalled(self):
        """Checks to see if me.kozec.syncthingtk flatpak is installed"""

        command = "flatpak info me.kozec.syncthingtk"
        output = subprocess.run(command)
        return output.returncode == 0

    async def getStHostAddr(self):
        """Gets the Syncthing GUI Address from saved config"""

        return self.st_hostAddr

    async def getStApiKey(self):
        """Gets the Syncthing API Key from saved config"""

        return self.st_apiKey
