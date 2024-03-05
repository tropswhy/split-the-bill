<script setup>
import { ref } from 'vue'
import { useProductsStore } from '../../stores/ProductsStore';

const props = defineProps(['person', 'product'])
const checked = ref(props.product.whoAte)
const ProductStore = useProductsStore()

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
    padding: 12px;
    min-width: 150px;
}
</style>
