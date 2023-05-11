# Decky Loader Plugin Dev Notes

The development process for a Decky plugin is still very undocumented, to the rationale behind this document is to leave notes behind to make future plugin development easier.

Decky plugins are a two-part solution: A python plugin and a typescript user interface. The two communicate using a one-way HTTP-based IPC solution.

## 1.) Existing Documentation

As of writing, documentation on plugin development is available, albeit sparse. Here are a few useful links:

- [Decky Plugin Template](https://github.com/SteamDeckHomebrew/decky-plugin-template)
- [Deckbrew Wiki - Plugin Dev - Getting Started](https://wiki.deckbrew.xyz/en/plugin-dev/getting-started)
- [Backend Python Modules](https://github.com/SteamDeckHomebrew/decky-loader/tree/main/backend)
- [Frontend Typescript Library](https://github.com/SteamDeckHomebrew/decky-frontend-lib)
- [Reference Repo](https://github.com/jurassicplayer/decky-autosuspend)
  - The wiki uses bits and pieces from this repo; It's just a good reference overall

## 2.) Setup

If working on a separate machine, SSH access is very useful! If you haven't configured it yet, you'll need to boot your Steam Deck into desktop mode and run a few commands in the terminal:

```bash
# If you don't have a password set yet, do so
passwd

# Use said password to enable the bundled sshd
sudo systemctl start sshd

# You can also disable it once you're done, for security purposes
sudo systemctl stop sshd
```

The template repo's `Makefile` is really useful and makes heavy use of SSH/rsync. Use it!

## 3.) Logging

When it comes to dev, there are three kinds of logs you'll be looking at. Let's go over each.

### 3.1.) Loader Logs

Loader is started via `systemd`, so most of its logs will be available via `journalctl`. I usually use this command to get all Loader-related logs:

```bash
journalctl | grep PluginLoader
```

### 3.2) Backend Logs

If you're doing your plugin dev right, you should be using the logger that Decky exposes for you via the `decky_plugin` module. This will log to a folder specific to your plugin: `~/homebrew/logs/{Plugin Name}/plugin.log`.

```bash
cat ~/homebrew/logs/Plugin/plugin.log | tail -20
```

### 3.3) Frontend Logs

You'll need Chrome for this one, as Steam uses the Chromium Embedded Framework to render the Steam Deck's UI. This is also how plugins are injected. We can attach a remote debugger to debug our frontend.

If working on the desk itself, your session should be exposed on `127.0.0.1:8080`. If on a remote machine, you'll need to Allow Remote CEF Debugging via Decky's developer menu, and your session will be exposed on `local-ip:8081`.

In Chrome, add your session as a network target. Shortly after, you should see the list below your target populate with remote sessions. There are a few we care about:

- `SharedJSContext` is the context which our plugins will run. The console here is where all of your logging will be.
- `QuickAccess_uid*` is the context for the Quick Access Menu
- `MainMenu_uid*` is the context for the main Steam button menu
- `Steam Big Picture Mode` is the context for the foreground

Not sure what the rest do at the moment. Anyways, here's what the JS context looks like:

![CEF Debugging](https://cdn.discordapp.com/attachments/409771681771552780/1106028894617878669/image.png)

## 4.) Backend

Your python backend should be located in a single file, `main.py` and have a class `Plugin` that has the following functions:

```python
class Plugin:
    async def _migrate(self):
        """Any migration code goes here, runs before _main"""
        pass

    async def _main(self):
        """Initialization function, replaces __init__"""
        pass

    async def _unload(self):
        """Function called when plugin is unloaded; Destructor"""
        pass
```

It's important to note that this class is not initialized a normal class, so some norms like using `__init__` won't work here. Instead, the class is statically imported on the fly before the loader adds your `_main` function to the event loop. You can see the code responsible for this [here](https://github.com/SteamDeckHomebrew/decky-loader/blob/0c83c9a2b507567fd49803f1df3f7d9c013c971c/backend/plugin.py#L79). Here's a snippet:

```python
spec = spec_from_file_location("_", self.file)
module = module_from_spec(spec)
spec.loader.exec_module(module)
self.Plugin = module.Plugin

if hasattr(self.Plugin, "_migration"):
    get_event_loop().run_until_complete(self.Plugin._migration(self.Plugin))
if hasattr(self.Plugin, "_main"):
    get_event_loop().create_task(self.Plugin._main(self.Plugin))
```

The loader tries to replicate the traditional class structure by passing in the class object as the first parameter, but this it's probably closer to `__new__`'s `cls` param than `__init__`'s `self`. If you run into any "this function requires one param and none were given" errors, it's probably a result of this behavior; just manually pass the context into any functions that require `self`.

## 5.) Frontend

Not really much to say here, other than Deckbrew has a frontend lib that you should be using religiously. You can find it [here](https://github.com/SteamDeckHomebrew/decky-frontend-lib).

Just copy all the frontend-related files from the template repo, and you'll be fine.
