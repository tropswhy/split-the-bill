<script setup>
import { ref } from 'vue'
import AppBar from '../components/ui/AppBar.vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'

const value = ref('')

const PeopleStore = usePeopleStore()

const clickHandler = () => {
    PeopleStore.add(value.value)
    value.value = ''
}

const nextPage = () => {
    if (PeopleStore.list.length > 1) {
        $router.push({
            name: 'Products',
        })
    } else {
        alert('Добавьте хотя бы двух человек')
    }
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
                        label="Введите позицию"
                        v-model="value"
                        v-on:keydown.enter="" />
                </v-responsive>
                <Button
                    @click=""
                    prepend-icon="mdi-plus-circle-outline">
                    <v-icon v-slot:prepend></v-icon>
                    Нажмите, чтобы добавить позицию
                </Button>
            </v-container>
            </v-card>
    </v-app>
</template>

<style lang="scss" scoped></style>