<script setup>
import { ref } from 'vue'
import PersonCard from './ui/PersonCard.vue'
import { useProductStore } from '../stores/ProductStore.js'
import { usePersonStore } from '../stores/PersonStore.js'

import AppBar from '../components/ui/AppBar.vue'
import Input from './ui/Input.vue'
import AddButton from './ui/AddButton.vue'
import NextButton from './ui/NextButton.vue'


const name = ref('')
const price = ref('')

const ProductStore = useProductStore()
const PersonStore = usePersonStore()

const personIds = PersonStore.list.reduce(
    (accum, item) => [...accum, item.id],
    []
)

const clickHandler = () => {
    ProductStore.addProd(name.value, price.value, personIds)
    name.value = ''
    price.value = ''
}

const selectHandler = (selected, prodId) => {
    ProductStore.addPayerId(selected, prodId)
}
</script>

<template>
    <v-app>
        <AppBar />
        <v-card
            color="blue-lighten-5"
            class="mx-auto"
            max-width="600">
            <v-container class="text-center"> 
                <v-responsive
                    class="mx-auto"
                    width="600">
                    <Input
                        label="Введите позицию"
                        v-model="name" />
                    <Input
                        type="number"
                        v-model="price"
                        label="Введите цену"
                        prefix="₽"
                        v-on:keydown.enter="clickHandler" />
                </v-responsive>
                <AddButton @click="clickHandler">
                    Нажмите, чтобы добавить позицию
                </AddButton>
            </v-container>
            <v-card 
            class="overflow-y-auto"
            max-height="350">
                <v-list
                    :items="ProductStore.list"
                    item-title="name">
                    <v-list-item
                        v-for="product in ProductStore.list"
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
                                @click="ProductStore.delete(product.id)">
                            </v-btn>
                        </template>
                        <v-card color="blue-lighten-5">
                            <v-container>
                                <v-select
                                    width="300px"
                                    class="my-2"
                                    :items="PersonStore.list"
                                    item-title="name"
                                    item-value="id"
                                    density="comfortable"
                                    variant="solo-filled"
                                    label="Плательщик"
                                    single-line
                                    @update:modelValue="
                                        (value) =>
                                            selectHandler(value, product.id)" 
                                />
                            <p class="text-center">Выберите тех, кто ел или пил</p>
                            <v-layout
                                class="overflow-x-auto layout"
                                d-flex
                                align-center
                                justify-center
                                row
                                fill-height>
                                <div v-for="person in PersonStore.list">
                                    <PersonCard
                                        :person="person"
                                        :product="product" />
                                </div>
                            </v-layout>
                        </v-container>
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
            Промежуточный итог: {{ ProductStore.sum() }}
        </v-card>
        <NextButton
            v-if="ProductStore.list.length > 1"
            @click.prevent="$router.push(`/result`)"
        >
        К результатам!
        </NextButton>
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
