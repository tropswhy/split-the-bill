<script setup>
import { ref } from 'vue'
import { usePeopleStore } from './stores/PeopleStore.js'
import Input from './components/ui/Input.vue'
import Button from './components/ui/Button.vue'
import AppBar from './components/ui/AppBar.vue'

const value = ref('')

const PeopleStore = usePeopleStore()

const clickHandler = () => {
    PeopleStore.add(value.value)
    value.value = ''
}

</script>

<template>
    <v-app>
        <AppBar/>
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
                        label="Введите имя"
                        v-model="value"
                        v-on:keydown.enter="clickHandler" />
                </v-responsive>
                <Button
                    @click="clickHandler"
                    prepend-icon="mdi-plus-circle-outline">
                    <v-icon v-slot:prepend></v-icon>
                    Нажмите, чтобы добавить человека
                </Button>
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
                        <template v-slot:append>
                            <v-btn
                                fab="true"
                                small
                                density="default"
                                color="primary"
                                icon="mdi-minus"
                                @click="PeopleStore.delete(item.id)">
                            </v-btn>
                        </template>
                        <v-divider
                            class="my-2"
                            thickness />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-card>
        <Button
            v-if="PeopleStore.list.length > 1"
            @click.prevent="$router.push(`/products`)"
            class="mx-auto mt-5"
            width="350"
            prepend-icon="mdi-arrow-right-thin-circle-outline"
            >
            <!-- <v-icon></v-icon> -->
            Продолжить
        </Button>
        <v-container v-else>
            <v-alert
                color="error"
                width="350"
                border="bottom"
                border-color="error"
                class="text-center mx-auto mt-5"
                text="Добавьте хотя бы двух человек, чтобы продолжить"
                variant="tonal" />
        </v-container>
    </v-app>
</template>

<style></style>
