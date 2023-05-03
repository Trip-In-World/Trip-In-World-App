## How to run in local environment

1. node module install

```
npm install (or npm i)
```

2. Android Build

```
(macOS)
cd android
chmod +x gradlew 

npm run android
```

3. iOS Build

```
cd ios
pod install
cd ..
npm run ios
```

## Run Prettier, Eslint
### Prettier
```
# prettier format check
npm run format

# format fix
npx prettier --write ./src
```

### Eslint
```
# lint check
npm run lint

# lint fix
npx eslint ./src/**/*.tsx --fix
```