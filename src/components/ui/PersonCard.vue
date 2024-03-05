<script setup>
import { ref } from 'vue'

const props = defineProps(['name', 'checked'])
const checked = ref(props.checked)
</script>

<template>
    <div class="card bg-blue-lighten-4">
        <v-checkbox
            v-model="checked"
            density="comfortable"
            @update:modelValue=""
            />
        <p>
            {{ `${name.slice(0, 10)}${name.length > 9 ? '...' : ''}` }}
        </p>
    </div>
</template>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    padding: 12px;
    min-width: 150px;
}
</style>
