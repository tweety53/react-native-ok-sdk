# React Native OK SDK
[![npm Version](https://img.shields.io/npm/v/react-native-ok-sdk.svg)](https://www.npmjs.com/package/react-native-ok-sdk) [![License](https://img.shields.io/npm/l/react-native-ok-sdk.svg)](https://www.npmjs.com/package/react-native-ok-sdk) [![Build Status](https://travis-ci.org/askiiRobotics/react-native-ok-sdk.svg)](https://travis-ci.org/askiiRobotics/react-native-ok-sdk)
===

React Native OK SDK is a wrapper around the iOS OK SDK and Android OK SDK, allowing for OK integration in [React Native](https://facebook.github.io/react-native/) apps. Access to native components for login is provided entirely through documented JavaScript modules so you don't have to call a single native function directly.

## GIVE FEEDBACK
Please post questions on sdk set up to stackoverflow for quicker response. Besides it's easier for others searching for similar questions.

Report bugs or issues of this package to [react-native-ok-sdk/issues](https://github.com/askiiRobotics/react-native-ok-sdk/issues).

Report bugs of IOS OK SDK to [ok-ios-sdk/issues](https://github.com/odnoklassniki/ok-ios-sdk/issues) or via [Telegram](https://telegram.me/joinchat/An0xvgHDHvWlSWNQWuzOkQ).

Report bugs of Android SDK to [ok-android-sdk/issues](https://github.com/odnoklassniki/ok-android-sdk/issues) or via [Telegram](https://t.me/OkAnfroidSdk).


## Installation
You need to install the sdk with [npm](https://www.npmjs.com/) and configure native Android/iOS project in the react native project.
### 1. Create React Native project

First create a React Native project:
```ruby
react-native init YourApp
```

### 2. Install JavaScript packages

Install and link the react-native-ok-sdk package:
```ruby
react-native install react-native-ok-sdk
```
### 3. Configure native projects

#### 3.1 Android project
You can do this with automatically with this command
```ruby
react-native link react-native-ok-sdk
```
and skip first three steps of followed guide. 
**IMPORTANT**: Step 4 is required in every case.

Or you can do it manually: 

Assuming you have [Android Studio](http://developer.android.com/sdk/index.html) installed, open the project with Android Studio.

**This instruction provided for react-native version is 0.29 or above**

1. Go to `MainApplication.java` under `app/src/main/java/com/<project name>/` to complete setup.

In `MainApplication.java` import package related to react-native-ok-sdk.

```java
import com.askiirobotics.reactnativeoksdk.OkPackage; 
...

public class MainApplication extends Application implements ReactApplication {
...
}
```

2. Register sdk package in method `getPackages()`.
```java
...

public class MainApplication extends Application implements ReactApplication {
... 
  @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          ...
          new VKAuthPackage()//<---- Add package
        );
    }
...
}
```

3. Next go to `android/settings.gradle` and add followed lines:
```gradle
    ...

    include ':react-native-ok-sdk'
    project(':react-native-ok-sdk').projectDir = new File(settingsDir, '../node_modules/react-native-ok-sdk/android')
```

and to `android/app/build.gradle`:
```gradle
    ...

    dependencies {
        ...
        compile project(':react-native-ok-sdk')
    }
```

4. In your `AndroidManifest.xml`, add following line inside `<application>` element:
```xml
    <activity
            android:name="ru.ok.android.sdk.OkAuthActivity"
            android:configChanges="orientation|screenSize"
            android:launchMode="singleTop">
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="okYOUR_APP_KEY"
                    android:scheme="okauth" />
            </intent-filter>
        </activity>
```
Note: changle in line `android:host="okYOUR_APP_KEY"` to key of your OK app.

Make sure that your `AndroidManifest.xml` contains inside `<manifest>` element followed line:
```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

#### 3.2 IOS Project

1. In the folder of your project run: 
```ruby
react-native link react-native-ok-sdk
```

2. Add ok{appId} schema to your app Info.plist file. For example ok12345 if your app has appId 12345. Don't forget add ok{appId}://authorize to allowed redirect urls for your application in ok.ru app profile. You can do this via XCode of manually:

```xml
 <key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Viewer</string>
			<key>CFBundleURLName</key>
			<string>ru.ok</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>ok12345</string>
			</array>
		</dict>
    ...
	</array>
  ...
  <key>LSApplicationQueriesSchemes</key>
	<array>
		<string>ok12345</string>
		<string>okauth</string>
    ...
	</array>
  ...  
	<key>item0</key>
	<string>okauth</string>
	<key>item1</key>
	<string>ok12345</string>
  ...
```


Also you should add next block to your Info.plist file.

```xml
 <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
        ...
    </dict>
```

**If you use PodSec**
1. To add CocoaPods to your React Native project, follow steps 2 throught 7 of [this](https://blog.callstack.io/login-users-with-facebook-in-react-native-4b230b847899#.lai35aq3a) tutorial.
Add this line:

    ```ruby
    pod 'react-native-ok-sdk', :path => '../node_modules/react-native-ok-sdk/ios'
    ```

to your Podfile (you may need to adjust path if you have non-standard project structure).
Don't forget to fix linker errors by adding `$(inherited)` to **Other Linker Flags** in Build Settings:

<img src="https://raw.githubusercontent.com/doomsower/react-native-vkontakte-login/master/images/other_linker_flags.png" alt="xcode url type" />

**If you not use PodSec** 
Add OKSDK.h and OKSDK.m to your project. For example you can use git submodule.


1. Init your sdk in AppDelegate didFinishLaunchingWithOptions
```objective-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    OKSDKInitSettings *settings = [OKSDKInitSettings new];
    settings.appKey = @"ABCDEFGABCDEGF";
    settings.appId = @"12345";
    settings.controllerHandler = ^{
        return self.window.rootViewController;
    };
    [OKSDK initWithSettings: settings];
    return YES;
}

2. Add openUrl to AppDelegate openURL
```objective-c
-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [OKSDK openUrl:url];
    return YES;
}
```

#### 3.3 Troubleshooting
1. I cannot run the Android project.

  - Make sure you added the code snippet in step 3.1.
  - Make sure you set up a OK app and updated the `AndroidManifest.xml`.

2. I get a build error stating that one of the OK SDK files was not found -- eg. `OKSDK.h file not found`.

  - Make sure that `OKSDK.framework` show up in the **Link Binary with Libraries** section of your build target's **Build Phases**.

3. I get this build error: `no type or protocol named UIApplicationOpenURLOptionsKey`:

  - Your XCode version is too old, upgrade to XCode 8.0+.

## Usage
#### Login Button + Access Token
```js
...
import OkManager, { Scopes } from 'react-native-ok-sdk'

class LoginButton extends React.Component {
  static propTypes = {
    onAuth: React.PropTypes.func
  };

  constructor(){
    this.loginPressed = this.loginPressed.bind(this)
  }

  loginPressed() {
    OkManager.login([Scopes.VALUABLE_ACCESS])
      .then(
        response => {
          console.log('OK login', response);
          this.props.onAuth(response);
        }
      )
      .catch(e => {
        console.log('OK Login error', e);
      })
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={ this.loginPressed }
          />
      </View>
    );
  }
}
```

See full example in `./example` folder.

## License
See the LICENSE file.