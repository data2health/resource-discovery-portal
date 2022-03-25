import axios from 'axios';

export default {
    state: () => ({
        baseURL: "http://rdp.biothings.io/api/query",
        loading: false,
        results: [],
        results_facets: [],
        expandedView: false,
        recentSearches: new Set(),
        maxRecentHistory: 5,
        resourceTypesMapping:{
            'Dataset' : {
                'hex': '#fb923c',
                'text': 'text-orange-400',
                'bg': 'bg-orange-400',
                'icon': 'fas fa-database',
                'img': '/assets/img/icons/data.svg',
                'active' : false,
                'description': `The CD2H Resource Discovery Portal houses a collection of over 2,163,616 datasets from over 54 repositories. 
                This is one of the largest collection of biomedical datasets in the world and is available for CTSA hub members, or researchers, clinicians, or otherwise interested parties.`,
                'filters':[
                    {
                        'name': 'Dataset is Curated',
                        'field': '_exists_:curatedBy',
                        'active': false
                    }
                ]
            },
            'Institution' : {
                'hex': '#c026d3',
                'text': 'text-fuchsia-600',
                'bg': 'bg-fuchsia-600',
                'icon': 'fas fa-building',
                'img': '/assets/img/icons/institution.svg',
                'active' : false
            },
            'Creative Work' : {
                'hex': '#fb7185',
                'text': 'text-rose-400',
                'bg': 'bg-rose-400',
                'icon': 'fas fa-lightbulb',
                'img': '/assets/img/icons/creative.svg',
                'active' : false
            },
            'Service' : {
                'hex': '#0891b2',
                'text': 'text-cyan-600',
                'bg': 'bg-cyan-600',
                'icon': 'fas fa-code',
                'img': '/assets/img/icons/service.svg',
                'active' : false
            },
            'Education Resource' : {
                'hex': '#ec4899',
                'text': 'text-pink-500',
                'bg': 'bg-pink-500',
                'icon': 'fas fa-apple-alt',
                'img': '/assets/img/icons/edu.svg',
                'active' : false
            },
            'Clinical Trial' : {
                'hex': '#a855f7',
                'text': 'text-purple-500',
                'bg': 'bg-purple-500',
                'icon': 'fas fa-flask',
                'img': '/assets/img/icons/ct.svg',
                'active' : false
            },
            'Publication' : {
                'hex': '#14b8a6',
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
            'Multimedia Object' : {
                'hex': '#ef4444',
                'text': 'text-red-500',
                'bg': 'bg-red-500',
                'icon': 'fab fa-photo-video',
                'img': '/assets/img/icons/vid.svg',
                'active' : false
            },
            'Tool' : {
                'hex': '#4f46e5',
                'text': 'text-indigo-600 dark:text-indigo-300',
                'bg': 'bg-indigo-600',
                'icon': 'fas fa-laptop',
                'img': '/assets/img/icons/tool.svg',
                'active' : false
            },
            'Repository' : {
                'hex': '#2563eb',
                'text': 'text-blue-600 dark:text-blue-300',
                'bg': 'bg-blue-600',
                'icon': 'fab fa-github',
                'img': '/assets/img/icons/repo.svg',
                'active' : false
            },
            'Profile' : {
                'hex': '#f59e0b',
                'text': 'text-amber-500',
                'bg': 'bg-amber-500',
                'icon': 'fas fa-user',
                'img': '/assets/img/icons/person.svg',
                'active' : false
            },
            'Funding Opportunity' : {
                'hex': '#eab308',
                'text': 'text-yellow-500',
                'bg': 'bg-yellow-500',
                'icon': 'fas fa-money-check-alt',
                'img': '/assets/img/icons/funding.svg',
                'active' : false
            },
            'Grant' : {
                'hex': '#059669',
                'text': 'text-emerald-700 dark:text-emerald-500',
                'bg': 'bg-emerald-700 dark:bg-emerald-500',
                'icon': 'fas fa-money-check-alt',
                'img': '/assets/img/icons/grant.svg',
                'active' : false
            },
            'Research Instrument' : {
                'hex': '#84cc16',
                'text': 'text-lime-500',
                'bg': 'bg-lime-500',
                'icon': 'fas fa-microscope',
                'img': '/assets/img/icons/instrument.svg',
                'active' : false
            },
            'Protocol' : {
                'hex': '#06b6d4',
                'text': 'text-cyan-500',
                'bg': 'bg-cyan-500',
                'icon': 'fas fa-list-alt',
                'img': '/assets/img/icons/protocol.svg',
                'active' : false
            },
        },
        resourceTypes:{
            //populated with performAggregations
        },
        default:{
            'text': 'text-indigo-500',
            'bg': 'bg-indigo-500',
            'icon': 'fas fa-circle',
            'img': '/assets/img/rdp_square.svg',
        },
        filters:{
            // '_index' :[

            // ],
            // 'resourceTypeName': [

            // ]
        },
        sourceReadableNames:{
            'cd2h-nih-reporter': {
                'name': 'NIH RePorter',
                'img': '/assets/img/reporter.png',
                'description': 'RePORTER (RePORT Expenditures and Results) module. RePORTER is an electronic tool that allows users to search a repository of NIH-funded research projects and access publications and patents resulting from NIH funding.',
                'link': 'https://reporter.nih.gov/',
                'active': false
            },
            'cd2h-datamed': {
                'name': 'DataMed',
                'img': '/assets/img/datamed.png',
                'link': 'https://datamed.org/',
                'description': 'DataMed is a prototype biomedical data search engine. Its goal is to discover data sets across data repositories or data aggregators. In the future it will allow searching outside these boundaries. DataMed supports the NIH-endorsed FAIR principles of Findability, Accessibility, Interoperability and Reusability of datasets with current functionality assisting in finding datasets and providing access information about them.',
                'active': false
            },
            'cd2h-clinical-trials':{
                'name': 'NIH Clinical Trials',
                'img': '/assets/img/nih-ct.png',
                'description': `<p>
                ClinicalTrials.gov is a Web-based resource that provides patients, their family members, health care professionals, researchers, and the public with easy access to information on publicly and privately supported clinical studies on a wide range of diseases and conditions. The Web site is maintained by the
                <a title="opens new window" href="https://www.nlm.nih.gov/" onclick="openNewWindow('https://www.nlm.nih.gov/'); return false">National Library of Medicine</a> (NLM)
                at the
                <a title="opens new window" href="https://www.nih.gov/" onclick="openNewWindow('https://www.nih.gov/'); return false">National Institutes of Health</a> (NIH). 
                Information on ClinicalTrials.gov is provided and updated by the sponsor or principal investigator of the clinical study. 
                Studies are generally submitted to the Web site (that is, registered) when they begin, and the information on the site is 
                updated throughout the study. 
                In some cases, results of the study are submitted after the study ends. This Web site and database of clinical studies is commonly 
                referred to as a "<span style="display:inline;" class="term" data-term="study registry" title="Click to define">registry</span> and <span style="display:inline;" class="term" data-term="results database" title="Click to define" tabindex="0">results database</span>."
                    </p>`,
                'link': 'https://covid.cd2h.org/trials',
                'active': false
            },
            'cd2h-nih-litcovid':{
                'name': 'LitCOVID',
                'img': '/assets/img/litcovid.jpeg',
                'link': 'https://www.ncbi.nlm.nih.gov/research/coronavirus/',
                'description': 'LitCovid is a curated literature hub for tracking up-to-date scientific information about the 2019 novel Coronavirus. It is the most comprehensive resource on the subject, providing a central access to 217091 (and growing) relevant articles in PubMed. The articles are updated daily and are further categorized by different research topics (e.g. transmission) and geographic locations.',
                'active': false
            },
            'outbreak_litcovid_202110070745_vvrw8kmo':{
                'name': 'Outbreak.info',
                'img': '/assets/img/outbreak.svg',
                'description': 'In response to the current outbreak of SARS-CoV-2 (the virus that causes COVID-19), researchers worldwide have been generating and openly sharing data, publications, reagents, code, protocols, and more. Broad sharing of these resources improves the speed and efficiency of science. Unfortunately, there are no uniform standards and repositories for collecting all this information in one place.',
                'link': 'https://outbreak.info/',
                'active': false
            },
            'cd2h-profile-vivo':{
                'name': 'VIVO',
                'img': '/assets/img/vivo.gif',
                'link': 'https://vivo.lyrasis.org/',
                'description': 'VIVO is member-supported, open source software and an ontology for representing scholarship.  VIVO supports recording, editing, searching, browsing, and visualizing scholarly activity. VIVO encourages showcasing the scholarly record, research discovery, expert finding, network analysis, and assessment of research impact.  VIVO is easily extended to support additional domains of scholarly activity.',
                'active': false
            },
            'cd2h-youtube-video':{
                'name': 'YouTube',
                'img': '/assets/img/youtube.png',
                'link': 'https://www.youtube.com/',
                'description': 'Our mission is to give everyone a voice and show them the world. We believe that everyone deserves to have a voice, and that the world is a better place when we listen, share and build community through our stories.',
                'active': false
            },
            'cd2h-datacite':{
                'name': 'DataCite',
                'img': '/assets/img/datacite.png',
                'link': 'https://datacite.org/',
                'description': 'DataCite is a leading global non-profit organization that provides persistent identifiers (DOIs) for research data and other research outputs. Organizations within the research community join DataCite as members to be able to assign DOIs to all their research outputs. This way, their outputs become discoverable and associated metadata is made available to the community. DataCite then develops additional services to improve the DOI management experience, making it easier for our members to connect and share their DOIs with the broader research ecosystem and to assess the use of their DOIs within that ecosystem. DataCite is an active participant in the research community and promotes data sharing and citation through community-building efforts and outreach activities.',
                'active': false
            },
            'cd2h-youtube-playlist':{
                'name': 'YouTube Playlists',
                'img': '/assets/img/youtube.png',
                'link': 'https://reporter.nih.gov/',
                'description': 'Our mission is to give everyone a voice and show them the world. We believe that everyone deserves to have a voice, and that the world is a better place when we listen, share and build community through our stories.',
                'active': false
            },
            'cd2h-sparc-musc':{
                'name': 'SPARCRequest',
                'img': '/assets/img/sparc.jpeg',
                'link': 'https://sparc.musc.edu/',
                'description': `<h5 class="font-weight-normal mb-3">
                <b>SPARCRequest</b> (<b>S</b>ervices, <b>P</b>ricing, &amp; <b>A</b>pplication for <b>R</b>esearch <b>C</b>enters) is a web-based research transaction management system that provides a central portal to researchers and their study teams to browse for research services and resources as well as submit service and pricing requests with a focus on billing compliance and proposal/budget development. SPARCRequest is OSS (Open-Source Software) for which MUSC holds the copyright license. SPARCRequest is developed in a collaborative and public manner for easy adoptability and the source code is available to anyone.
                </h5>`,
                'active': false
            },
        },
        sourceDefault: {
            'name': '',
            'img': '/assets/img/rdp_color.svg',
            'description': 'Not Available',
            'link': '#',
            'active': false
        },
        perPage: 10,
        page: 1,
        pages: 1,
        pageLimit: 20,
        groupPages: false,
        total: 0,
        totalDocsRDP: 0,
        chartData:{
            'about':{

            }
        },
        query: "",
        mostRecentResults:[],
        mostRecentSize: 3
    }),
    actions: {
        activateFilter({ dispatch, commit }, payload) {
            commit('activateFilter', payload)
            dispatch('search');
        },
        activateSubFilter({ dispatch, commit }, payload) {
            commit('activateSubFilter', payload)
            dispatch('search');
        },
        search({commit, state }, payload) {
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
                    'aggs': 'resourceTypeName.keyword'
                }
            }
            // QUERY
            if(state.query){
                // TEMP remove when all docs have resourceTypeName
                config.params.q = state.query + " AND _exists_:resourceTypeName"
            }else{
                config.params.q = "_exists_:resourceTypeName"
            }

             // RESOURCE FILTER
            if (payload?.resourceFilter) {
                console.log('%c Resource Filter: ' + payload.resourceFilter, 'color:orange')
                state.filters['resourceTypeName.keyword'].forEach(f => {
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
            // console.log('%c Active Filters ' + JSON.stringify(active, null, 2), 'color:hotpink');
            
            let fString = "";
            if (Object.keys(active).length) {
                for (const section in active) {
                    fString += ' AND (' + active[section].map(value => section + ':"' + value + '"' ).join(' OR ') + ')'
                }
            }

            // ADD FILTERS TO Q STRING
            if (fString) {
                config.params.q += fString
            }

            // ADVANCED FILTERS (UNDER RESOURCE TYPE)
            let advanced_active = [];
            for (const filter_type in state.filters) {
                state.filters[filter_type].forEach(type => {
                    if (type?.filters) {
                        type?.filters.forEach(f => {
                            if (f.active) {
                                advanced_active.push(f.field)
                            }
                        })
                    }
                });
            }
            let advancedString = "" 
            advancedString = advanced_active.length ? advanced_active.join(' AND ') : false;

            // console.log('%c Active Advanced Filters ' + JSON.stringify(advanced_active, null, 2), 'color:dodgerblue');

            // ADD ADVANCED FILTERS TO Q STRING
            if (advancedString) {
                config.params.q += " AND " + advancedString
            }

            console.log('%c Search ' + JSON.stringify(config, null, 2), 'color:limegreen');
            // SEARCH
            axios.get(url, config).then( res =>{
                console.log(res)
                commit('saveResults', { value: res.data.hits});
                commit('saveResultsFacets', { value: res.data.facets?.['resourceTypeName.keyword']?.terms});
                commit('setLoading', { value: false});
                commit('updatePages', { value: res.data.total});
            }).catch( err =>{
                commit('setLoading', { value: false});
            });
        },
        getMostRecent({commit, state }, payload) {
            // RESET
            commit('saveMostRecent', { value: []});
            let url = state.baseURL; 
            //LOADING
            commit('setLoading', { value: true});
            // SIZE
            if (payload.size) {
                state.mostRecentSize += payload.size
            }
            //PAGINATION
            var config = {
                "params": {
                    'q': `resourceTypeName:${payload.resource} AND _exists_:resourceTypeName`,
                    'size': state.mostRecentSize,
                    '-sort': 'dateModified,date_modified'
                }
            }
            console.log('%c Most Recent ' + JSON.stringify(config, null, 2), 'color:coral');
            // SEARCH
            axios.get(url, config).then( res =>{
                console.log('Most Recent', res)
                commit('saveMostRecent', { value: res.data.hits});
                commit('setLoading', { value: false});
            }).catch( err =>{
                commit('setLoading', { value: false});
            });
        },
        aggregateAndAddFilter({commit, state }, payload) {

            // data types
            axios.get(state.baseURL + "?aggs=" + payload.value + '&facet_size=100').then( res =>{

                let data = {
                    labels: [],
                    datasets: [{data: []}]
                };

                //Doc Total
                state.totalDocsRDP = res?.data?.total;
                
                if( res.data?.facets?.[payload.value]?.terms){

                    res.data?.facets?.[payload.value]?.terms.forEach(termInfo => {

                        if (payload.value == '_index') {

                            let source = termInfo.term

                            if (source in state.sourceReadableNames) {

                                commit('addFilter', {
                                    'section': '_index',
                                    'filter' : {...termInfo, ...state.sourceReadableNames[source]}
                                })

                                //chart data for /About
                                data.labels.push(state.sourceReadableNames[source].name);
                                data.datasets[0].label = 'Data Sources';
                                data.datasets[0].data.push(termInfo.count);
    
                            }else{
                                commit('addFilter', {
                                    'section': '_index',
                                    'filter' : {...termInfo, ...state.sourceDefault}
                                })
                            }
                        } else {

                            let term = termInfo.term;

                            if (term in state.resourceTypesMapping) {

                                state.resourceTypes[term] = {...termInfo, ...state.resourceTypesMapping[term]}

                                commit('addFilter', {
                                    'section': payload.value,
                                    'filter' : {...termInfo, ...state.resourceTypesMapping[term]}
                                })

                            }else{

                                state.resourceTypes[term] = {...termInfo, ...state.default}

                                commit('addFilter', {
                                    'section': payload.value,
                                    'filter' : {...termInfo, ...state.default}
                                })
                            }

                            //chart data for /About
                            data.labels.push(termInfo.term);
                            data.datasets[0].label = payload.value;
                            data.datasets[0].data.push(termInfo.count);
                        }

                        
                    });
                    
                    state.chartData.about[payload.value] = data;
                }
                console.log(state.filters)
                console.log('%c Filters Added: ' + Object.keys(state.filters), 'color:violet');
            }).catch( err =>{
                console.log("Failed to get types info", err);
            });
        }
    },
    mutations: {
        saveMostRecent(state, payload){
            state.mostRecentResults = payload.value;
        },
        addFilter(state, payload){
            if (!Object.hasOwnProperty.call(state.filters, payload.section)) {
                state.filters[payload.section] = [payload.filter];
            }else{
                state.filters[payload.section].push(payload.filter);
            }
        },
        saveQuery(state, payload){
            state.query = payload.value;
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
        saveResultsFacets(state, payload){
            state.results_facets = payload.value;
            let facets = payload.value;
            //reset counts
            // state.filters['resourceTypeName'].forEach(filter => filter.result_count = 0);
            // merge filter with results facet count
            facets.forEach(facet => {
                state.filters['resourceTypeName.keyword'].forEach(filter => {
                    if (facet.term == filter.term) {
                        filter.result_count = facet.count;
                    }
                });
            });
        },
        activateFilter(state, payload){
            let filter = state.filters[payload.section].find((f) => {
                if (f.term == payload.filter.term) {
                    return f;
                }
            });
            filter.active = !filter.active;
        },
        activateSubFilter(state, payload){
            let filter = state.filters[payload.section].find((f) => {
                if (f.term == payload.resourceType) {
                    return f;
                }
            });
            if (filter) {
                let subFilter = filter?.filters.find((f) => {
                    if (f.name == payload.filterName) {
                        return f;
                    }
                });

                subFilter.active = !subFilter.active
            }
        },
        addRecent(state, payload){
            if (state.recentSearches.size < state.maxRecentHistory) {
                if (state.recentSearches.has(payload.value)) {
                    //remove old mention
                    state.recentSearches.delete(payload.value)
                }
                state.recentSearches.add(payload.value);
                localStorage.rdp_recent = JSON.stringify([...state.recentSearches]);
            }else{
                if (state.recentSearches.has(payload.value)) {
                    //remove old mention
                    state.recentSearches.delete(payload.value);
                }
                state.recentSearches.add(payload.value);
                //remove last
                state.recentSearches = new Set([...state.recentSearches].pop());
                localStorage.rdp_recent = JSON.stringify([...state.recentSearches]);
            }
        },
        checkRecentSearches(state) {
            if (localStorage.getItem('rdp_recent')) {
                state.recentSearches = new Set(JSON.parse(localStorage.rdp_recent));
            }
        },
        clearRecentSearches(state){
            localStorage.rdp_recent = [];
            state.recentSearches.clear();
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
        results_facets: (state) => {
            return state.results_facets;
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
        filters: (state) => {
            return state.filters;
        },
        chartData: (state) => {
            return state.chartData;
        },
        baseURL: (state) => {
            return state.baseURL;
        },
        query: (state) => {
            return state.query;
        },
        sourceReadableNames: (state) => {
            return state.sourceReadableNames;
        },
        mostRecentResults: (state) => {
            return state.mostRecentResults;
        },
    },
}
