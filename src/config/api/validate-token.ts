import axios from 'axios';
import Config from 'react-native-config';
import { errorMessage } from '../staus/message';
import { Platform } from 'react-native';

export default class ValidateToken {
    private readonly requestUrl;

    constructor() {
        this.requestUrl = this.getRequestUrl();
    }

    requestTokenApi = (message: string) => {
        switch (message) {
            case errorMessage.ACCESS_TOKEN_INVALID:
                axios.post(`${this.requestUrl}/user/access-token`);
                break;

            case errorMessage.REFRESH_TOKEN_INVALID:
                axios.post(`${this.requestUrl}/user/refresh-token`);
                break;

            case errorMessage.NO_SIGN_IN:
                break;
        }
    }

    private getAccessToken = async () => {
        const accessToken = await axios.post(`${this.requestUrl}/user/access-token`);
        return accessToken;
    }

    private getRefreshToken = async () => {
        const refreshToken = await axios.post(`${this.requestUrl}/user/refresh-token`);
        return refreshToken;
    }

    private requestSignIn = async () => {

    }

    private getRequestUrl = () => {
        const baseUrl = Platform.OS === 'ios'
            ? process.env.IOS_REQUEST_URL 
            : Config.ANDROID_REQUEST_URL;

        if (!baseUrl) {
            throw 'NO ENV FILE';
        }

        return baseUrl;
    }
}