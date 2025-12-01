import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SkeletonAPP',
  webDir: 'www',
  server: {
    androidScheme: 'http'  // <- importante para evitar Mixed Content
  }
};

export default config;
