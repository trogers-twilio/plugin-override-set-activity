# Twilio Flex Plugin: Override Set Activity

## Overview
The Flex UI does not currently allow users to change to a non-Idle/Available activity while they have pending reservations. However, the udpate worker REST API does support rejecting pending reservations when changing the worker's activity.

This Flex plugin overrides the SetActivity action to allow users to change their activity to Offline even if they have pending reservations. To do that, it depends on the Twilio function in this repo:

https://github.com/trogers-twilio/function-set-worker-activity

Once that function is deployed, this plugin can be tested, built, and deployed.

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards install the dependencies by running `npm install`:

```bash
cd plugin-override-set-activity

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it, in order to deply it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex which would provide them globally.
