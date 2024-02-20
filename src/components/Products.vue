<script setup>
import { ref } from 'vue'

import { useProductsStore } from '../stores/ProductsStore.js'

import AppBar from '../components/ui/AppBar.vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'

const name = ref('')
const price = ref('')

const ProductsStore = useProductsStore()

const clickHandler = () => {
    ProductsStore.addProd(name.value, price.value)
    name.value = ''
    price.value = ''
}
</script>

<template>
    <v-app>
        <AppBar />
        <v-card
            color="blue-lighten-5"
            class="mx-auto"
            max-width="600">
            <v-container
                class="text-center"
                max-width="100">
                <v-responsive
                    class="mx-auto"
                    width="600">
                    <Input
                        label="Введите позицию"
                        v-model="name"
                        v-on:keydown.enter="clickHandler" />
                    <Input
                        type="number"
                        v-model="price"
                        label="Введите цену"
                        prefix="₽"
                        v-on:keydown.enter="clickHandler" />
                </v-responsive>
                <Button
                    @click="clickHandler"
                    prepend-icon="mdi-plus-circle-outline">
                    <v-icon v-slot:prepend></v-icon>
                    Нажмите, чтобы добавить позицию
                </Button>
            </v-container>
            <v-card>
                <v-list
                    :items="ProductsStore.list"
                    item-title="name">
                    <v-list-item
                        v-for="item in ProductsStore.list"
                        :key="item.id">
                        <v-avatar
                            color="primary"
                            class="mr-4">
                            {{ item.name[0] }}
                        </v-avatar>
                        {{ item.name }}
                        <!-- <v-divider vertical inset class="mx-2" thickness/> -->
                        {{ item.price + ' рублей' }}
                        <template v-slot:append>
                            <v-btn
                                fab="true"
                                small
                                density="default"
                                color="primary"
                                icon="mdi-minus"
                                @click="ProductsStore.delete(item.id)">
                            </v-btn>
                        </template>
                        <v-divider
                            class="my-2"
                            thickness />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-card>
    </v-app>
</template>

<style lang="scss" scoped></style>
