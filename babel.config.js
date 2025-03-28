module.exports = {
  //
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        root: ['./src'], // Set root directory
        alias: {
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/styles': './src/styles',
          '@/utils': './src/utils',
          '@/assets': './src/assets',
          '@/navigation': './src/navigation',
          '@/api': './src/api',
          '@/types': './src/types',
          '@/hooks': './src/hooks',
          '@/store': './src/store',
          '@/animations': './src/animations',
        },
      },
    ],
  ],
};
