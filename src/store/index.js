import { createStore } from 'vuex'
import search from '../store/modules/search'
import { layout } from './modules/layout'
import { about } from './modules/about'
import { resourceSearch } from './modules/resourceSearch'

const store = createStore({
    modules: {
        search,
        layout,
        about,
        resourceSearch
    },
})

export default store
