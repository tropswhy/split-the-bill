import { defineStore } from 'pinia'

export const usePeopleStore = defineStore('PeopleStore', {
    state: () => ({
        list: [],
    }),

    actions: {
        add(name) {
            if (name.replaceAll(' ', '') !== '') {
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
    },
})
