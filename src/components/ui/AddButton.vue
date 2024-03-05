<template>
    <v-btn
        rounded
        color="primary"
        prepend-icon="mdi-plus-circle-outline">
        <v-icon v-slot:prepend></v-icon>
        <slot></slot>
    </v-btn>
</template>
