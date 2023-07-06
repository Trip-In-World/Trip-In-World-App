import axios, { AxiosInstance, AxiosStatic } from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Platform } from 'react-native';
import ValidateToken from './validate-token';

export default class ApiConfig {
    readonly requestUrl: string;
    readonly requestTo: AxiosInstance;
    
    constructor(private validateToken: ValidateToken) {
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
            (error) => {
                const { response } = error;
        
                // accessToken, refreshToken이 만료된 경우 or 로그인을 하지 않은 경우
                if (response.status === 401) {
                    this.validateToken.requestTokenApi(response.data.message);
                }
        
                // token이 존재하나 권한이 없는 경우
                if (response.status === 403) {

                }
            }
        )

        return instance;
    }

    private getRequestUrl = () => {
        const baseUrl = Platform.OS === 'ios'
            ? process.env.IOS_REQUEST_URL 
            : Config.ANDROID_REQUEST_URL;

        if (!baseUrl) {
            throw 'NOT ENV FILE';
        }

        return baseUrl;
    }
}