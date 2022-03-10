import axios from 'axios';

export default {
    state: () => ({
        baseURL: "http://rdp.biothings.io/api/query",
        loading: false,
        type_results: [],
        results_facets: [],
        expandedView: false,
        recentSearches: new Set(),
        maxRecentHistory: 5,
        perPage: 10,
        page: 1,
        sortChange: 'A-Z',
        pages: 1,
        pageLimit: 20,
        groupPages: false,
        total: 0,
        totalDocsRDP: 0,
        chartData:{
            'about':{

            }
        },
        query: ""
    }),
    actions: {
        type_Search({commit, state }, payload) {
            let url = state.baseURL; 
            // RECENT SEARCHES
            if (payload?.value) {
                commit('addRecent', payload);
                commit('saveQuery', payload);
            }
            //LOADING
            commit('setLoading', { value: true});
            //PAGINATION
            var config = {
                "params": {
                    'size': state.perPage,
                    'from': state.page == 1 ? state.page-1 : ((state.page-1) * state.perPage ),
                    'facets': '@type'
                }
            }
            // QUERY
            if(state.query){
                // TEMP remove when all docs have @type
                config.params.q = state.query + " AND _exists_:@type"
            }else{
                config.params.q = "_exists_:@type"
            }

            // SORTING
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

             // RESOURCE FILTER
            if (payload?.resourceFilter) {
                console.log('%c Resource Filter: ' + payload.resourceFilter, 'color:orange')
                state.filters['@type'].forEach(f => {
                    if (f.term == payload.resourceFilter) {
                        f.active = true;
                    }else{
                        f.active = false;
                    }
                });
            }

            // FILTERS
            let active = {};
            for (const filter_type in state.filters) {
                state.filters[filter_type].forEach(filter => {
                    if (filter.active) {
                        Object.hasOwnProperty.call(active, filter_type) ? 
                        active[filter_type].push(filter.term) : active[filter_type] = [filter.term];
                    }
                });
            }
            console.log('%c Filters ' + JSON.stringify(active, null, 2), 'color:hotpink');
            
            let fString = "";
            if (Object.keys(active).length) {
                for (const section in active) {
                    fString += " AND (" + active[section].map(value => section + ":" + value ).join(' OR ') + ")"
                }
            }
            if (fString) {
                config.params.q += fString
            }

            console.log('%c Search ' + JSON.stringify(config, null, 2), 'color:limegreen');
            // SEARCH
            axios.get(url, config).then( res =>{
                console.log(res)
                commit('saveResults', { value: res.data.hits});
                commit('saveResultsFacets', { value: res.data.facets?.['@type']?.terms});
                commit('setLoading', { value: false});
                commit('updatePages', { value: res.data.total});
            }).catch( err =>{
                commit('setLoading', { value: false});
            });
        },
    },
    mutations: {
        type_AddFilter(state, payload){
            state.filters[payload.section].push(payload.filter);
        },

    },
    getters: {
        type_results: (state) => {
            return state.type_results;
        },
    },
}
