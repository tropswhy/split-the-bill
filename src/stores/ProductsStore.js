import { defineStore } from 'pinia'

export const useProductsStore = defineStore('ProductsStore', {
    state: () => ({
        list: [],
    }),
    actions: {
        addProd(name) {
            if ((name != null) && (name.replaceAll(' ', '') !== '')) {
                this.list = [
                    ...this.list,
                    {
                        id: Date.now(),
                        name: name,
                        cost: 0,
                    },
                ]
            } else {
                alert(
                    'Вы оставили поле ввода пустым. Пожалуйста, введите позицию.'
                )
            }
        },
    },
})
