<script setup>
import { ref } from 'vue'
import { usePersonStore } from './stores/PersonStore.js'
import Input from './components/ui/Input.vue'
import AddButton from './components/ui/AddButton.vue'
import AppBar from './components/ui/AppBar.vue'
import NextButton from './components/ui/NextButton.vue'


const value = ref('')

const PersonStore = usePersonStore()

const clickHandler = () => {
    PersonStore.add(value.value)
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
                <AddButton
                    @click="clickHandler">
                    Нажмите, чтобы добавить человека
                </AddButton>
            </v-container>
            <v-card 
            class="overflow-y-auto"
            max-height="400">
                <v-list
                    :items="PersonStore.list"
                    item-title="name">
                    <v-list-item
                        v-for="item in PersonStore.list"
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
                                @click="PersonStore.delete(item.id)">
                            </v-btn>
                        </template>
                        <v-divider
                            class="my-2"
                            thickness />
                    </v-list-item>
                </v-list>
            </v-card>
        </v-card>
        <NextButton
            v-if="PersonStore.list.length > 1"
            @click.prevent="$router.push(`/products`)"
            >
            Продолжить
        </NextButton>
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
