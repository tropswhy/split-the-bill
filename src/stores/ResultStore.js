import { defineStore } from 'pinia'

export const useResultStore = defineStore('ResultStore', {
    state: () => ({
        resultForPayer: [],
    }),

    actions: {
        countResultForPayer(persons, products, personIds) {
            products.list.forEach((prod) => {
                let payer = persons.findById(prod.payerId)

                if (this.resultForPayer.find((result) => result.payerId === payer.id) === undefined)
                    this.addPayer(payer.id, personIds, prod.whoAte)

                for (let whoAteId in prod.whoAte) {
                    if (this.findByPayerId(payer.id).debters[whoAteId] > 0)
                        this.findByPayerId(payer.id).debters[whoAteId] = this.findByPayerId(payer.id).debters[whoAteId] + prod.price / prod.amountOfEaters
                    else if (
                        whoAteId != payer.id &&
                        prod.whoAte[whoAteId] === true
                    )
                        this.findByPayerId(payer.id).debters[whoAteId] = prod.price / prod.amountOfEaters
                }
            })
        },

        addPayer(payerId, personIds, whoAte) {
            let zeroDebt = {}
            personIds.map((personId) => {
                if (personId != payerId && whoAte[personId] === true)
                    zeroDebt[personId] = 0
            })
            this.resultForPayer = [
                ...this.resultForPayer,
                {
                    payerId: payerId,
                    debters: '',
                },
            ]

            this.resultForPayer.at(-1).debters = {
                ...this.resultForPayer.at(-1).debters,
                ...zeroDebt,
            }
        },

        findByPayerId(id) {
            let ind = -1
            this.resultForPayer.map((item, index) =>
                item.payerId === id ? (ind = index) : (ind = ind)
            )
            if (ind == -1) return undefined
            return this.resultForPayer[ind]
        },

        checkForDebts() {
            this.resultForPayer.map((result) => {
                this.resultForPayer.forEach((resultForDebtor) => {
                    if (
                        resultForDebtor.debters[result.payerId] !== undefined &&
                        result.debters[resultForDebtor.payerId] !== undefined
                    ) {
                        if (
                            resultForDebtor.debters[result.payerId] >
                            result.debters[resultForDebtor.payerId]
                        ) {
                            resultForDebtor.debters[result.payerId] -=
                                result.debters[resultForDebtor.payerId]
                            delete result.debters[resultForDebtor.payerId]
                        } else if (
                            resultForDebtor.debters[result.payerId] <
                            result.debters[resultForDebtor.payerId]
                        ) {
                            result.debters[resultForDebtor.payerId] -=
                                resultForDebtor.debters[result.payerId]
                            delete resultForDebtor.debters[result.payerId]
                        } else if (
                            resultForDebtor.debters[result.payerId] ===
                            result.debters[resultForDebtor.payerId]
                        ) {
                            delete result.debters[resultForDebtor.payerId]
                            delete resultForDebtor.debters[result.payerId]
                        }

                        if (Object.keys(resultForDebtor.debters).length === 0) {
                            let index = this.resultForPayer.indexOf(this.findByPayerId(resultForDebtor.payerId))
                            this.resultForPayer.splice(index, 1)
                        }

                        if (Object.keys(result.debters).length === 0) {
                            let index = this.resultForPayer.indexOf(
                                this.findByPayerId(result.payerId)
                            )
                            this.resultForPayer.splice(index, 1)
                        }
                    }
                })
            })
        },

        debtRound() {
            this.resultForPayer.forEach((result) => {
                let debterIds = Object.keys(result.debters)
                debterIds.forEach((index) => {
                    result.debters[index] = Math.round(result.debters[index] * 100) / 100
                })
            })
        },
    },
})
