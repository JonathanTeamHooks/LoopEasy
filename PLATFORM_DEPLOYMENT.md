# LoopEasy Platform Deployment Guide

> Comprehensive guide for deploying LoopEasy to mobile and TV platforms
> Last Updated: January 2025

## Executive Summary

LoopEasy is currently a Next.js 16 web app with existing PWA support (manifest.json, icons). This guide covers deployment to 8+ platforms with prioritized recommendations.

### Quick Reference: Platform Priority & Costs

| Priority | Platform | Developer Cost | Est. Time | Difficulty |
|----------|----------|----------------|-----------|------------|
| 🥇 1 | iOS (Capacitor) | $99/year | 2-3 weeks | Medium |
| 🥇 1 | Android (Capacitor) | $25 one-time | 1-2 weeks | Easy |
| 🥈 2 | Amazon Fire TV | Free | 2-3 weeks | Medium |
| 🥈 2 | Google TV/Chromecast | $25 (Play Store) | 2-3 weeks | Medium |
| 🥉 3 | Roku | Free | 4-6 weeks | Hard |
| 🥉 3 | Samsung TV (Tizen) | Free | 3-4 weeks | Medium |
| 4 | Apple TV (tvOS) | $99/year (included) | 4-6 weeks | Hard |
| 4 | LG TV (webOS) | Free | 3-4 weeks | Medium |

**Total Developer Account Costs:** ~$124 (if doing all platforms)

---

## Part 1: Mobile Platforms

### 📱 iOS App Store

#### Requirements
- **Apple Developer Account:** $99/year
- **Mac with Xcode 15+** (required for building)
- **Apple Developer certificates and provisioning profiles**
- **App Store Connect account** (included with developer account)
- **App icons:** 1024x1024 App Store icon + various sizes
- **Screenshots:** Required for each device size (iPhone, iPad)

#### Technical Approach Options

| Option | Pros | Cons | Recommended |
|--------|------|------|-------------|
| **Capacitor** ⭐ | Reuse Next.js code, native plugins, easy | Minor config needed | **YES** |
| React Native wrapper | Full native feel | Requires rewrite | No |
| PWA (Home Screen) | Zero effort | Limited features, no App Store presence | No |

#### Recommended: Capacitor Implementation

**Step 1: Install Capacitor**
```bash
cd /Users/codykingston/projects/loopeasy
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init LoopEasy com.loopeasy.app
```

**Step 2: Configure Next.js for Static Export**

Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
};
export default nextConfig;
```

**Step 3: Add iOS Platform**
```bash
npm run build
npx cap add ios
npx cap sync ios
```

**Step 4: Configure iOS Project**

Edit `ios/App/App/Info.plist`:
- Set app display name
- Configure URL schemes
- Add required permissions

**Step 5: Set Up Signing**
1. Log in to [Apple Developer Portal](https://developer.apple.com)
2. Create App ID: `com.loopeasy.app`
3. Create provisioning profile
4. In Xcode: Signing & Capabilities → Select team

**Step 6: Build & Submit**
```bash
npx cap open ios  # Opens Xcode
# In Xcode: Product → Archive → Distribute to App Store
```

#### App Store Submission Checklist
- [ ] App icon (1024x1024, no transparency)
- [ ] Screenshots for all device sizes
- [ ] App description (up to 4000 chars)
- [ ] Keywords (100 chars max)
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] Age rating questionnaire
- [ ] App Review Information

#### Costs & Timeline
- **Developer Account:** $99/year
- **Development Time:** 2-3 weeks
- **App Review:** 1-3 days (first submission may take longer)
- **Commission:** 15% for first $1M/year, then 30%

---

### 🤖 Android / Google Play

#### Requirements
- **Google Play Developer Account:** $25 one-time
- **Android Studio** (for debugging, optional)
- **Signed APK/AAB** (Android App Bundle preferred)
- **App icons:** 512x512 high-res icon
- **Feature graphic:** 1024x500
- **Screenshots:** Phone, 7" tablet, 10" tablet

#### Technical Approach Options

| Option | Pros | Cons | Recommended |
|--------|------|------|-------------|
| **Capacitor** ⭐ | Same codebase as iOS, simple | Minor config | **YES** |
| **TWA (Trusted Web Activity)** | Minimal code, fastest | Limited native features | Good for MVP |
| React Native | Full native | Complete rewrite | No |

#### Option A: Capacitor (Recommended - Share iOS code)

```bash
npm install @capacitor/android
npx cap add android
npx cap sync android
npx cap open android  # Opens Android Studio
```

**Signing Configuration** (`android/app/build.gradle`):
```gradle
android {
    signingConfigs {
        release {
            storeFile file('loopeasy-release.keystore')
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias 'loopeasy'
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

**Generate Release Build:**
```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

#### Option B: TWA (Trusted Web Activity) - Fastest MVP

TWA wraps your existing PWA in a native Android shell. Great for quick launch.

**Using Bubblewrap (Google's official tool):**
```bash
npm install -g @aspect/aspect
npx @aspect/aspect init --manifest=https://loopeasy.com/manifest.json
npx @aspect/aspect build
```

**Or use PWABuilder:**
1. Go to [pwabuilder.com](https://pwabuilder.com)
2. Enter `https://loopeasy.com`
3. Download Android package
4. Upload to Play Store

**TWA Requirements:**
- Valid HTTPS site
- Digital Asset Links file at `/.well-known/assetlinks.json`
- Service worker for offline support

**Create `public/.well-known/assetlinks.json`:**
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.loopeasy.twa",
    "sha256_cert_fingerprints": ["YOUR_SIGNING_CERT_FINGERPRINT"]
  }
}]
```

#### Google Play Submission Checklist
- [ ] App Bundle (AAB) or APK
- [ ] Store listing (title, description, screenshots)
- [ ] Content rating questionnaire
- [ ] Privacy policy
- [ ] Target API level compliance (currently API 34+)
- [ ] Data safety section

#### Costs & Timeline
- **Developer Account:** $25 one-time
- **Development Time:** 1-2 weeks (if sharing Capacitor code with iOS)
- **Review Time:** Hours to 1 week
- **Commission:** 15% for first $1M/year, then 30%

---

## Part 2: TV Platforms

### 🔥 Amazon Fire TV

#### Requirements
- **Amazon Developer Account:** FREE
- **Fire TV device or emulator** for testing
- **HTML5 web app** or Android APK
- **App icons:** Multiple sizes (small, large, focus icons)
- **Screenshots/Video:** Fire TV-specific assets

#### Technical Approaches

| Option | Pros | Cons | Recommended |
|--------|------|------|-------------|
| **HTML5 Web App** ⭐ | Reuse web code, fast development | Some API limitations | **YES** |
| Android APK | Full capabilities, share code with Play Store | Extra development | Good alternative |

#### HTML5 Web App Approach (Recommended)

Amazon Fire TV uses Amazon WebView (Chromium-based) with full HTML5, CSS3, and JavaScript support.

**Step 1: Create TV-Optimized Layout**

Create `src/app/tv/page.tsx`:
```typescript
'use client';
import { useEffect, useState } from 'react';

export default function TVLayout() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': setFocusedIndex(i => Math.max(0, i - 1)); break;
        case 'ArrowDown': setFocusedIndex(i => i + 1); break;
        case 'ArrowLeft': /* Handle */ break;
        case 'ArrowRight': /* Handle */ break;
        case 'Enter': /* Select */ break;
        case 'Escape': /* Back */ break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="tv-layout">
      {/* 10-foot UI with large touch targets */}
    </div>
  );
}
```

**Step 2: 10-Foot Experience Guidelines**
- **Font size:** Minimum 28px for body text
- **Focus states:** Clear, visible focus indicators (3-4px borders)
- **Button targets:** Minimum 50x50 device-independent pixels
- **Safe zone:** Keep content within 90% of screen (5% margins)
- **Color contrast:** 4.5:1 minimum ratio
- **No hover states:** Use focus states instead

**Step 3: Create Web App Manifest for Fire TV**

Create `firetv-manifest.json`:
```json
{
  "manifest_version": 1,
  "name": "LoopEasy",
  "start_url": "https://loopeasy.com/tv",
  "display_mode": "fullscreen",
  "orientation": "landscape",
  "icon": "https://loopeasy.com/firetv-icon-512.png"
}
```

**Step 4: Package as Hybrid App**

```bash
# Install Amazon Web App Tester on Fire TV for development
# Package using Amazon's Web App Packager or Cordova
```

#### Fire TV UI Requirements
- Support D-pad navigation (up/down/left/right)
- Handle Back button (return to previous state or exit)
- Support Media keys (play/pause/ff/rw)
- 1920x1080 resolution support
- Must work without touch input

#### Submission Process
1. Create app at [Amazon Developer Console](https://developer.amazon.com/apps-and-games)
2. Select "Fire TV" as target device
3. Upload APK or web app package
4. Add store listing assets
5. Submit for review

#### Costs & Timeline
- **Developer Account:** FREE
- **Development Time:** 2-3 weeks (TV UI adaptation)
- **Review Time:** 1-2 weeks
- **Commission:** 30% (15% for small developers <$1M)

---

### 📺 Roku

#### Requirements
- **Roku Developer Account:** FREE
- **Roku device** for testing (sideloading enabled)
- **BrightScript/SceneGraph** knowledge required
- **Channel artwork:** Various sizes and formats
- **No Direct Publisher:** Sunset as of Jan 2024 - must use SDK

#### ⚠️ Important: Direct Publisher Sunset

As of January 12, 2024, Roku's Direct Publisher (the easy no-code option) has been discontinued. All channels must now be built with the Roku SDK using BrightScript/SceneGraph.

#### Technical Approach

| Option | Effort | Recommended |
|--------|--------|-------------|
| **Custom BrightScript Channel** | High | Required |
| Third-party service (Lightcast, Zype) | $$$$ | Consider if no dev resources |

#### BrightScript Implementation

**Project Structure:**
```
/manifest
/source/
  main.brs
  VideoScene.brs
  ChannelStore.brs
/components/
  VideoPlayer.xml
  RowList.xml
  ContentNode.xml
/images/
  icon_focus_hd.png
  icon_focus_sd.png
  splash_hd.jpg
```

**Basic manifest:**
```
title=LoopEasy
major_version=1
minor_version=0
build_version=1
mm_icon_focus_hd=pkg:/images/icon_focus_hd.png
mm_icon_focus_sd=pkg:/images/icon_focus_sd.png
splash_screen_hd=pkg:/images/splash_hd.jpg
ui_resolutions=hd
```

**Basic main.brs:**
```brightscript
sub Main()
    screen = CreateObject("roSGScreen")
    m.port = CreateObject("roMessagePort")
    screen.setMessagePort(m.port)
    
    scene = screen.CreateScene("MainScene")
    screen.show()
    
    while(true)
        msg = wait(0, m.port)
        msgType = type(msg)
        if msgType = "roSGScreenEvent"
            if msg.isScreenClosed() then return
        end if
    end while
end sub
```

#### Roku Certification Requirements
- Must handle all remote buttons correctly
- Proper trick play support (ff/rw)
- Correct video playback behavior
- Accessibility requirements (closed captions if available)
- No crashes or hangs
- Proper deep linking support
- Ad integration compliance (if using ads)

#### Development & Testing
```bash
# Enable Developer Mode on Roku device
# Home x3 → Up x2 → Right → Left → Right → Left → Right

# Package channel
zip -r loopeasy.zip manifest source components images

# Deploy via Roku's Development Application Installer
# http://[roku-ip]:8060/
```

#### Costs & Timeline
- **Developer Account:** FREE
- **Development Time:** 4-6 weeks (BrightScript learning curve)
- **Certification:** 2-4 weeks
- **Commission:** Revenue share varies (typically 20-30%)

---

### 🍎 Apple TV (tvOS)

#### Requirements
- **Apple Developer Account:** $99/year (same as iOS)
- **Mac with Xcode 15+**
- **Apple TV device or simulator**
- **tvOS 17+ target** recommended

#### Technical Approaches

| Option | Pros | Cons | Recommended |
|--------|------|------|-------------|
| **TVML/TVMLKit** | JavaScript-based, web-like | Being deprecated, limited | No |
| **Native Swift/SwiftUI** ⭐ | Full features, future-proof | More development effort | **YES** |
| Capacitor (experimental) | Share code | Limited TV support | No |

#### SwiftUI Implementation (Recommended)

Apple is moving away from TVML. Native SwiftUI is the recommended approach.

**Project Setup:**
1. In Xcode: File → New → Project → tvOS → App
2. Select SwiftUI as interface

**Basic tvOS App Structure:**
```swift
import SwiftUI
import AVKit

@main
struct LoopEasyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var channels: [Channel] = []
    @FocusState private var focusedChannel: Channel.ID?
    
    var body: some View {
        NavigationStack {
            ScrollView {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 400))]) {
                    ForEach(channels) { channel in
                        ChannelCard(channel: channel)
                            .focused($focusedChannel, equals: channel.id)
                    }
                }
            }
        }
        .onAppear { loadChannels() }
    }
}
```

**Video Playback:**
```swift
struct VideoPlayerView: View {
    let videoURL: URL
    
    var body: some View {
        VideoPlayer(player: AVPlayer(url: videoURL))
            .ignoresSafeArea()
    }
}
```

#### tvOS Design Guidelines
- **Focus-driven navigation** (Siri Remote/game controller)
- **Large, legible text** (minimum 57pt for headers)
- **Parallax effects** for focused elements
- **Top Shelf extension** for quick access content
- **Wide color gamut** support (P3)

#### API Integration
You'll need to create a backend API that the tvOS app can call:
```swift
class APIService {
    func fetchChannels() async throws -> [Channel] {
        let url = URL(string: "https://loopeasy.com/api/channels")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([Channel].self, from: data)
    }
}
```

#### Costs & Timeline
- **Developer Account:** $99/year (included with iOS)
- **Development Time:** 4-6 weeks
- **Review Time:** 1-3 days
- **Difficulty:** High (native Swift development required)

---

### 📺 Samsung TV (Tizen)

#### Requirements
- **Samsung Developer Account:** FREE
- **Tizen Studio IDE**
- **Samsung TV or emulator** for testing
- **Web technologies:** HTML5, CSS3, JavaScript

#### Technical Approach

Samsung Tizen apps are built with web technologies (HTML5/CSS3/JS), making it relatively straightforward for a web app like LoopEasy.

**Step 1: Install Tizen Studio**
Download from [Samsung Developer](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/installing-tv-sdk.html)

**Step 2: Create Project**
```bash
# Create new Tizen Web Application
tizen create web-project -p tv-samsung-7.0 -t BasicProject -n LoopEasy
```

**Step 3: Project Structure:**
```
/config.xml
/index.html
/css/
  style.css
/js/
  main.js
  navigation.js
/images/
```

**config.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<widget xmlns="http://www.w3.org/ns/widgets" xmlns:tizen="http://tizen.org/ns/widgets" 
        id="http://loopeasy.com/tizen" version="1.0.0">
    <tizen:application id="loopeasy.LoopEasy" package="loopeasy" required_version="7.0"/>
    <content src="index.html"/>
    <feature name="http://tizen.org/feature/screen.size.all"/>
    <icon src="icon.png"/>
    <name>LoopEasy</name>
    <tizen:privilege name="http://tizen.org/privilege/internet"/>
    <tizen:privilege name="http://tizen.org/privilege/tv.inputdevice"/>
</widget>
```

**Key Navigation (js/navigation.js):**
```javascript
document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
        case 37: moveLeft(); break;    // Left
        case 38: moveUp(); break;      // Up
        case 39: moveRight(); break;   // Right
        case 40: moveDown(); break;    // Down
        case 13: select(); break;      // Enter/OK
        case 10009: goBack(); break;   // Back
        case 10182: exitApp(); break;  // Exit
    }
});
```

#### Tizen App Submission
1. Register at [Samsung Seller Office](https://seller.samsungapps.com)
2. Create certification profile
3. Package app (`.wgt` file)
4. Submit via Seller Office

#### Costs & Timeline
- **Developer Account:** FREE
- **Development Time:** 3-4 weeks
- **Certification:** 1-2 weeks
- **Regional restrictions:** Some regions require local business registration

---

### 📺 LG TV (webOS)

#### Requirements
- **LG Developer Account:** FREE
- **webOS TV SDK**
- **LG TV or webOS TV Simulator**
- **Web technologies:** HTML5, CSS3, JavaScript

#### Technical Approach

Very similar to Samsung Tizen - web-based apps.

**Step 1: Install webOS TV SDK**
Download from [webOS TV Developer](https://webostv.developer.lge.com/develop/tools/sdk-installation)

**Step 2: Create Project**
```bash
ares-generate -t webapp -p "id=com.loopeasy.app" LoopEasy
```

**Step 3: Project Structure:**
```
/appinfo.json
/index.html
/icon.png
/largeIcon.png
/css/
/js/
```

**appinfo.json:**
```json
{
  "id": "com.loopeasy.app",
  "version": "1.0.0",
  "vendor": "LoopEasy",
  "type": "web",
  "main": "index.html",
  "title": "LoopEasy",
  "icon": "icon.png",
  "largeIcon": "largeIcon.png"
}
```

**Magic Remote Navigation:**
```javascript
document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
        case 37: handleLeft(); break;
        case 38: handleUp(); break;
        case 39: handleRight(); break;
        case 40: handleDown(); break;
        case 13: handleOK(); break;
        case 461: handleBack(); break;  // LG Back key
    }
});
```

#### webOS Features to Implement
- `webOS.js` service for platform features
- Magic Remote pointer support
- Voice control integration (optional)
- Channels API for quick launch tiles

#### LG Content Store Submission
1. Register at [LG Seller Lounge](https://seller.lgappstv.com)
2. Complete QA testing requirements
3. Package app (`.ipk` file)
4. Submit with required documentation

#### Costs & Timeline
- **Developer Account:** FREE
- **Development Time:** 3-4 weeks
- **Certification:** 2-3 weeks
- **Documentation:** QA test report, user manual required

---

### 📺 Chromecast / Google TV

#### Requirements
- **Google Play Developer Account:** $25 one-time (same as Android)
- **Google Cast SDK**
- **Chromecast or Google TV device** for testing

#### Two Components Needed

1. **Sender App:** LoopEasy web/mobile app with Cast button
2. **Receiver App:** Web app that runs on Chromecast/Google TV

#### Cast SDK Integration (Sender - Web)

**Step 1: Add Cast Framework**
```html
<script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
```

**Step 2: Initialize Cast**
```javascript
window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    initializeCastApi();
  }
};

function initializeCastApi() {
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: 'YOUR_APP_ID',
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });
}
```

**Step 3: Add Cast Button**
```html
<google-cast-launcher></google-cast-launcher>
```

#### Receiver App (runs on Chromecast)

**receiver.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
</head>
<body>
  <cast-media-player></cast-media-player>
  <script>
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    context.start();
  </script>
</body>
</html>
```

#### Google TV Native App (Android TV)

For Google TV, you can adapt your Android Capacitor app for TV:

**AndroidManifest.xml additions:**
```xml
<uses-feature android:name="android.software.leanback" android:required="false" />
<uses-feature android:name="android:hardware.touchscreen" android:required="false" />

<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
    </intent-filter>
</activity>
```

#### Cast Console Registration
1. Go to [Google Cast SDK Developer Console](https://cast.google.com/publish)
2. Register receiver app
3. Get Application ID
4. Publish receiver

#### Costs & Timeline
- **Cast SDK:** FREE
- **Play Store (for Google TV app):** $25 one-time
- **Development Time:** 2-3 weeks
- **No additional review** for Cast receiver (uses existing web hosting)

---

## Part 3: Implementation Roadmap

### Phase 1: Mobile First (Weeks 1-4) 🎯

**Goal:** iOS and Android apps in stores

| Week | Tasks |
|------|-------|
| 1 | Set up Capacitor, configure static export, create signing certs |
| 2 | Add native plugins (push notifications, deep linking), test on devices |
| 3 | Create store listings, screenshots, submit iOS for review |
| 4 | Submit Android, address any iOS review feedback |

**Deliverables:**
- iOS app on App Store
- Android app on Google Play
- Capacitor project foundation for future updates

### Phase 2: Primary TV Platforms (Weeks 5-10) 🎯

**Goal:** Amazon Fire TV and Google TV apps

| Week | Tasks |
|------|-------|
| 5-6 | Create TV-optimized UI component (`/tv` route), D-pad navigation |
| 7 | Package Fire TV HTML5 app, test on device, submit |
| 8-9 | Adapt Android app for Google TV (Leanback), add Cast receiver |
| 10 | Submit Google TV app, implement Cast button in web app |

**Deliverables:**
- Amazon Fire TV app
- Google TV app
- Chromecast support

### Phase 3: Smart TVs (Weeks 11-16)

**Goal:** Samsung and LG TV apps

| Week | Tasks |
|------|-------|
| 11-12 | Port TV UI to Tizen (Samsung), test on emulator |
| 13 | Samsung certification submission |
| 14-15 | Port to webOS (LG), very similar to Tizen |
| 16 | LG certification submission |

**Deliverables:**
- Samsung Tizen app
- LG webOS app

### Phase 4: Premium Platforms (Weeks 17-24)

**Goal:** Apple TV and Roku

| Week | Tasks |
|------|-------|
| 17-20 | Develop native tvOS app (SwiftUI), API integration |
| 21 | Apple TV submission |
| 22-24 | Develop Roku channel (BrightScript), certification |

**Deliverables:**
- Apple TV app
- Roku channel

---

## Part 4: Shared Components

### TV Navigation Module

Create a reusable D-pad navigation system for web-based TV apps:

```typescript
// src/lib/tv-navigation.ts
export class TVNavigation {
  private grid: HTMLElement[][] = [];
  private currentRow = 0;
  private currentCol = 0;

  constructor(gridSelector: string) {
    this.initGrid(gridSelector);
    this.bindKeys();
  }

  private bindKeys() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp': this.move(0, -1); break;
        case 'ArrowDown': this.move(0, 1); break;
        case 'ArrowLeft': this.move(-1, 0); break;
        case 'ArrowRight': this.move(1, 0); break;
        case 'Enter': this.select(); break;
        case 'Escape': this.back(); break;
      }
    });
  }

  private move(dx: number, dy: number) {
    // Update focus with spatial navigation
  }
}
```

### API Endpoints for TV Apps

Native TV apps (tvOS, Roku) will need API endpoints:

```typescript
// src/app/api/tv/channels/route.ts
export async function GET() {
  // Return channels in TV-friendly format
  return Response.json({
    channels: [
      {
        id: 'ch_1',
        title: 'Channel Name',
        thumbnail: 'https://loopeasy.com/thumbnails/ch1.jpg',
        videoUrl: 'https://stream.mux.com/...',
      }
    ]
  });
}
```

### Asset Requirements Summary

| Platform | Icon Sizes | Screenshots | Video Preview |
|----------|------------|-------------|---------------|
| iOS | 1024x1024 (store), 180x180, 120x120, 60x60 | 6.7", 6.5", 5.5", iPad | Optional |
| Android | 512x512 (store), 192x192, 48x48 | Phone, 7" tablet, 10" tablet | Optional |
| Fire TV | 1280x720 (app), 114x114 (icon) | 1920x1080 | Required |
| Roku | 540x405 (focus HD), 290x218 (side SD) | 1920x1080 | Required |
| Apple TV | 1280x768 (large), 400x240 (icon) | 1920x1080 | Optional |
| Samsung | 512x423 (icon), 1920x1080 (poster) | 1920x1080 | Required |
| LG | 160x160 (icon), 336x336 (large) | 1920x1080 | Optional |

---

## Part 5: Costs Summary

### One-Time Costs
| Item | Cost |
|------|------|
| Apple Developer Account (annual) | $99 |
| Google Play Developer | $25 |
| Amazon Developer | FREE |
| Roku Developer | FREE |
| Samsung Developer | FREE |
| LG Developer | FREE |
| **Total Year 1** | **$124** |

### Ongoing Costs
| Item | Cost |
|------|------|
| Apple Developer renewal | $99/year |
| **Annual Ongoing** | **$99/year** |

### Revenue Share (on in-app purchases/subscriptions)

| Platform | Commission |
|----------|------------|
| iOS | 15% (<$1M), 30% (>$1M) |
| Android | 15% (<$1M), 30% (>$1M) |
| Amazon | 30% (15% for small devs) |
| Roku | 20-30% |
| Samsung | 30% |
| LG | 30% |
| Apple TV | 15-30% (same as iOS) |

---

## Part 6: Quick Start Commands

### iOS/Android (Capacitor)
```bash
cd /Users/codykingston/projects/loopeasy

# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# Initialize
npx cap init "LoopEasy" "com.loopeasy.app"

# Build web app
npm run build

# Add platforms
npx cap add ios
npx cap add android

# Sync and open
npx cap sync
npx cap open ios
npx cap open android
```

### Fire TV Testing
```bash
# Install ADB
adb connect <fire-tv-ip>:5555

# Install test APK
adb install loopeasy.apk

# View logs
adb logcat | grep LoopEasy
```

### Roku Development Mode
```
# Enable on Roku device:
# Home x3 → Up x2 → Right → Left → Right → Left → Right

# Note the IP address displayed
# Access dev console: http://<roku-ip>:8060
```

---

## Appendix: Resources

### Official Documentation
- [Apple Developer](https://developer.apple.com)
- [Google Play Console](https://play.google.com/console)
- [Amazon Fire TV Docs](https://developer.amazon.com/docs/fire-tv)
- [Roku Developer](https://developer.roku.com)
- [Samsung Tizen](https://developer.samsung.com/smarttv)
- [LG webOS](https://webostv.developer.lge.com)
- [Google Cast SDK](https://developers.google.com/cast)
- [Capacitor](https://capacitorjs.com/docs)

### Tools
- [PWABuilder](https://pwabuilder.com) - Quick TWA generation
- [Bubblewrap](https://github.com/ApostropheOrg/aspect) - CLI for TWA
- [Tizen Studio](https://developer.samsung.com/smarttv/develop/tools/tizen-studio.html)
- [webOS TV SDK](https://webostv.developer.lge.com/develop/tools/sdk-installation)

---

*This guide will be updated as platforms evolve. Last verified: January 2025*
