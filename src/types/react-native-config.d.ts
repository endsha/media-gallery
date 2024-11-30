declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
    IS_DEV?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
