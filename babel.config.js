module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: [
                    '.ios.ts',
                    '.android.ts',
                    '.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.tsx',
                    '.jsx',
                    '.js',
                    '.json',
                ],
                root: ['.'],
                alias: {
                    '@assets': './src/assets/',
                    '@components': './src/components/',
                    '@config': './src/config/',
                    '@hooks': './src/hooks/',
                    '@navigation': './src/navigation/',
                    '@screens': './src/screen/',
                    '@stores': './src/stores/',
                },
            },
        ],
    ],
};
