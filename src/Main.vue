<script setup>
import { ref } from 'vue'
import { usePeopleStore } from './stores/PeopleStore.js'
const value = ref('')

const PeopleStore = usePeopleStore()

const clickHandler = () => {
    PeopleStore.add(value.value)
    value.value=''
    }
</script>

<template>
    <v-app>
        <v-container class="text-center">
            <v-text-field
                clearable
                label="Введите имя"
                variant="solo-filled"
                v-model="value"
                v-on:keydown.enter="clickHandler"
                append-inner-icon="s"
                />
            <v-btn 
            color="primary"
            
            @click="clickHandler">
                Нажмите, чтобы добавить человека
            </v-btn>
            
        </v-container>
        <v-card
            
            class="mx-auto"
            max-width="500"
        >
            <v-list
            :items="PeopleStore.list" 
            item-title="name"
            >
                <v-list-item
                v-for="item in PeopleStore.list"
                :key="item.id"
                >
                    <v-avatar color="primary" class='mr-4'>
                        {{ item.name[0] }}
                    </v-avatar>
                    {{ item.name }}
                    <v-divider class="my-2" thickness/>
                </v-list-item>
            </v-list>
        </v-card>
    </v-app>
</template>