<script setup>
import { ref } from 'vue'
import { usePeopleStore } from './stores/PeopleStore.js'
import Help from './icons/Help.vue'
import Arrow from './icons/Arrow.vue'
import Plus from './icons/Plus.vue'

const value = ref('')

const PeopleStore = usePeopleStore()

const clickHandler = () => {
    PeopleStore.add(value.value)
    value.value = ''
}
</script>

<template>
    <v-app>
        <v-app-bar
            app
            color="primary">
            <v-app-bar-title>
                <h4 class="text-h4 white--text text-center">
                    Делим счёт в кафе
                </h4>
            </v-app-bar-title>
            <v-btn>
                <Help />
            </v-btn>
        </v-app-bar>
        <h1 class="text-center my-5">Делим счёт в кафе</h1>
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
                    <v-text-field
                        label="Введите имя"
                        variant="solo-filled"
                        v-model="value"
                        v-on:keydown.enter="clickHandler" />
                </v-responsive>
                <v-btn
                    rounded
                    color="primary"
                    @click="clickHandler">
                    <Plus/>
                    Нажмите, чтобы добавить человека
                </v-btn>
                <!--   <v-divider
                        class="mt-5"
                        thickness /> -->
            </v-container>
            <v-card>
                <v-list
                    :items="PeopleStore.list"
                    item-title="name">
                    <v-list-item
                        v-for="item in PeopleStore.list"
                        :key="item.id">
                        <v-avatar
                            color="primary"
                            class="mr-4">
                            {{ item.name[0] }}
                        </v-avatar>
                        {{ item.name }}
                        <v-divider
                            class="my-2"
                            thickness />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-card>
        <v-btn
            href="/products"
            class="mx-auto mt-5"
            width="350"
            rounded
            color="primary">
<Arrow/>
            Дальше
        </v-btn>
    </v-app>
</template>

<style>
.CloseIcon {
    display: flex;
    justify-content: end;
}
</style>
