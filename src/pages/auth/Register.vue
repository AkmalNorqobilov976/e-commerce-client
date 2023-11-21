<script setup lang="ts">
import { reactive } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import { required, minLength, sameAs } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import type { RegisterType } from '@/types/RegisterType';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const registerForm = reactive<RegisterType>({
    username: "",
    password: "",
    region: "",
    district: "",
    confirmPassword: ""
});

const registerFormValidation = {
    username: {
        required
    },
    password: {
        required,
        minLength: minLength(6)
    },
    confirmPassword: {
        required,
        sameAs: sameAs('password'),
        
    },
    region: {
        required
    },
    district: {
        required
    }
};

const v$ = useVuelidate(registerFormValidation, registerForm);
const onRegister = () => {
    v$.value.$validate()
        .then((res: boolean) => {
            if(res) {
                authStore.register({
                    username: registerForm.username,
                    password: registerForm.password,
                    region: registerForm.region,
                    district: registerForm.district
                })
                    .then(() => {
                        router.push('/');
                        toast.success('You have registered  successfully!!!')
                    }).catch(error => {
                        toast.error(error.message || 'Failed');
                    });
            }
        })
}
</script>

<template>
    <div id="register" class="h-screen flex justify-center items-center bg-slate-600">
        <div class="bg-gray-100 p-5 w-1/3">
            <h4 class="bg-blue-300 p-4 text-2xl text-white">Register</h4>
            <form class="mt-2" @submit.prevent="onRegister">
                <div>
                    <BaseInput 
                        label="Username" 
                        inputId="username" 
                        v-model="registerForm.username"
                    />
                    <span 
                        class="text-red-600" 
                        v-if="v$.username.$error"
                    >{{ v$.username.$errors[0].$message }}</span>
                </div>
                <div>
                    <BaseInput 
                    type="password"
                    label="Password" 
                    inputId="password" 
                    v-model="registerForm.password"
                    />
                    <span 
                        class="text-red-600" 
                        v-if="v$.password.$error"
                    >{{ v$.password.$errors[0].$message }}</span>
                </div>
                <div>
                    <BaseInput 
                        type="password"
                        label="Confirm Password" 
                        inputId="confirmPassword" 
                        v-model="registerForm.confirmPassword"
                    />
                    <span 
                        class="text-red-600" 
                        v-if="v$.confirmPassword.$error"
                    >{{ v$.confirmPassword.$errors[0].$message }}</span>
                </div>
                <div>
                    <BaseInput 
                        label="Region" 
                        inputId="region" 
                        v-model="registerForm.region"
                    />
                    <span 
                        class="text-red-600" 
                        v-if="v$.region.$error"
                    >{{ v$.region.$errors[0].$message }}</span>
                </div>
                <div>
                    <BaseInput 
                        label="District" 
                        inputId="district" 
                        v-model="registerForm.district"
                    />
                    <span 
                        class="text-red-600" 
                        v-if="v$.district.$error"
                    >{{ v$.district.$errors[0].$message }}</span>
                </div>
                <button
                    class="
                        w-full
                        bg-green-300
                        hover:bg-green-500
                        active:bg-green-100
                        py-2
                        rounded
                        text-lg
                        text-green-900
                        hover:text-white
                        mt-5
                        outline-none">
                    Register
                </button>
            </form>
        </div>
    </div>
</template>