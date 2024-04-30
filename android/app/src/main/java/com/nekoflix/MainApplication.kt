package com.nekoflix

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader
import com.kroosx4v.orientationmanager.OrientationManagerActivityLifecycleCallbacks;
import com.microsoft.codepush.react.CodePush

// This is the main application class for the NekoFlix app. It extends the Application class
// provided by the Android framework and implements the ReactApplication interface provided
// by the React Native framework.
class MainApplication : Application(), ReactApplication {

  // This property holds an instance of the ReactNativeHost class, which is used to configure
  // and create a React Native host for this application.
  override val reactNativeHost: ReactNativeHost =
      // This is an object expression that creates an anonymous object extending the
      // DefaultReactNativeHost class. This object overrides several methods to customize
      // the behavior of the React Native host.
      object : DefaultReactNativeHost(this) {
        // This method returns a list of ReactPackage instances that will be used to
        // initialize the React Native host.
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }
        // This method returns the file path of the JavaScript bundle that will be loaded
        // by the React Native host.
        override fun getJSBundleFile(): String {
                    return CodePush.getJSBundleFile() // This line retrieves the JS bundle file path from the CodePush library.
        }
        // This method returns the name of the main JavaScript module that will be loaded
        // by the React Native host.
        override fun getJSMainModuleName(): String = "index"

        // This method indicates whether the React Native host should use the developer
        // support features (e.g., live reloading, hot module replacement).
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        // This property indicates whether the React Native host should use the new architecture
        // (Fabric) or the old architecture (TurboModules).
        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        // This property indicates whether the React Native host should use the Hermes JavaScript
        // engine or the JavaScriptCore engine.
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  // This property holds an instance of the ReactHost class, which is used to manage the
  // lifecycle of the React Native host.
  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost) // This line retrieves the default ReactHost instance using the application context and the ReactNativeHost instance.

  // This method is called when the application is created. It initializes the SoLoader library,
  // registers the OrientationManagerActivityLifecycleCallbacks to handle screen orientation changes,
  // initializes Flipper for debugging and profiling, and calls the superclass's onCreate method.
  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false) // This line initializes the SoLoader library with the application context and a flag indicating whether to enable the native code debugging feature.
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If the new architecture is enabled, this line loads the native entry point for this app.
      load()
    }
    registerActivityLifecycleCallbacks(OrientationManagerActivityLifecycleCallbacks()); // This line registers the OrientationManagerActivityLifecycleCallbacks to handle screen orientation changes.
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager) // This line initializes Flipper for debugging and profiling with the application context, the ReactNativeHost instance, and the ReactInstanceManager instance.
  }
}

