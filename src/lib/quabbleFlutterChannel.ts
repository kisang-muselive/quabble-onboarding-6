// quabbleChannel.ts
export interface QuabbleFlutterChannel {
    postMessage: (msg: string) => void;
  }
  
  declare global {
    interface Window {
      QuabbleFlutterChannel?: QuabbleFlutterChannel;
      // Global functions for Flutter to call back to web
      onSigninSuccess?: (userData: any) => void;
      onSigninError?: (error: string) => void;
    }
  }
  
  
  export function sendToFlutter(
    event: string,
    payload: Record<string, unknown> = {}
  ) {
    console.log('[QuabbleFlutterChannel] Sending message:', event, payload);
    const channel = window.QuabbleFlutterChannel;
    if (channel && typeof channel.postMessage === 'function') {
      channel.postMessage(JSON.stringify({ event, ...payload }));
    } else {
      console.log('[QuabbleFlutterChannel] Channel not found—probably in browser');
    }
  }

  // Setup global functions for Flutter to call back to web
  export function setupSigninCallbacks(
    onSuccess: (userData: any) => void,
    onError: (error: string) => void
  ) {
    window.onSigninSuccess = onSuccess;
    window.onSigninError = onError;
  }

  // Clean up global functions
  export function cleanupSigninCallbacks() {
    delete window.onSigninSuccess;
    delete window.onSigninError;
  }

  /*
  Flutter should call these global functions:

  Success:
  webViewController.runJavaScript('''
    if (window.onSigninSuccess) {
      window.onSigninSuccess(${jsonEncode(userData)});
    }
  ''');

  Error:
  webViewController.runJavaScript('''
    if (window.onSigninError) {
      window.onSigninError("Error message");
    }
  ''');
  */