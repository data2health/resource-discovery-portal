import docs from './docs'

export default {
    state: () => ({
        loading: false,
        results: [],
        expandedView: false,
        recentSearches: [],
        maxRecentHistory: 5,
        resourceTypes:{
            'Dataset' : {
                'text': 'text-orange-400',
                'bg': 'bg-orange-400',
                'icon': 'fas fa-newspaper',
                'img': '/assets/img/icons/data.svg',
                'active' : false
            },
            'Education' : {
                'text': 'text-pink-500',
                'bg': 'bg-pink-500',
                'icon': 'fas fa-apple-alt',
                'img': '/assets/img/icons/edu.svg',
                'active' : false
            },
            'ClinicalTrial' : {
                'text': 'text-purple-500',
                'bg': 'bg-purple-500',
                'icon': 'fas fa-flask',
                'img': '/assets/img/icons/ct.svg',
                'active' : false
            },
            'Publication' : {
                'text': 'text-teal-500',
                'bg': 'bg-teal-500',
                'icon': 'fas fa-book',
                'img': '/assets/img/icons/book.svg',
                'active' : false
            },
            'Article' : {
                'text': 'text-teal-500',
                'bg': 'bg-teal-500',
                'icon': 'fas fa-book',
                'img': '/assets/img/icons/book.svg',
                'active' : false
            },
            'Video' : {
                'text': 'text-red-500',
                'bg': 'bg-red-500',
                'icon': 'fab fa-youtube',
                'img': '/assets/img/icons/vid.svg',
                'active' : false
            },
            'ComputationalTool' : {
                'text': 'text-indigo-600 dark:text-indigo-300',
                'bg': 'bg-indigo-600',
                'icon': 'fas fa-laptop',
                'img': '/assets/img/icons/tool.svg',
                'active' : false
            },
            'Repository' : {
                'text': 'text-blue-600 dark:text-blue-300',
                'bg': 'bg-blue-600',
                'icon': 'fab fa-github',
                'img': '/assets/img/icons/repo.svg',
                'active' : false
            },
            'Person' : {
                'text': 'text-amber-500',
                'bg': 'bg-amber-500',
                'icon': 'fas fa-user',
                'img': '/assets/img/icons/person.svg',
                'active' : false
            },
            'FundingOpportunity' : {
                'text': 'text-yellow-500',
                'bg': 'bg-yellow-500',
                'icon': 'fas fa-money-check-alt',
                'img': '/assets/img/icons/funding.svg',
                'active' : false
            },
            'Grant' : {
                'text': 'text-emerald-700 dark:text-emerald-500',
                'bg': 'bg-emerald-700 dark:bg-emerald-500',
                'icon': 'fas fa-money-check-alt',
                'img': '/assets/img/icons/grant.svg',
                'active' : false
            },
            'Instrument' : {
                'text': 'text-lime-500',
                'bg': 'bg-lime-500',
                'icon': 'fas fa-microscope',
                'img': '/assets/img/icons/instrument.svg',
                'active' : false
            },
            'Protocol' : {
                'text': 'text-cyan-500',
                'bg': 'bg-cyan-500',
                'icon': 'fas fa-list',
                'img': '/assets/img/icons/protocol.svg',
                'active' : false
            },
        },
        default:{
            'text': 'text-sky-500',
            'bg': 'bg-sky-500',
            'icon': 'fas fa-circle',
            'img': '/assets/img/icons/default.svg',
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
            Object.keys(state.resourceTypes).forEach((type) => {
                if (type == payload.value) {
                    state.resourceTypes[type].active = !state.resourceTypes[type].active;
                }
            });
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
            return state.resourceTypes?.[name] ? state.resourceTypes?.[name] : state.default;
        },
        expandedView: (state) => {
            return state.expandedView;
        },
    },
}
