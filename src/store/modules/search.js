import { data } from 'autoprefixer';
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
            'text': 'text-indigo-500',
            'bg': 'bg-indigo-500',
            'icon': 'fas fa-circle',
            'img': '/assets/img/rdp_square.svg',
        },
        filters:{
            '_index' :[

            ],
            '@type': [

            ]
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
        activateFilter({ dispatch, commit }, payload) {
            commit('activateFilter', payload)
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
                    'from': state.page == 1 ? state.page-1 : ((state.page-1) * state.perPage )  
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
                commit('setLoading', { value: false});
                commit('updatePages', { value: res.data.total});
            }).catch( err =>{
                commit('setLoading', { value: false});
            });
        },
        performAggregations({commit, state }) {
            // data types
            axios.get(state.baseURL + "?aggs=@type,_index").then( res =>{

                let data = {
                    labels: [],
                    datasets: [{data: []}]
                };
                
                if( res.data?.facets?.['@type']?.terms){
                    res.data?.facets?.['@type']?.terms.forEach(termInfo => {
                        state.totalDocsRDP = res.data.total;
                        let term = termInfo.term.charAt(0).toUpperCase() + termInfo.term.slice(1);
                        if (term in state.resourceTypesMapping) {
                            state.resourceTypes[term] = {...termInfo, ...state.resourceTypesMapping[term]}
                            commit('addFilter', {
                                'section': '@type',
                                'filter' : {...termInfo, ...state.resourceTypesMapping[term]}
                            })
                        }else{
                            state.resourceTypes[term] = {...termInfo, ...state.default}
                            commit('addFilter', {
                                'section': '@type',
                                'filter' : {...termInfo, ...state.default}
                            })
                        }
                        //chart data for /About
                        data.labels.push(termInfo.term);
                        data.datasets[0].label = 'Entity Types';
                        data.datasets[0].data.push(termInfo.count);
                    });
                    
                    state.chartData.about.types = data;
                }
            }).catch( err =>{
                console.log("Failed to get types info", err);
            });
            //sources
            axios.get(state.baseURL + "?aggs=_index").then( res =>{

                let data = {
                    labels: [],
                    datasets: [{data: []}]
                };
                
                if( res.data?.facets?.['_index']?.terms){
                    res.data?.facets?.['_index']?.terms.forEach(termInfo => {
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
                    });
                }

                state.chartData.about.sources = data;
            }).catch( err =>{
                console.log("Failed to get sources info", err);
            });
        }
    },
    mutations: {
        addFilter(state, payload){
            state.filters[payload.section].push(payload.filter);
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
        activateFilter(state, payload){
            let filter = state.filters[payload.section].find((f) => {
                if (f.term == payload.filter.term) {
                    return f;
                }
            });
            filter.active = !filter.active;
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
    },
}
