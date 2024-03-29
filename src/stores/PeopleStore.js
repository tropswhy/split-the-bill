import { defineStore } from 'pinia'

export const usePeopleStore = defineStore('PeopleStore', {
    state: () => ({
        list: [],
    }),

    actions: {
        add(name) {
            if ((name != null) && (name.replaceAll(' ', '') !== '')) {
                this.list = [
                    ...this.list,
                    {
                        id: Date.now(),
                        name: name,
                        //debt: 0,
                    },
                ]
            } else {
                alert(
                    'Вы оставили поле ввода пустым. Пожалуйста, введите имя человека.'
                )
            }
        },
        findById(id) {
            let ind = -1
            this.list.map((item, index) =>
            item.id = id ? (ind = index) : (ind = ind)
            )
            if (ind == -1) return undefined;
            return this.list[ind]
        },

        delete(id) {
            this.list = this.list.filter((item) => item.id !==id)
        },
    },
})
