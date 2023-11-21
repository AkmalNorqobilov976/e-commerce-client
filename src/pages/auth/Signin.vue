<script setup lang="ts">
import { reactive } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import type { LoginType } from '@/types/RegisterType';

const router = useRouter();
const authStore = useAuthStore();
const signinForm = reactive<LoginType>({
    username: '',
    password: ''
});

const signinFormValidation = {
    username: {
        required
    },
    password: {
        required,
        minLength: minLength(6)
    }
};

const v$ = useVuelidate(signinFormValidation, signinForm);
const onSignin = () => {
    v$.value.$validate()
        .then((res: boolean) => {
            if(res) {
                authStore.signin(signinForm)
                    .then(() => {
                        router.push('/');
                        toast.success('You have registered  successfully!!!')
                    }).catch(error => {
                        toast.error(error.message || 'Failed');
                    });
            }
        });
}
</script>
<template>
  <div id="register" class="h-screen flex justify-center items-center bg-slate-600">
        <div class="bg-gray-100 p-5 w-1/3">
            <h4 class="bg-blue-300 p-4 text-2xl text-white">Sign In</h4>
            <form class="mt-2" @submit.prevent="onSignin">
                <div>
                    <BaseInput 
                        label="Username" 
                        inputId="username" 
                        v-model="signinForm.username"
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
                    v-model="signinForm.password"
                    />
                    <span 
                        class="text-red-600" 
                        v-if="v$.password.$error"
                    >{{ v$.password.$errors[0].$message }}</span>
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
                    Sign In
                </button>
            </form>
        </div>
    </div>
</template>