<script setup lang="ts">
import { defineProps, toRefs,defineEmits } from 'vue';
const props = defineProps({
    inputId: {

    },
    label: {
        type: String
    },
    modelValue: {
        type: String as any
    }
});

const emits = defineEmits(['update:modelValue']);

const {modelValue, label, inputId} = toRefs(props);

const updateModel = (e: any) => {
    emits('update:modelValue', e.target.value);
}
</script>
<template>
    <div class="flex flex-col gap-1">
        <label :for="inputId" class="text-lg">{{ label }}</label>
        <input 
            type="text"
            :id="inputId" 
            v-bind="$attrs" 
            :value="modelValue" 
            @input="updateModel($event)"
            class="outline-none border-2 text-lg border-gray-300 focus:border-gray-500"
        />
    </div>
</template>