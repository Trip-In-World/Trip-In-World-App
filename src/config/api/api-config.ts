import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Platform } from 'react-native';
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
                const token = await this.getToken(config.url);

                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
        
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        
        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const { config, response } = error;

                // accessToken, refreshToken이 만료된 경우 or 로그인을 하지 않은 경우
                if (response.status === 401) {
                    await this.requestTokenApi(response.data.message);

                    const accessToken = await EncryptedStorage.getItem('access-token');
                    config.headers['Authorization'] = `Bearer ${accessToken}`;

                    return axios(config);
                }

                return Promise.reject(error);
            }
        );

        return instance;
    }

    private requestTokenApi = async (message: string) => {
        switch (message) {
            case errorMessage.ACCESS_TOKEN_INVALID:
                const { accessToken } = (await axios.post(`${this.requestUrl}/user/access-token`)).data;
                await EncryptedStorage.setItem('accessToken', accessToken);
                break;

            case errorMessage.REFRESH_TOKEN_INVALID:
                const { refreshToken } = (await axios.post(`${this.requestUrl}/user/refresh-token`)).data;
                await EncryptedStorage.setItem('refreshToken', refreshToken);
                break;

            case errorMessage.NO_SIGN_IN:
                // TODO: 로그인 페이지로 전환
                break;
        }
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

    private getToken = async (url: string | undefined) => {
        if (url === '/user/refresh-token') {
            return await EncryptedStorage.getItem('refresh-token');
        }
        
        return await EncryptedStorage.getItem('access-token');
    }
}

export default new ApiConfig();