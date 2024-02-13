import { defineStore } from 'pinia'

export const useProductsStore = defineStore('ProductsStore', {
    state: () => ({
        list: [],
    }),
})