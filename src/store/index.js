import { createStore } from 'vuex'
import search from '../store/modules/search'
import { layout } from './modules/layout'
import { about } from './modules/about'

const store = createStore({
    modules: {
        search,
        layout,
        about
    },
})

export default store
