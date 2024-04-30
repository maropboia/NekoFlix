/**
 * @format
 */

// Import the necessary modules for testing
import 'react-native';
import React from 'react';
import App from '../App'; // Import the main App component to be tested

// Import testing utilities
import {it} from '@jest/globals'; // Import the 'it' function to define a test
import renderer from 'react-test-renderer'; // Import the renderer from 'react-test-renderer' to render the component

// Define a test that checks if the App component renders correctly
it('renders correctly', () => {
  // Use the renderer to create a rendering of the App component
  const tree = renderer.create(<App />);

  // The test passes if the rendering does not throw an error
});
