"use client";

import Parse from 'parse';

// Initialize Parse
export function initializeParse() {
  // Initialize Parse with your application ID and server URL
  Parse.initialize(
    process.env.NEXT_PUBLIC_PARSE_APP_ID || 'your-app-id',
    process.env.NEXT_PUBLIC_PARSE_JS_KEY || 'your-js-key'
  );
  
  // Set the server URL
  Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL || 'https://your-parse-server.com/parse';
}

// Helper function to get the current user
export function getCurrentUser() {
  return Parse.User.current();
}

// Helper function to log in a user
export async function loginUser(username: string, password: string) {
  try {
    const user = await Parse.User.logIn(username, password);
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Helper function to sign up a user
export async function signupUser(username: string, password: string, email: string) {
  try {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    
    await user.signUp();
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

// Helper function to log out a user
export async function logoutUser() {
  try {
    await Parse.User.logOut();
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}
