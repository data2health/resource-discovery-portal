import axios from 'axios';

export default {
    state: () => ({
        baseURL: "http://rdp.biothings.io/api/query",
        loading: false,
        results: [],
        expandedView: false,
        recentSearches: [],
        maxRecentHistory: 5,
        resourceTypesMapping:{
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
        resourceTypes:{
            //populated with performAggregations
        },
        default:{
            'text': 'text-sky-500',
            'bg': 'bg-sky-500',
            'icon': 'fas fa-circle',
            'img': '/assets/img/rdp_square.svg',
        },
        perPage: 10,
        page: 1,
        sortChange: 'A-Z',
        pages: 1,
        pageLimit: 20,
        groupPages: false,
        total: 0,
        q: '',
        totalDocsRDP: 0
    }),
    actions: {
        search({commit, state }, payload) {
            let url = state.baseURL; 

            if (payload?.value) {
                commit('addRecent', payload);
                commit('saveQuery', payload);
            }
            //loading start
            commit('setLoading', { value: true});
            //pagination
            var config = {
                "params": {
                    'size': state.perPage,
                    'from': state.page == 1 ? state.page-1 : ((state.page-1) * state.perPage )  
                }
            }

            if(state.q){
                config.params.q = state.q
            }
            // sorting
            // switch (state.sortChange) {
            //     case 'relevance':
            //         //default behavior
            //         break;
            //     case 'A-Z':
            //         url += '&sort=name.raw'
            //         break;
            //     case 'Z-A':
            //         url += '&sort=-name.raw'
            //         break;
            //     case 'recent':
            //         url += '&sort=-_ts.last_updated'
            //         break;
            //     default:
            //         //no matching sort
            //         break;
            // }
            console.log('%c Search' + JSON.stringify(config, null, 2), 'color:limegreen');
            axios.get(url, config).then( res =>{
                console.log(res)
                commit('saveResults', { value: res.data.hits});
                commit('setLoading', { value: false});
                commit('updatePages', { value: res.data.total});
            }).catch( err =>{
                commit('setLoading', { value: false});
            });
        },
        performAggregations({commit, state }) {
            // data types
            axios.get(state.baseURL + "?aggs=@type").then( res =>{
                
                if( res.data?.facets?.['@type']?.terms){
                    res.data?.facets?.['@type']?.terms.forEach(termInfo => {
                        state.totalDocsRDP = res.data.total;
                        let term = termInfo.term.charAt(0).toUpperCase() + termInfo.term.slice(1);
                        if (term in state.resourceTypesMapping) {
                            state.resourceTypes[term] = {...termInfo, ...state.resourceTypesMapping[term]}
                        }else{
                            state.resourceTypes[term] = {...termInfo, ...state.default}
                        }
                    });
                }
            }).catch( err =>{
                console.log(err);
            });
        }
    },
    mutations: {
        saveQuery(state, payload){
            state.q = payload.value;
        },
        updatePages(state, payload){
            state.total = payload.value;
            //a huge number slows down rendering
            let maxTotal = state.total > 500 ? 500 : state.total;
            state.pages = Math.ceil(maxTotal / state.perPage);
            if(state.page > state.pages){
                state.page = 1
            }
            if (state.pages > state.pageLimit) {
                state.groupPages =  true;
              }
        },
        changePerPage(state, payload){
            state.perPage = payload.value;
        },
        changePage(state, pageNumber){
            state.page = pageNumber;
        },
        upPage(state){
            state.page  += 1;
        },
        downPage(state){
            state.page  -= 1;
        },
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
        perPage: (state) => {
            return state.perPage;
        },
        pages: (state) => {
            return state.pages;
        },
        page: (state) => {
            return state.page;
        },
        groupPages: (state) => {
            return state.groupPages;
        },
        total: (state) => {
            return state.total;
        },
        totalDocsRDP: (state) => {
            return state.totalDocsRDP;
        },
    },
}
