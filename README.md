RDP Protocol Handler for Chrome
---
This is a very simple legacy RDP protocol handler for Chrome/Brave. On Brave in Linux, when attempting to access a legacy RDP uri (rdp://full address:s:server...), 
this would error out and produce a tab that goes to "http://rdp//full%20address:s:server...". For me this was particularly problematic, since my RMM links to
an RDP URI scheme for me to access remote servers. I had to constantly go into dev tools, get the URI and then create an RDP from that URI.

This extension will read the legacy RDP URI, convert it to a properly formated rdp file, and then make the browser download that RDP file. This functionality is
the same as how Firefox treats the legacy RDP URI scheme.

Future Plans
---
Add a GUI interface that allows overrriding parameters when generating the RDP file.
IE: enablecredsspsupport, prompt for credentials on client, negotiate security layer, etc.

Install
---
Only tested on Brave and Linux.
1. Download all files from this repo and place it in its own folder
3. Go to the Extension Manager in Brave
4. Enable "Developer Mode"
5. Click "Load unpacked" and select the folder

Now anytime you click on an RDP:// link, it will download the RDP file and you can double click on the downloaded file to connect to the remote endpoint.

Notes
---
This extension works by checking for a "bug" that Brave/Chrome suffers from when parsing legacy RDP URI protocols. I filled a bug with Brave here, but don't
expect a response, because Microsoft used a non-IETF standard to form its URI scheme: https://github.com/brave/brave-browser/issues/41467
