import { createStore } from 'vuex'
import user from '../store/modules/user'
import { layout } from './modules/layout'

const store = createStore({
    modules: {
        user,
        layout
    },
})

export default store
