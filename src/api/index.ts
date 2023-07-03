import axios from 'axios';
import { Platform } from 'react-native';

const request = axios.create({
    baseURL: Platform.OS === 'ios'
        ? process.env.IOS_REQUEST_URL
        : process.env.ANDROID_REQUEST_URL,
    timeout: 30000,
    withCredentials: true,
});