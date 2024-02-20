import { defineStore } from 'pinia'

export const useProductsStore = defineStore('ProductsStore', {
    state: () => ({
        list: [],
    }),
    actions: {
        addProd(name, price) {
            if (
                name != null &&
                name.replaceAll(' ', '') !== '' &&
                price != null &&
                price.replaceAll(' ', '') !== ''
            ) {
                this.list = [
                    ...this.list,
                    {
                        id: Date.now(),
                        name: name,
                        price: price,
                    },
                ]
            } else {
                alert(
                    'Вы оставили поле ввода пустым. Пожалуйста, введите позицию.'
                )
            }
        },

        findById(id) {
            let ind = -1
            this.list.map(
                (item, index) => (item.id = id ? (ind = index) : (ind = ind))
            )
            if (ind == -1) return undefined
            return this.list[ind]
        },

        delete(id) {
            this.list = this.list.filter((item) => item.id !== id)
        },

        sum() {
            let sum = this.list.reduce(function (accumulator, currentValue) {
                return Number(accumulator) + Number(currentValue.price)
            }, 0);
            return sum
        },
    },
})
