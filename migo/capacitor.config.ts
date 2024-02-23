import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'migo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 500,
      launchAutoHide: true,
      // launchFadeOutDuration: 300,
      backgroundColor: "#000000",
      // androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      showSpinner: false,
      // androidSpinnerStyle: "small",
      // splashFullScreen: true,
      // splashImmersive: true,
      // layoutName: "launch_screen",
      // useDialog: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Camera: {
      syncPhotosToGallery: false
    }    
    
  }	
};

export default config;
