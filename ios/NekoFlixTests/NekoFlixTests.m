// Import UIKit and XCTest frameworks' headers
#import <UIKit/UIKit.h>
#import <XCTest/XCTest.h>

// Import React library's headers
#import <React/RCTLog.h>
#import <React/RCTRootView.h>

// Timeout duration for the test, in seconds
#define TIMEOUT_SECONDS 600

// Text to look for in the UI during the test
#define TEXT_TO_LOOK_FOR @"Welcome to React"

@interface NekoFlixTests : XCTestCase

@end

@implementation NekoFlixTests

// Recursively search for a subview in the given view that matches the given condition
- (BOOL)findSubviewInView:(UIView *)view matching:(BOOL (^)(UIView *view))test
{
  // If the view matches the condition, return YES
  if (test(view)) {
    return YES;
  }

  // Iterate through the subviews and search for a match recursively
  for (UIView *subview in [view subviews]) {
    if ([self findSubviewInView:subview matching:test]) {
      return YES;
    }
  }

  // No match found, return NO
  return NO;
}

// Test to check if the welcome screen is rendered
- (void)testRendersWelcomeScreen
{
  // Get the root view controller from the app's window
  UIViewController *vc = [[[RCTSharedApplication() delegate] window] rootViewController];

  // Set the timeout date
  NSDate *date = [NSDate dateWithTimeIntervalSinceNow:TIMEOUT_SECONDS];

  // Flag to track if the element is found
  BOOL foundElement = NO;

  // Error message holder
  __block NSString *redboxError = nil;

  // Set a custom log function for debugging purposes
#ifdef DEBUG
  RCTSetLogFunction(
      ^(RCTLogLevel level, RCTLogSource source, NSString *fileName, NSNumber *lineNumber, NSString *message) {
        if (level >= RCTLogLevelError) {
          redboxError = message;
        }
      });
#endif

  // Continuously loop until the element is found or the timeout is reached
  while ([date timeIntervalSinceNow] > 0 && !foundElement && !redboxError) {
    // Run the run loop to process events and update the UI
    [[NSRunLoop mainRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.1]];
    [[NSRunLoop mainRunLoop] runMode:NSRunLoopCommonModes beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.1]];

    // Search for the element in the UI
    foundElement = [self findSubviewInView:vc.view
                                  matching:^BOOL(UIView *view) {
                                    // If the accessibility label matches the text to look for, return YES
                                    if ([view.accessibilityLabel isEqualToString:TEXT_TO_LOOK_FOR]) {
                                      return YES;
                                    }
                                    return NO;
                                  }];
  }

  // Reset the log function to its default implementation
#ifdef DEBUG
  RCTSetLogFunction(RCTDefaultLogFunction);
#endif

  // Assert that there is no error message and the element is found
  XCTAssertNil(redboxError, @"RedBox error: %@", redboxError);
  XCTAssertTrue(foundElement, @"Couldn't find element with text '%@' in %d seconds", TEXT_TO_LOOK_FOR, TIMEOUT_SECONDS);
}

@end

