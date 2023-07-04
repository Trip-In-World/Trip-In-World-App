import axios from 'axios';
import { Platform } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const requestTo = axios.create({
    baseURL: Platform.OS === 'ios'
        ? process.env.IOS_REQUEST_URL
        : process.env.ANDROID_REQUEST_URL,
    timeout: 30000,
    withCredentials: true,
});

requestTo.interceptors.request.use(
    async (config) => {
        // TODO: redux 사용 변경
        const accessToken = await EncryptedStorage.getItem('accessToken');
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
)

requestTo.interceptors.response.use(
    (response) => {
        
    }
)