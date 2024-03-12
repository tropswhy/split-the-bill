<script setup>
import AppBar from '../components/ui/AppBar.vue'
import { usePersonStore } from '../stores/PersonStore'
import { useProductStore } from '../stores/ProductStore'
import { useResultStore } from '../stores/ResultStore'

const PersonStore = usePersonStore()
const ProductStore = useProductStore()
const ResultStore = useResultStore()

const personIds = PersonStore.list.reduce(
    (accum, item) => [...accum, item.id],
    []
)

ResultStore.countResultForPayer(PersonStore, ProductStore, personIds)
ResultStore.checkForDebts()
ResultStore.debtRound()
</script>

<template>
    <v-app>
        <AppBar />
        <v-card
            color="blue-lighten-5"
            width="500"
            class="text-center mx-auto"
            title="Результаты"
            text="Да! Да! Ура! Победа!" />

        <v-list>
            <v-list-item
                v-for="result in ResultStore.resultForPayer"
                :key="result.payerId">
                <v-card class="text-center mx-auto my-auto"
                color="primary"
                width="500"
                borders="10"
                v-if="result.debters">
                        Пользователю
                        {{ PersonStore.findById(result.payerId).name }}
                        должны

                    <!-- <v-list
                        v-for="person in PersonStore.list"
                        :key="person.id">
                        <v-list-item :class="(result.debters[person.id] > 1) ? 'visible' : 'non-visible'">
                            Пользователь
                            {{ PersonStore.findById(person.id).name }}
                            {{ result.debters[person.id] }} рублей
                        </v-list-item> -->
                        <v-list
                        v-for="person in PersonStore.list"
                        :key="person.id">
                        <v-list-item
                        v-if="result.debters[person.id] !== undefined">
                            Пользователь
                            {{ PersonStore.findById(person.id).name }}
                            {{ result.debters[person.id] }} рублей
                        </v-list-item>
                    </v-list></v-card
                >
            </v-list-item>
        </v-list>
    </v-app>
</template>

