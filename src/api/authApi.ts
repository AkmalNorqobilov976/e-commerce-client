import type { LoginType, RegisterType } from "@/types/RegisterType";
import service from "@/utilities/service";

export function register(data: Omit<RegisterType, 'confirmPassword'>): Promise<any> {
    return service({
        url: '/auth/register',
        method: 'POST',
        data
    });
}

export function signin(data: LoginType): Promise<any> {
    return service({
        url: '/auth/signin',
        method: 'POST',
        data
    });
}