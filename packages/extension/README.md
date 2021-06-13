# Paperpod Extension 
This module provides a browser extension for saving articles. 
The extension should be compatible with Firefox and Chromium browsers. 

## Develop 
From paperpod root, run `yarn extension dev`. This listens for file changes in `packages/extension` (this directory) and rebuilds autoamtically. 
To run tests, use `yarn extension test`. 

See sections below for how to install the extension in your browser while developing. 

### Firefox 
Although the source code targets the `chrome`-API, it is [compatible with Firefox](https://www.extensiontest.com/test/3670bc40-bcc1-11eb-a578-6d5c3791ea3a). 

#### Installing the extension 
1. navigate to `about:debugging` in your browser
2. click _This Firefox_
3. click _Add temporary extension_
4. select the `manifest.json` file in this folder 

#### Enabling developer console 
1. navigate to `about:config` and add `"extensions.sdk.console.logLevel"` with a string value of `"all"`
2. restart Firefox 
3. Open to _Tools_ -> _Web developer_ -> _Browser console_  (alternatively use `cmd+shift+j`)
4. Click the settings icon and enable _Show Content Messages_


### Chrome 
#### Installing 
1. navigate to `chrome://extensions`
2. click _Load Unpacked_
3. select the `packages/extension`-folder (this directory)

#### Enabling developer console 
1. right click on the extension 
2. click _Inspect Pop-Up_