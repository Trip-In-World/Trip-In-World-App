import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Platform } from 'react-native';
import validateToken from './validate-token';
import { errorMessage } from '../status/message/error-message';

class ApiConfig {
    public readonly requestTo: AxiosInstance;
    private readonly requestUrl: string;
    
    constructor() {
        this.requestUrl = this.getRequestUrl();
        this.requestTo = this.getRequestTo();
    }
    
    private getRequestTo = () => {
        const instance = axios.create({
            baseURL: this.requestUrl,
            timeout: 30000,
            withCredentials: true,
        });

        instance.interceptors.request.use(
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
        
        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const { response } = error;
        
                // accessToken, refreshToken이 만료된 경우 or 로그인을 하지 않은 경우
                if (response.status === 401) {
                    await validateToken.requestTokenApi(response.data.message);
                    return response;
                }

                return Promise.reject(error);
            }
        )

        return instance;
    }

    private getRequestUrl = () => {
        const baseUrl = Platform.OS === 'ios'
            ? Config.IOS_REQUEST_URL 
            : Config.ANDROID_REQUEST_URL;

        if (!baseUrl) {
            throw errorMessage.NO_ENV_FILE;
        }

        return baseUrl;
    }
}

export default new ApiConfig();