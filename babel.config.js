module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@assets': './src/assets',
        '@constants': './src/constants',
        '@context': './src/context',
        '@types': './src/types',
        '@screens': './src/screens',
      },
    }],
  ],
};