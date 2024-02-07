<script setup>
import { ref } from 'vue'
import { usePeopleStore } from './stores/PeopleStore.js'

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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35px"
                height="35px"
                class="mx-5"
                viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12.028 17.23q.332 0 .56-.228q.227-.23.227-.56q0-.332-.229-.56q-.229-.228-.56-.228q-.332 0-.56.229q-.228.229-.228.56q0 .332.23.56q.228.228.56.228m-.516-3.312h.965q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199q.327-.53.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.973 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36q-.268.557-.268 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8" />
            </svg>
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-2"
                        width="25px"
                        height="25px"
                        viewBox="0 0 32 32">
                        <path
                            fill="currentColor"
                            d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z" />
                    </svg>
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                class="mr-2"
                viewBox="0 0 32 32">
                <path
                    fill="currentColor"
                    d="m16 8l-1.43 1.393L20.15 15H8v2h12.15l-5.58 5.573L16 24l8-8z" />
                <path
                    fill="currentColor"
                    d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4" />
            </svg>
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
