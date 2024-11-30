module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@services': './src/services',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@customTypes': './src/types',
          '@actionHooks': './src/actionHooks',
          '@config': './src/config',
          '@languages': './src/languages',
          '@redux': './src/redux',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
