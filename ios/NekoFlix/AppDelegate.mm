// Import the AppDelegate header file.
#import "AppDelegate.h"

// Import the RCTBundleURLProvider module from React.
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

// The application:didFinishLaunchingWithOptions: method is called when the application has finished launching.
// It is where you should initialize your application and setup any data or services it needs.
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Set the module name for the React Native application.
  // This is the name of the JavaScript bundle that will be loaded.
  self.moduleName = @"NekoFlix";

  // You can add custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // Call the superclass's implementation of the method.
  // This is necessary to ensure that the application finishes launching correctly.
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// The sourceURLForBridge: method is called by the React Native bridge when it needs to load the JavaScript bundle.
// It should return the URL of the bundle.
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  // Call the getBundleURL method to get the URL of the JavaScript bundle.
  return [self getBundleURL];
}

// The getBundleURL method returns the URL of the JavaScript bundle.
// It uses a different URL depending on whether the application is running in debug mode or not.
// In debug mode, it uses the URL provided by the RCTBundleURLProvider.
// In release mode, it uses the URL of the main.jsbundle file in the application's main bundle.
- (NSURL *)getBundleURL
{
#if DEBUG
  // Return the URL of the JavaScript bundle in debug mode.
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  // Return the URL of the JavaScript bundle in release mode.
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

