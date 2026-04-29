// Default storage — used for native (Android/iOS) builds.
// Metro automatically picks `storage.web.ts` for web builds.
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = AsyncStorage;
