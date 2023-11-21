export type RegisterType = {
    username: string;
    password: string;
    confirmPassword: string;
    region: string;
    district: string;
}

export type LoginType = Pick<RegisterType, 'username' | 'password'>;