import axios from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

// TODO: react-native-config 접근 방법으로 수정
const requestTo = axios.create({
    baseURL: Platform.OS === 'ios'
        ? Config.IOS_REQUEST_URL
        : Config.ANDROID_REQUEST_URL,
    timeout: 30000,
    withCredentials: true,
});

requestTo.interceptors.request.use(
    async (config) => {
        // TODO: redux 사용 변경
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

requestTo.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 1. accessToken, refreshToken이 만료된 경우
        if (error.response?.status === 401) {
            
        }

        // 3. token이 존재하나 권한이 없는 경우
        if (error.response?.status === 403) {

        }
    }
)