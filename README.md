<img src="./docs/images/SyncthingLogo.png" width="128"/><br/>

# Decky Syncthing

A SyncThing Frontend for Decky Loader!

|**🚨 IMPORTANT DISCLAIMER 🚨**|
|:-:|
|This project is NOT the one that was merged into the official Decky Repo! This is a personal project that I made before the other decky plugin even existed, but I was lazy and never got around to actually submitting this to the Decky team. Unless you have cloned this repo and built/installed this project yourself, you're probably looking for [this repo](https://github.com/theCapypara/steamdeck-decky-syncthing) instead.|

## Screenshots

<details>
  <summary>Click to expand</summary>

  ![Screenshot QAM](./docs/images/screenie-QAM.png)
  ![Screenshot Modal](./docs/images/screenie-modal.png)
  ![Screenshot Settings](./docs/images/screenie-settings.png)
</details>

## Installation

Here's how to get started using this plugin, assuming you're brand new to SyncThing. (If you're already an avid user, you can skip a few steps!)

1. Load your Steam Deck into Desktop Mode
2. In the Discover Store, search for and install [**Syncthing GTK**][Syncthing-GTK] by [kozec][GH-Kozec].
   - Run it at least once to complete the first-time setup process
3. Swap back to Gaming Mode
4. Install this plugin
   - At the moment, only possible via development means. Might change soon!
5. Launch the plugin via Decky Loader

## Usage

Decky SyncThing is mainly used via the Quick Access Menu (QAM). Here, you'll be able to see all of your folders and the states that they're in. Clicking on them creates a popup modal with more info, like the ID, path to the folder, most recently changed file with a timestamp, and any errors if applicable.

There's also a button on the Plugin's QAM to open SyncThing's GUI in the Deck's built-in browser, allowing you to do more complex changes to your configuration without having to boot into Desktop Mode.

The Settings menu is mainly used to configure the Host & API Key used to communicate with SyncThing. These are automatically scraped from the config file by default. There's also some version info.

## Development

In order to set up a development environment, you'll need to do the following:

- Prerequisites
  - Make sure your Steam Deck has SSH enabled
  - Make sure your dev machine has a recent version of Node installed
  - Said dev machine will also need pnpm installed, `sudo npm i -g pnpm`
- Clone the repo to your machine
- Run `make init` to install dependencies and generate a .env file
- Edit the .env file to suit your environment
- Run `make build-front deploy`

## Troubleshooting

Decky SyncThing is still very much in a beta state, and you might run into some bugs along the way. If you do, please leave an issue!

In your issue, please include any pertinent debugging data that I can use for troubleshooting. If your issue is verbose enough and has the proper debugging info, I'll look into it when I get the chance.

### Obtaining Debugging Information

For this, you'll need a desktop computer with a Chromium-based browser installed. (Chrome, Edge, Brave, etc.)

1. Reboot your Steam Deck
2. Ensure your Steam Deck + desktop are on the same network and can communicate
3. Go into Decky settings and enable Developer mode. Then in the newly added Developer tab, enable `Allow Remote CEF Debugging`
4. On your desktop, use your browser to visit `http://{steamdeck-ip}:8081`
5. In the list of links, click the entry called `SharedJSContext`, then in the DevTools window that pops up, click Console.
6. Set the `Log Level` dropdown (to the right of the `Filter` box) to include `Verbose`
7. Reproduce the issue on your device
8. Right click on the log and choose `Save as...`

This should save a log file somewhere on your computer, which you can now upload in your Issue. :)

## Contribution

Contributions are welcome! Just open a PR, and I'll look into it when I get a chance. I'll establish more solid contribution guidelines in the future, if this project takes off.

## Thanks

- [SyncThing Team][syncthing] for designing a really neat file syncing system
- [Deckbrew][Deckbrew] for creating Decky loader & most of the libraries I used
- [jurrasicplayer][jurrasicplayer] for programming [AutoSuspend][decky-autosuspend] and [AutoFlatpaks][decky-autoflatpaks], two awesome reference plugins I used while designing mine.

[Syncthing-GTK]: https://flathub.org/apps/me.kozec.syncthingtk
[GH-Kozec]: https://github.com/kozec
[Deckbrew]: https://deckbrew.xyz
[jurrasicplayer]: https://github.com/jurassicplayer
[decky-autosuspend]: https://github.com/jurassicplayer/decky-autosuspend/
[decky-autoflatpaks]: https://github.com/jurassicplayer/decky-autoflatpaks/
[syncthing]: https://syncthing.net/
[debug-guide]: https://github.com/jurassicplayer/decky-autosuspend/tree/main/README.md#obtaining-debugging-information
