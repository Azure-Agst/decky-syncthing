#!/usr/bin/env python
import os
import re
import shutil
import subprocess

import decky_plugin
from settings import SettingsManager

# Useful Constants
FP_USER_PATH = "/home/deck/.var/app/"
ST_CONFIG_PATH = "me.kozec.syncthingtk/config/syncthing/config.xml"
SYSTEMD_SERVICE_FILE = os.path.join(
    decky_plugin.DECKY_PLUGIN_DIR,
    "assets/systemd/syncthing.service")
SYSTEMD_TARGET_FILE = os.path.join(
    decky_plugin.DECKY_USER_HOME,
    ".config/systemd/user/syncthing.service")

# Load dbus env var, for systemctl
# NOTE: Feels a bit hacky... Potential future failure point?
os.environ["DBUS_SESSION_BUS_ADDRESS"] = \
    f"unix:path=/run/user/{os.getuid()}/bus"

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

        LOG.info(os.getcwd())
        LOG.info(os.getuid())
        LOG.info(os.geteuid())

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

    async def isStGTKInstalled(self):
        """Checks to see if me.kozec.syncthingtk flatpak is installed"""

        command = ["/usr/bin/flatpak", "info", "me.kozec.syncthingtk"]
        result = subprocess.run(command)
        return result.returncode == 0

    async def getStHostAddr(self):
        """Gets the Syncthing GUI Address from saved config"""

        return self.st_hostAddr

    async def getStApiKey(self):
        """Gets the Syncthing API Key from saved config"""

        return self.st_apiKey

    #
    # Systemd Functions
    #

    async def getStStatus(self):
        """Gets SyncThing's Status from systemd"""
        # REF: https://www.freedesktop.org/software/systemd/man/systemctl.html

        LOG.info('Syncthing.service systemctl query requested!')

        command = ["/usr/bin/systemctl", "--user", "status", "syncthing"]
        result = subprocess.run(command)
        return result.returncode

    async def installStSystemd(self):
        """Installs Syncthing as as a startup service"""

        LOG.info("Installing SyncThing.service...")

        # Ensure it's not already installed
        if await self.getStStatus(self) != 4:
            LOG.error("Already installed!")
            return 1

        # Copy service into right place and ensure good perms
        LOG.info("Copying service definition into place...")
        shutil.copy(SYSTEMD_SERVICE_FILE, SYSTEMD_TARGET_FILE)
        os.chmod(SYSTEMD_TARGET_FILE, 0o644)

        # Enable service
        LOG.info("Enabling SyncThing...")
        ret = subprocess.run(
            ["/usr/bin/systemctl", "--user", "enable", "syncthing"])
        if ret.returncode != 0:
            LOG.error("Failed to enable SyncThing.service!")
            return 1

        # Start service
        ret = await self.startStService(self)
        if ret != 0:
            return 1

        # We're set!
        return 0

    async def uninstallStSystemd(self):
        """Uninstalls Syncthing as as a startup service"""

        LOG.info("Uninstalling SyncThing.service...")

        # Ensure it's actually installed
        if await self.getStStatus(self) == 4:
            LOG.error("Already uninstalled!")
            return 1

        # Stop Service
        ret = await self.stopStService(self)
        if ret != 0:
            return 1

        # Disable service
        LOG.info("Disabling SyncThing...")
        ret = subprocess.run(
            ["/usr/bin/systemctl", "--user", "disable", "syncthing"])
        if ret.returncode != 0:
            LOG.error("Failed to disable SyncThing.service!")
            return 1

        # Delete service
        os.remove(SYSTEMD_TARGET_FILE)

        # Reload Daemon
        LOG.info("Reloading Systemd...")
        ret = subprocess.run(
            ["/usr/bin/systemctl", "--user", "daemon-reload"])
        if ret.returncode != 0:
            LOG.error("Failed to reload daemon!")
            return 1

        # We're set!
        return 0

    async def startStService(self):
        """Starts SyncThing Service"""

        # Start service
        LOG.info("Starting SyncThing...")
        ret = subprocess.run(
            ["/usr/bin/systemctl", "--user", "start", "syncthing"])
        if ret.returncode != 0:
            LOG.error("Failed to start SyncThing.service!")
            return 1
        return 0

    async def stopStService(self):
        """Stops Syncthing Service"""

        # Stop service
        LOG.info("Stopping SyncThing...")
        ret = subprocess.run(
            ["/usr/bin/systemctl", "--user", "stop", "syncthing"])
        if ret.returncode != 0:
            LOG.error("Failed to stop SyncThing.service!")
            return 1
        return 0
