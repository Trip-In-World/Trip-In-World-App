import ApiConfig from './api-config';
import ValidateToken from './validate-token';

export function initConfig() {
    const validatToken = new ValidateToken();
    const apiConfig = new ApiConfig(validatToken);
}