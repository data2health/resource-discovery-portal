import docs from './docs'

export default {
    state: () => ({
        loading: false,
        results: [],
        recentSearches: [],
        maxRecentHistory: 5,
        resourceTypes: ['Dataset', 'People', 'ClinicalTrial', 'Publication', 'Tool']
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
    },
}
