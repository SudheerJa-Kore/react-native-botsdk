# React Native Kore Bot SDK

[![NPM Version](https://img.shields.io/npm/v/rn-kore-bot-sdk-v77.svg?style=flat-square)](https://www.npmjs.com/package/rn-kore-bot-sdk-v77)

React Native library for Kore.ai chatbot UIs. Install the SDK and **all** listed dependencies in your app, then follow the steps below.

---

## Requirements

| Item | Version |
|------|---------|
| React Native | **0.77.x** (see SDK `peerDependencies`) |
| React | **≥ 18.0.0** |
| Node.js | **≥ 18** |

---

## 1. Install the SDK and all dependencies

Add **`rn-kore-bot-sdk-v77`** and **all** of the packages below so chat, voice, media, carousel, pickers, and related UI work without extra steps.

```bash
npm install rn-kore-bot-sdk-v77 \
  @react-native-async-storage/async-storage@^2.2.0 \
  @react-native-community/datetimepicker@^8.4.4 \
  @react-native-community/netinfo@^11.4.1 \
  @react-native-community/slider@^5.0.1 \
  @react-native-picker/picker@^2.11.0 \
  @react-native-voice/voice@^3.2.4 \
  @react-navigation/native@^7.1.14 \
  @react-navigation/stack@^7.4.2 \
  axios@^1.10.0 \
  dayjs@^1.11.13 \
  react-native-blob-util@^0.22.2 \
  react-native-bootsplash@^6.3.9 \
  react-native-communications@^2.2.1 \
  react-native-document-picker@^9.3.1 \
  react-native-fast-image@^8.6.3 \
  react-native-file-viewer@^2.1.5 \
  react-native-fs@^2.20.0 \
  react-native-gesture-handler@^2.27.2 \
  react-native-image-picker@^8.2.1 \
  react-native-linear-gradient@^2.8.3 \
  react-native-paper@^5.14.5 \
  react-native-parsed-text@^0.0.22 \
  react-native-permissions@^5.4.2 \
  react-native-popover-view@^6.1.0 \
  react-native-progress@^5.0.1 \
  react-native-reanimated@3.18.0 \
  react-native-reanimated-carousel@^4.0.3 \
  react-native-safe-area-context@^5.4.1 \
  react-native-screens@4.13.1 \
  react-native-shadow-2@^7.1.0 \
  react-native-sound@^0.12.0 \
  react-native-svg@15.13.0 \
  react-native-toast-message@^2.3.0 \
  react-native-tts@^4.1.1 \
  react-native-user-agent@^2.3.1 \
  react-native-vector-icons@^10.2.0 \
  react-native-video@^6.16.1 \
  rn-kore-bot-socket-lib-v77@^0.0.8
```

Align patch/minor versions with your app as needed; keep **`react-native-reanimated@3.18.0`** and **`react-native-screens`** compatible with RN 0.77.

---

## 2. Apply patches

After **`npm install`**, run patches **before** building or running iOS/Android when developing this SDK locally:

```bash
npm run patches
```

This runs `patch-package` and the community CLI helper. **`postinstall`** runs the same steps automatically unless you used **`npm install --ignore-scripts`**. If scripts were skipped or patches failed, run **`npm run patches`** manually.

Apps that consume **`rn-kore-bot-sdk-v77`** from npm get **`postinstall`** on the package when scripts are enabled.

---

## 3. React Native config

Create **`react-native.config.js`** in the app root (adjust the package name if yours differs):

```javascript
module.exports = {
  dependencies: {
    'rn-kore-bot-sdk-v77': { platforms: { android: null, ios: {} } },
  },
};
```

---

## 4. Babel (Reanimated)

In **`babel.config.js`**, put the Reanimated plugin **last**:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

Then: `npx react-native start --reset-cache` and rebuild after changes.

---

## 5. iOS — CocoaPods

```bash
cd ios && pod install && cd ..
```

If you use **react-native-permissions**, configure **`setup_permissions([...])`** in the **Podfile** (Camera, PhotoLibrary, Microphone, SpeechRecognition, etc.) before `pod install`.

---

## 6. Add Kore Chat to your app

Wrap with **`GestureHandlerRootView`**. On iOS, **`KeyboardAvoidingView`** avoids the keyboard covering the input.

```tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import KoreChat, { BotConfigModel } from 'rn-kore-bot-sdk-v77';

const botConfig: BotConfigModel = {
  botId: 'your-bot-id',
  chatBotName: 'Assistant',
  serverUrl: 'https://your.server.url',
  brandingAPIUrl: 'https://your.branding.url',
  customerId: 'your-customer-id',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  identity: 'your-user-identity',
  isAnonymous: false,
  isPlatform: true,
};

export default function App() {
  const chat = (
    <SafeAreaView style={{ flex: 1 }}>
      <KoreChat
        botConfig={botConfig}
        onListItemClick={(item) => console.log(item)}
        onHeaderActionsClick={(action) => console.log(action)}
      />
    </SafeAreaView>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={0}>
          {chat}
        </KeyboardAvoidingView>
      ) : (
        chat
      )}
    </GestureHandlerRootView>
  );
}
```

Register the app entry (e.g. **`index.js`**):

```javascript
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

---

## 7. Permissions

**iOS — `Info.plist`:**

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Microphone access for voice messages</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Speech recognition for voice input</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Photo library for attachments</string>
<key>NSCameraUsageDescription</key>
<string>Camera for photos</string>
```

**Android — `AndroidManifest.xml`:**

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
```

---

## 8. Build and run

```bash
npx react-native run-ios
# or
npx react-native run-android
```

---

## Quick checklist

1. Install **SDK + all dependencies** (section 1).
2. **`npm run patches`** after install when developing the SDK locally (section 2).
3. **`react-native.config.js`** (section 3).
4. **Babel** Reanimated plugin last (section 4).
5. **`pod install`** (section 5).
6. **KoreChat** + **GestureHandlerRootView** (section 6).
7. **Permissions** (section 7).
8. **Build** (section 8).

---

## Customization

**Theme:**

```tsx
import { ThemeProvider } from 'rn-kore-bot-sdk-v77';

<ThemeProvider theme={{ primaryColor: '#007AFF', /* ... */ }}>
  <KoreChat botConfig={botConfig} />
</ThemeProvider>
```

**Custom templates:** use `templateInjection` with `CustomTemplate` (see SDK types and `SampleApp`).

---

## API (short)

| Prop | Description |
|------|-------------|
| `botConfig` | **Required.** `BotConfigModel`: `botId`, `chatBotName`, `serverUrl`, `brandingAPIUrl`, plus auth fields as needed. |
| `onListItemClick` | Optional list item callback. |
| `onHeaderActionsClick` | Optional header action callback. |
| `templateInjection` | Optional `Map` of custom templates. |
| `themeConfig` | Optional theme overrides. |

**Errors:** `import { BotException } from 'rn-kore-bot-sdk-v77'` for typed error handling.

---

## Sample app

From the repository root:

```bash
npm install
npm run patches
cd SampleApp
npm install
npx react-native run-ios   # or run-android
```

---

## Troubleshooting

| Issue | What to try |
|-------|-------------|
| Carousel / animations broken | Reanimated plugin **last** in Babel → reset cache → rebuild. |
| Camera / uploads | **react-native-image-picker** + document picker + iOS permissions / Podfile. |
| Microphone / speech iOS | **react-native-permissions** Podfile `setup_permissions`, Info.plist strings. |
| Keyboard covers input (iOS) | **KeyboardAvoidingView** + `behavior="padding"`. |
| White screen | Check **`botConfig`** URLs and credentials; verify registered root component. |

---

## Development

```bash
git clone https://github.com/Koredotcom/react-native-botsdk.git
cd react-native-botsdk/RNKoreBotSDK
npm install
npm run patches
npm run build
npm run lint
npm test
```

---

## License

MIT — see [LICENSE](LICENSE).

---

## Support

Repository: [react-native-botsdk](https://github.com/Koredotcom/react-native-botsdk). NPM: [rn-kore-bot-sdk-v77](https://www.npmjs.com/package/rn-kore-bot-sdk-v77). Documentation: [Kore.ai](https://kore.ai).
