import docs from './docs'

export default {
    state: () => ({
        loading: false,
        results: [],
        expandedView: false,
        recentSearches: [],
        maxRecentHistory: 5,
        resourceTypes: {
            'ALL': {
                'active' : false
            },
            'Dataset': {
                'active' : false
            },
            'Education': {
                'active' : false
            },
            'Tool': {
                'active' : false
            },
            'Publication': {
                'active' : false
            },
            'Video': {
                'active' : false
            },
            'Person': {
                'active' : false
            },
        },
        resultTheme:{
            'Dataset' : {
                'text': 'text-orange-400',
                'bg': 'bg-orange-400',
                'icon': 'fas fa-newspaper'
            },
            'Education' : {
                'text': 'text-pink-500',
                'bg': 'bg-pink-500',
                'icon': 'fas fa-apple-alt'
            },
            'ClinicalTrial' : {
                'text': 'text-purple-500',
                'bg': 'bg-purple-500',
                'icon': 'fas fa-flask'
            },
            'Clinical Trial' : {
                'text': 'text-purple-500',
                'bg': 'bg-purple-500',
                'icon': 'fas fa-flask'
            },
            'Clinical trial' : {
                'text': 'text-purple-500',
                'bg': 'bg-purple-500',
                'icon': 'fas fa-flask'
            },
            'Publication' : {
                'text': 'text-teal-500',
                'bg': 'bg-teal-500',
                'icon': 'fas fa-book'
            },
            'Video' : {
                'text': 'text-red-500',
                'bg': 'bg-red-500',
                'icon': 'fab fa-youtube'
            },
            'Playlist' : {
                'text': 'text-red-600',
                'bg': 'bg-red-600',
                'icon': 'fab fa-youtube-square'
            },
            'Video clip' : {
                'text': 'text-red-600 dark:text-red-400',
                'bg': 'bg-red-600',
                'icon': 'fab fa-youtube-square'
            },
            'Tool' : {
                'text': 'text-indigo-600 dark:text-indigo-300',
                'bg': 'bg-indigo-600',
                'icon': 'fas fa-laptop'
            },
            'Repository' : {
                'text': 'text-blue-600 dark:text-blue-300',
                'bg': 'bg-blue-600',
                'icon': 'fab fa-github'
            },
            'Person' : {
                'text': 'text-amber-500',
                'bg': 'bg-amber-500',
                'icon': 'fas fa-user'
            },
            'Funding opportunity' : {
                'text': 'text-emerald-700 dark:text-emerald-500',
                'bg': 'bg-emerald-700 dark:bg-emerald-500',
                'icon': 'fas fa-money-check-alt'
            },
            'Funding Opportunity' : {
                'text': 'text-emerald-700',
                'bg': 'bg-emerald-700',
                'icon': 'fas fa-money-check-alt'
            },
        },
        default:{
            'text': 'text-sky-500',
            'bg': 'bg-sky-500',
            'icon': 'fas fa-circle'
        }
    }),
    actions: {
        search({ commit }, payload) {
            if (payload?.value) {
                commit('addRecent', payload);
            }
            console.log('%c search' + JSON.stringify(payload, null, 2), 'color:limegreen');
            commit('setLoading', { value: true});
            setTimeout(() => {
                commit('setLoading', { value: false});
                // mock results
                commit('saveResults', { value: docs});
            }, 1000);
        }
    },
    mutations: {
        setLoading(state, payload){
            state.loading = payload.value;
        },
        saveResults(state, payload){
            state.results = payload.value;
        },
        activateTypeFilter(state, payload){
            if (payload.value == 'ALL') {
                for (const type in state.resourceTypes) {
                    if (type !== 'All') {
                        state.resourceTypes[type].active = false;
                    }
                }
                state.resourceTypes['ALL'].active = !state.resourceTypes['ALL'].active;
            }else{
                state.resourceTypes['ALL'].active = false;
                Object.keys(state.resourceTypes).forEach((type) => {
                    if (type == payload.value) {
                        state.resourceTypes[type].active = !state.resourceTypes[type].active;
                    }
                });
            }
        },
        addRecent(state, payload){
            if (state.recentSearches.length < state.maxRecentHistory) {
                if (state.recentSearches.includes(payload.value)) {
                    //remove old mention
                    state.recentSearches.splice(state.recentSearches.indexOf(payload.value), 1);
                }
                state.recentSearches.unshift(payload.value);
                localStorage.rdp_recent = JSON.stringify(state.recentSearches);
            }else{
                if (state.recentSearches.includes(payload.value)) {
                    //remove old mention
                    state.recentSearches.splice(state.recentSearches.indexOf(payload.value), 1);
                }
                state.recentSearches.unshift(payload.value);
                state.recentSearches.pop();
                localStorage.rdp_recent = JSON.stringify(state.recentSearches);
            }
        },
        checkRecentSearches(state) {
            if (localStorage.getItem('rdp_recent')) {
                state.recentSearches = JSON.parse(localStorage.rdp_recent);
            }
        },
        clearRecentSearches(state){
            localStorage.rdp_recent = [];
            state.recentSearches = [];
        },
        toggleExpandedView(state){
            state.expandedView = !state.expandedView;
        }
    },
    getters: {
        loading: (state) => {
            return state.loading;
        },
        results: (state) => {
            return state.results;
        },
        recentSearches: (state) => {
            return state.recentSearches;
        },
        resourceTypes: (state) => {
            return state.resourceTypes;
        },
        getTheme: (state) => (name) => {
            return state.resultTheme?.[name] ? state.resultTheme?.[name] : state.default;
        },
        expandedView: (state) => {
            return state.expandedView;
        },
    },
}
