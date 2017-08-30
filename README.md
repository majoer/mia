## Mia
An attempt at creating a personalized Jarvis (from Iron Man).

Speech recognition by Google Speech API.

#### Install
1. Install and add [Sox](http://sox.sourceforge.net/) to path
2. Create [Google Cloud App](https://cloud.google.com) with access to Google Speech API
3. Setup [Authentication](https://googlecloudplatform.github.io/google-cloud-node/#/docs/speech/0.10.2/guides/authentication) with Google Cloud APIs for NodeJs
4. Modify path to credentials file in Mia.js
5. `npm install`

#### How do I run this thing?
- Develop with live-restart: `npm run dev`
- Single instance: `node Mia.js`
