import { defineStore } from 'pinia'

export const useProductStore = defineStore('ProductStore', {
    state: () => ({
        list: [
            {
                id: 1,
                name: 'Водка',
                price: '500',
                payerId: 15645667,
                whoAte: {1: false, 2: false, 3: false, 4: false, 5: false},
            },
            {
                id: 2,
                name: 'Пиво',
                price: '150',
                payerId: 2,
                whoAte: {1: false, 2: false, 3: false, 4: false, 5: false},
            },
            {
                id: 3,
                name: 'Сигареты',
                price: '230',
                payerId: 3,
                whoAte: {1: false, 2: false, 3: false, 4: false, 5: false},
            },
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
                price.replaceAll(' ', '') !== ''
            ) {
                this.list = [
                    ...this.list,
                    {
                        id: Date.now(),
                        name: name,
                        price: price,
                        payerId: -1,
                        whoAte: '',
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
            console.log(prodId)
            this.findById(prodId)['payerId'] = payerId
        },
    
        updateWhoAteId(productId, personId, condition){
            let product =  this.findById(productId)
            product.whoAte[personId] = condition
        }
    },
})
