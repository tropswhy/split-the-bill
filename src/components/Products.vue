<script setup>
import { ref } from 'vue'
import PersonCard from './ui/PersonCard.vue'
import { useProductsStore } from '../stores/ProductsStore.js'
import { usePeopleStore } from '../stores/PeopleStore.js'

import AppBar from '../components/ui/AppBar.vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'

const name = ref('')
const price = ref('')
/* const payerId = ref() */
const noSelect = {
    id: 0,
    name: 'Плательщик',
}

const ProductsStore = useProductsStore()
const PeopleStore = usePeopleStore()

const personIds = PeopleStore.list.reduce((accum, item) => [...accum, item.id], [])

const clickHandler = () => {
    ProductsStore.addProd(name.value, price.value, personIds)
    name.value = ''
    price.value = ''
    /*     console.log(name, price, payerId) */
    /* payerId.value = '' */
}

const selectHandler = (selected, prodId) => {
    ProductsStore.addPayerId(selected, prodId)
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
                        width="600"
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
                        v-for="product in ProductsStore.list"
                        :key="product.id">
                        {{ product.name }}
                        {{ product.price + ' рублей' }}
                        <template v-slot:append>
                            <v-btn
                                fab="true"
                                small
                                density="default"
                                color="primary"
                                icon="mdi-minus"
                                @click="ProductsStore.delete(product.id)">
                            </v-btn>
                        </template>
                        <v-card color="blue-lighten-5">
                            <v-select
                                class="my-2"
                                :items="PeopleStore.list"
                                item-title="name"
                                item-value="id"
                                density="comfortable"
                                variant="solo-filled"
                                label="Плательщик"
                                single-line
                                @update:modelValue="
                                    (value) => selectHandler(value, product.id)
                                " />
                            Выберите тех, кто ел
                            <v-layout
                                class="overflow-x-auto layout"
                                d-flex
                                align-center
                                justify-center
                                row
                                fill-height>
                                <div v-for="person in PeopleStore.list">
                                    <PersonCard
                                        :person="person"
                                        :product="product"
                                        />
                                        <!-- :checked="
                                            product.whoAte.includes(person.id)
                                        "  -->
                                </div>
                            </v-layout>
                        </v-card>
                        <v-divider
                            class="my-2"
                            thickness />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-card>
        <v-card
            color="blue-lighten-5"
            class="mx-auto my-5 text-center"
            width="300">
            Промежуточный итог: {{ ProductsStore.sum() }}
        </v-card>
    </v-app>
</template>

<style lang="scss" scoped>
.layout {
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    white-space: nowrap;
    max-width: 450px;
    overflow: auto;
}
</style>
