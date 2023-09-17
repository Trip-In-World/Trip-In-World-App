## How to run in local environment

### 1. node module install

```
npm install (or npm i)
```

### 2. Android Build

```
(macOS)
cd android
chmod +x gradlew

npm run android:dev
```

### 3. iOS Build

```
cd ios
pod install
cd ..
npm run ios:dev
```

## Run Prettier, Eslint

### Prettier

1. check prettier format

   ```
   npm run format
   ```

2. fix prettier format

   ```
   npm run format:fix
   ```

### ESlint

1. check eslint

   ```
   npm run lint
   ```

2. fix eslint

   ```
   npm run lint:fix
   ```
