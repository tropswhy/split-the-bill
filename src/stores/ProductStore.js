import { defineStore } from 'pinia'

export const useProductStore = defineStore('ProductStore', {
    state: () => ({
        list: [
            /* {
                id: 1,
                name: 'Водка',
                price: '500',
                payerId: 1,
                whoAte: {1: true, 2: true, 3: false, 4: false, 5: false},
                amountOfEaters: 2,
            },
            {
                id: 2,
                name: 'Пиво',
                price: '150',
                payerId: 3,
                whoAte: {1: false, 2: true, 3: false, 4: false, 5: true},
                amountOfEaters: 3,
            },
            {
                id: 3,
                name: 'Сигареты',
                price: '230',
                payerId: 2,
                whoAte: {1: true, 2: true, 3: false, 4: false, 5: false},
                amountOfEaters: 3,
            }, */
        ],
    }),
    actions: {
        addProd(name, price, personIds) {
            let checks = {}
            personIds.map((personId) => {
                checks[personId] = false
            })

            if (
                name != null &&
                name.replaceAll(' ', '') !== '' &&
                price != null &&
                price.replaceAll(' ', '') !== '' &&
                Number(price) > 0
            ) {
                this.list = [
                    ...this.list,
                    {
                        id: Date.now(),
                        name: name,
                        price: price,
                        payerId: -1,
                        whoAte: '',
                        amountOfEaters: 0,
                        },
                    
                ]
                this.list.at(-1).whoAte = {
                    ...this.list.at(-1).whoAte,
                    ...checks,
                }
            } else {
                alert(
                    'Вы оставили поле ввода пустым. Пожалуйста, введите позицию.'
                )
            }
        },

        findById(id) {
            let ind = -1
            this.list.map((item, index) =>
                item.id === id ? (ind = index) : (ind = ind)
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
            }, 0)
            return sum
        },

        addPayerId(payerId, prodId) {
            this.findById(prodId)['payerId'] = payerId
        },
    
        updateWhoAteId(productId, personId, condition){
            let product =  this.findById(productId)
            product.whoAte[personId] = condition
            if (condition === true)
                product.amountOfEaters++
            else 
                product.amountOfEaters--
        }
    },
})
