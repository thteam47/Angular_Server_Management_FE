export interface AuthenInfo {
    type: string;
    username: string;
    password: string;
    otp: number;
    request_id: string;
    type_mfa: string;
}