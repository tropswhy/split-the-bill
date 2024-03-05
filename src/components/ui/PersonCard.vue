<script setup>
import { ref } from 'vue'
import { useProductStore } from '../../stores/ProductStore';

const props = defineProps(['person', 'product'])
const checked = ref(props.product.whoAte)
const ProductStore = useProductStore()

</script>

<template>
    <div class="card bg-blue-lighten-4">
        <v-checkbox
            v-model="checked"
            density="comfortable"
            @update:modelValue="ProductStore.updateWhoAteId(product.id, person.id, checked)"
            />
        <p>
            {{ `${person.name.slice(0, 10)}${person.name.length > 9 ? '...' : ''}` }}
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
    margin-top: 12px;
    padding: 12px;
    min-width: 150px;
}
</style>
