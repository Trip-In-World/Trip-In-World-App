import axios from 'axios';
import Config from 'react-native-config';
import { errorMessage } from '../staus';
import { Platform } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

class ValidateToken {
    private readonly requestUrl;

    constructor() {
        this.requestUrl = this.getRequestUrl();
    }

    public requestTokenApi = async (message: string) => {
        switch (message) {
            case errorMessage.ACCESS_TOKEN_INVALID:
                const accessToken = await this.getAccessToken();
                await EncryptedStorage.setItem('accessToken', accessToken);
                break;

            case errorMessage.REFRESH_TOKEN_INVALID:
                const refreshToken = await this.getRefreshToken();
                await EncryptedStorage.setItem('refreshToken', refreshToken);
                break;

            case errorMessage.NO_SIGN_IN:
                // TODO: 로그인 페이지로 전환
                break;
        }
    }

    private getAccessToken = async () => {
        const { accessToken } = (await axios.post(`${this.requestUrl}/user/access-token`)).data;
        return accessToken;
    }

    private getRefreshToken = async () => {
        const { refreshToken } = (await axios.post(`${this.requestUrl}/user/refresh-token`)).data;
        return refreshToken;
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

export default new ValidateToken();