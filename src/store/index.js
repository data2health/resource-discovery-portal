import { createStore } from 'vuex'
import search from '../store/modules/search'
import { layout } from './modules/layout'

const store = createStore({
    modules: {
        search,
        layout
    },
})

export default store
