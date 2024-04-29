import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.migo.ads',
  appName: 'migo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      backgroundColor: "#12bcbe",
      splashFullScreen: true,
      splashImmersive: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Camera: {
      syncPhotosToGallery: true //OJO
    },
    // BackgroundRunner: {
    //   label: 'com.migo.ads.check',
    //   src: 'runners/runner.js',
    //   event: 'myEvent',
    //   repeat: true,
    //   interval: 30,
    //   autoStart: true,
    // },
  }	
};

export default config;
