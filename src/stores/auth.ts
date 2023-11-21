import { register, signin } from "@/api/authApi";
import type { RegisterType, LoginType } from "@/types/RegisterType";
import { getToken, setToken } from "@/utilities/storage";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: getToken(),
        user: Object as any
    }),
    actions: {
        register(data: Omit<RegisterType, 'confirmPassword'>) {
            return new Promise((resolve, reject) => {
                register(data)
                    .then(response => {
                        this.user = response.data.user;
                        this.token = response.data.token;
                        setToken(this.token);
                        resolve(true);
                    }).catch(error => {
                        reject(error);
                    })
            });
        },
        signin(data: LoginType) {
            return new Promise((resolve, reject) => {
                signin(data)
                    .then(res => {
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    });
            });
        }
    }
})