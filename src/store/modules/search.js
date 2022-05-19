import axios from 'axios';

export default {
    state: () => ({
        baseURL: "http://rdp.biothings.io/api/query",
        loading: false,
        results: [],
        results_facets: [],
        expandedView: false,
        recentSearches: [],
        maxRecentHistory: 5,
        resourceTypesMapping:{
            'Dataset' : {
                'hex': '#fb923c',
                'text': 'text-orange-400',
                'bg': 'bg-orange-400',
                'bg2': 'bg-orange-400/50',
                'icon': 'fas fa-database',
                'img': '/assets/img/icons/data.svg',
                'img_white': '/assets/img/icons/data_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
                'standaloneSearchFilters': [
                    {
                        'name': 'Filter by author',
                        'value': 'author.name.keyword'
                    }
                ],
            },
            'Institution' : {
                'hex': '#c026d3',
                'text': 'text-fuchsia-600',
                'bg': 'bg-fuchsia-600',
                'bg2': 'bg-fuchsia-600/50',
                'icon': 'fas fa-building',
                'img': '/assets/img/icons/institution.svg',
                'img_white': '/assets/img/icons/institution_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Other Creative Work' : {
                'hex': '#fb7185',
                'text': 'text-rose-400',
                'bg': 'bg-rose-400',
                'bg2': 'bg-rose-400/50',
                'icon': 'fas fa-lightbulb',
                'img': '/assets/img/icons/creative.svg',
                'img_white': '/assets/img/icons/creative_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Service' : {
                'hex': '#0891b2',
                'text': 'text-cyan-600',
                'bg': 'bg-cyan-600',
                'bg2': 'bg-cyan-600/50',
                'icon': 'fas fa-code',
                'img': '/assets/img/icons/service.svg',
                'img_white': '/assets/img/icons/service_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Education Resource' : {
                'hex': '#ec4899',
                'text': 'text-pink-500',
                'bg': 'bg-pink-500',
                'bg2': 'bg-pink-500/50',
                'icon': 'fas fa-apple-alt',
                'img': '/assets/img/icons/edu.svg',
                'img_white': '/assets/img/icons/edu_white.svg',
                'active' : false,
                'preview_badges': ['keywords', 'method', 'frequency', 'tag'],
            },
            'Clinical Trial' : {
                'hex': '#a855f7',
                'text': 'text-purple-500',
                'bg': 'bg-purple-500',
                'bg2': 'bg-purple-500/50',
                'icon': 'fas fa-flask',
                'img': '/assets/img/icons/ct.svg',
                'img_white': '/assets/img/icons/ct_white.svg',
                'active' : false,
                'preview_badges': ['keywords', 'healthCondition'],
                'standaloneSearchFilters': [
                    {
                    'name': 'Filter by author',
                    'value': 'author.name.keyword'
                    },
                    {
                        'name': 'Filter by results availability',
                        'value': 'hasResults'
                    },
                    {
                        'name': 'Filter by keywords',
                        'value': 'keywords'
                    },
                ],
            },
            'Publication' : {
                'hex': '#14b8a6',
                'text': 'text-teal-500',
                'bg': 'bg-teal-500',
                'bg2': 'bg-teal-500/50',
                'icon': 'fas fa-book',
                'img': '/assets/img/icons/book.svg',
                'img_white': '/assets/img/icons/book_white.svg',
                'active' : false,
                'preview_badges': ['topicCategory', 'keywords'],
                'standaloneSearchFilters': [
                    {
                    'name': 'Filter by author',
                    'value': 'author.name.keyword'
                    },
                ],
            },
            'Multimedia Object' : {
                'hex': '#ef4444',
                'text': 'text-red-500',
                'bg': 'bg-red-500',
                'bg2': 'bg-red-500/50',
                'icon': 'fab fa-photo-video',
                'img': '/assets/img/icons/vid.svg',
                'img_white': '/assets/img/icons/vid_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Video' : {
                'hex': '#ef4444',
                'text': 'text-red-500',
                'bg': 'bg-red-500',
                'bg2': 'bg-red-500/50',
                'icon': 'fab fa-video',
                'img': '/assets/img/icons/video.svg',
                'img_white': '/assets/img/icons/video_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
                'standaloneSearchFilters': [
                    {
                    'name': 'Filter by tags',
                    'value': 'tag.tag.keyword'
                    },
                    {
                    'name': 'Filter by video definition',
                    'value': 'definition.keyword'
                    },
                ],
            }, 
            'Playlist' : {
                'hex': '#dc2626',
                'text': 'text-red-600',
                'bg': 'bg-red-600',
                'bg2': 'bg-red-600/50',
                'icon': 'fab fa-play',
                'img': '/assets/img/icons/playlist.svg',
                'img_white': '/assets/img/icons/playlist_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Video Channel' : {
                'hex': '#f43f5e',
                'text': 'text-rose-500',
                'bg': 'bg-rose-500',
                'bg2': 'bg-rose-500/50',
                'icon': 'fab fa-play',
                'img': '/assets/img/icons/channel.svg',
                'img_white': '/assets/img/icons/channel_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Tool' : {
                'hex': '#4f46e5',
                'text': 'text-indigo-600 dark:text-indigo-300',
                'bg': 'bg-indigo-600',
                'bg2': 'bg-indigo-600/50',
                'icon': 'fas fa-laptop',
                'img': '/assets/img/icons/tool.svg',
                'img_white': '/assets/img/icons/tool_white.svg',
                'active' : false,
                'preview_badges': ['applicationCategory', 'programmingLanguage', 'operatingSystem'],
                'standaloneSearchFilters': [
                    {
                    'name': 'Filter by author',
                    'value': 'author.name.keyword'
                    },
                    {
                        'name': 'Filter by keywords',
                        'value': 'keywords'
                    },
                    {
                        'name': 'Filter by Operating System',
                        'value': 'operatingSystem.keyword'
                    },
                    {
                        'name': 'Filter by Language',
                        'value': 'programmingLanguage.keyword'
                    },
                    {
                        'name': 'Filter by License',
                        'value': 'license.keyword'
                    },
                ],
            },
            'Repository' : {
                'hex': '#2563eb',
                'text': 'text-blue-600 dark:text-blue-300',
                'bg': 'bg-blue-600',
                'bg2': 'bg-blue-600/50',
                'icon': 'fab fa-github',
                'img': '/assets/img/icons/repo.svg',
                'img_white': '/assets/img/icons/repo_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Profile' : {
                'hex': '#f59e0b',
                'text': 'text-amber-500',
                'bg': 'bg-amber-500',
                'bg2': 'bg-amber-500/50',
                'icon': 'fas fa-user',
                'img': '/assets/img/icons/person.svg',
                'img_white': '/assets/img/icons/person_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
            },
            'Funding Opportunity' : {
                'hex': '#eab308',
                'text': 'text-yellow-500',
                'bg': 'bg-yellow-500',
                'bg2': 'bg-yellow-500/50',
                'icon': 'fas fa-money-check-alt',
                'img': '/assets/img/icons/funding.svg',
                'img_white': '/assets/img/icons/funding_white.svg',
                'active' : false,
                'preview_badges': ['primary_ic'],
                // 'standaloneSearchFilters': [
                //     {
                //     'name': 'Filter by keyword',
                //     'value': 'keyword.keyword.keyword'
                //     },
                // ],
            },
            'Grant' : {
                'hex': '#059669',
                'text': 'text-emerald-600 dark:text-emerald-500',
                'bg': 'bg-emerald-500',
                'bg2': 'bg-emerald-600/50 dark:bg-emerald-500/50',
                'icon': 'fas fa-money-check-alt',
                'img': '/assets/img/icons/grant.svg',
                'img_white': '/assets/img/icons/grant_white.svg',
                'active' : false,
                'preview_badges': ['funding_ic'],
                'standaloneSearchFilters': [{
                    'name': 'Filter by funding institution',
                    'value': 'ic_name.keyword'
                }],
            },
            'Research Instrument' : {
                'hex': '#84cc16',
                'text': 'text-lime-500',
                'bg': 'bg-lime-500',
                'bg2': 'bg-lime-500/50',
                'icon': 'fas fa-microscope',
                'img': '/assets/img/icons/instrument.svg',
                'img_white': '/assets/img/icons/instrument_white.svg',
                'active' : false,
                'preview_badges': ['keywords'],
                // 'standaloneSearchFilters': [
                //     {
                //     'name': 'Filter by keyword',
                //     'value': 'keyword.keyword.keyword'
                //     },
                // ],
            },
            'Protocol' : {
                'hex': '#06b6d4',
                'text': 'text-cyan-500',
                'bg': 'bg-cyan-500',
                'bg2': 'bg-cyan-500/50',
                'icon': 'fas fa-list-alt',
                'img': '/assets/img/icons/protocol.svg',
                'img_white': '/assets/img/icons/protocol_white.svg',
                'active' : false,
                'preview_badges': ['protocolCategory', 'protocolSetting'],
                'standaloneSearchFilters': [{
                    'name': 'Filter by author',
                    'value': 'author.name.keyword'
                }],
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
            'cd2h-nih-medline': {
                'name': 'National Library of Medicine',
                'img': '/assets/img/medline.png',
                'description': "MEDLINE is the National Library of Medicine's (NLM) premier bibliographic database that contains references to journal articles in life sciences, with a concentration on biomedicine.",
                'link': 'https://www.nlm.nih.gov/medline/index.html',
                'active': false
            },
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
            'outbreak_clinical_trials_202111180830_szlrg5pn_clone':{
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
            'outbreak_litcovid_202110070745_vvrw8kmo_clone':{
                'name': 'Outbreak.info',
                'img': '/assets/img/outbreak.svg',
                'description': 'In response to the current outbreak of SARS-CoV-2 (the virus that causes COVID-19), researchers worldwide have been generating and openly sharing data, publications, reagents, code, protocols, and more. Broad sharing of these resources improves the speed and efficiency of science. Unfortunately, there are no uniform standards and repositories for collecting all this information in one place.',
                'link': 'https://outbreak.info/',
                'active': false
            },
            'outbreak_biorxiv_202110201005_cky5khsd_clone':{
                'name': 'bioRxiv',
                'img': '/assets/img/bioRxiv_logo.png',
                'description': 'bioRxiv (pronounced "bio-archive") is a free online archive and distribution service for unpublished preprints in the life sciences. It is operated by Cold Spring Harbor Laboratory, a not-for-profit research and educational institution. By posting preprints on bioRxiv, authors are able to make their findings immediately available to the scientific community and receive feedback on draft manuscripts before they are submitted to journals.',
                'link': 'https://www.biorxiv.org/',
                'active': false
            },
            'outbreak_figshare_202111180645_vf0lje01_clone':{
                'name': 'FigShare',
                'img': '/assets/img/figshare.png',
                'description': 'figshare is a repository where users can make all of their research outputs available in a citable, shareable and discoverable manner.',
                'link': 'https://figshare.com/',
                'active': false
            },
            'outbreak_pdb_20211016075616_femj0kmx_clone':{
                'name': 'Protein Data Bank',
                'img': '/assets/img/pbd.png',
                'description': 'The Protein Data Bank (PDB) was established as the 1st open access digital data resource in all of biology and medicine (Historical Timeline). It is today a leading global resource for experimental data central to scientific discovery.',
                'link': 'https://www.rcsb.org/pages/policies#References',
                'active': false
            },
            'outbreak_protocolsio_202110200650_bwwlvckg_clone':{
                'name': 'ProtocolsIO',
                'img': '/assets/img/protocols_io.png',
                'description': 'A research protocol is a document that describes the background, rationale, objectives, design, methodology, statistical considerations, and organization of a clinical research project.',
                'link': 'https://www.protocols.io/',
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
                'name': 'YouTube (Videos)',
                'img': '/assets/img/youtube.png',
                'link': 'https://www.youtube.com/',
                'description': 'Our mission is to give everyone a voice and show them the world. We believe that everyone deserves to have a voice, and that the world is a better place when we listen, share and build community through our stories.',
                'active': false
            },
            'cd2h-youtube-channel':{
                'name': 'YouTube (Channels)',
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
            'cd2h-redcap':{
                'name': 'REDCap',
                'img': '/assets/img/redcap.png',
                'link': 'https://www.project-redcap.org/',
                'description': `REDCap is a secure web application for building and managing online surveys and databases. While REDCap can be used to collect virtually any type of data in any environment (including compliance with 21 CFR Part 11, FISMA, HIPAA, and GDPR), it is specifically geared to support online and offline data capture for research studies and operations. The REDCap Consortium, a vast support network of collaborators, is composed of thousands of active institutional partners in over one hundred countries who utilize and support their own individual REDCap systems. Please visit the <a href="https://projectredcap.org/partners/join/" style="text-decoration:underline;">Join</a> page to learn how your non-profit organization can join the consortium, or explore the first section on our <a href="https://projectredcap.org/about/faq/" style="text-decoration:underline;">FAQ</a> for other options to use REDCap.`,
                'active': false
            },
            'cd2h-github-repository':{
                'name': 'GitHub (Repositories)',
                'img': '/assets/img/github_logo.png',
                'link': 'https://www.github.com/',
                'description': `Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.`,
                'active': false
            },
            'cd2h-github-user':{
                'name': 'GitHub (Users)',
                'img': '/assets/img/github_logo.png',
                'link': 'https://www.github.com/',
                'description': `Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.`,
                'active': false
            },
            'cd2h-nih-foa':{
                'name': 'NIH FOA',
                'img': '/assets/img/grants-logo.png',
                'link': 'https://grants.nih.gov/funding/searchguide/index.html#/',
                'description': `The NIH Guide for Grants and Contracts is NIH's official publication of notices of grant policies, guidelines and funding opportunity announcements (FOAs).`,
                'active': false
            },
            'cd2h-github-organization':{
                'name': 'GitHub (Organizations)',
                'img': '/assets/img/github_logo.png',
                'link': 'https://www.github.com/',
                'description': `Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.`,
                'active': false
            },
            'cd2h-clic-education':{
                'name': 'CLIC Education & Career Development Gateway',
                'img': '/assets/img/clic.png',
                'link': 'https://clic-ctsa.org/index.php/',
                'description': `Our mission is to serve the CTSA Program through stakeholder-engaged activities. CLIC accelerates and demonstrates the impact of the CTSA Program through coordination, transparent communication, team science, actionable metrics, analytics and innovative collaboration tools.`,
                'active': false
            },
            'nlpsandbox-computational-tools-20220401-2':{
                'name': 'NLP Sandbox.io',
                'img': '/assets/img/nlp.png',
                'link': 'https://nlpsandbox.io',
                'description': `NLP Sandbox is an open platform for benchmarking modular natural language processing (NLP) tools on both public and private datasets. Academics, students, and industry professionals are invited to browse the available tasks and participate by developing and submitting an NLP Sandbox tool.`,
                'active': false
            },
            'cd2h-diamond-training-material':{
                'name': 'The Development, Implementation and Assessment of Novel Training in Domain-based Competencies: Training Materials',
                'img': '/assets/img/diamond.png',
                'link': 'https://clic-ctsa.org/diamond',
                'description': `The Development, Implementation and Assessment of Novel Training in Domain-based Competencies, or “DIAMOND” project, is a collaborative effort by the University of Michigan, University of Rochester, The Ohio State University and Tufts University to provide competency-based education and training to clinical research professionals.  The primary objectives of this project are to develop an online educational portal for shared competency-based educational offerings and assessments, demonstrate the utility of an e-portfolio system for individualized professional development planning, and to disseminate these educational offerings to broader audiences at research institutions across the United States.`,
                'active': false
            },
            'cd2h-diamond-assessment':{
                'name': 'The Development, Implementation and Assessment of Novel Training in Domain-based Competencies: Assessment',
                'img': '/assets/img/diamond.png',
                'link': 'https://clic-ctsa.org/diamond',
                'description': `The Development, Implementation and Assessment of Novel Training in Domain-based Competencies, or “DIAMOND” project, is a collaborative effort by the University of Michigan, University of Rochester, The Ohio State University and Tufts University to provide competency-based education and training to clinical research professionals.  The primary objectives of this project are to develop an online educational portal for shared competency-based educational offerings and assessments, demonstrate the utility of an e-portfolio system for individualized professional development planning, and to disseminate these educational offerings to broader audiences at research institutions across the United States.`,
                'active': false
            },
            'cckp-computational-tools-20220401-2':{
                'name': 'Cancer Complexity Knowledge Portal',
                'img': '/assets/img/cckp.svg',
                'link': 'https://cancercomplexity.synapse.org/',
                'description': `The NCI Division of Cancer Biology supports multiple research programs composed of interdisciplinary communities of scientists who aim to integrate approaches, data, and tools to address important questions in basic and translational cancer research. Discover and download datasets, publications, and other resources generated by these programs.`,
                'active': false
            },
        },
        sourceDefault: {
            'name': '',
            'img': '',
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
        mostRecentSize: 3,
        allSelected: false
    }),
    actions: {
        activateFilter({ commit }, payload) {
            commit('activateFilter', payload);
        },
        activateSubFilter({ dispatch, commit }, payload) {
            commit('activateSubFilter', payload)
            dispatch('search');
        },
        search({commit, state }, payload) {
            //LOADING
            commit('setLoading', { value: true});

            //API BASE URL
            let url = state.baseURL; 

            // RECENT SEARCHES
            if (state.query) {
                commit('addRecent', {'value': state.query});
            }
            
            //PAGINATION
            var config = {
                "params": {
                    'size': state.perPage,
                    'from': state.page == 1 ? state.page-1 : ((state.page-1) * state.perPage ),
                    'aggs': 'resourceTypeName.keyword',
                    'facet_size': 20
                }
            }
            // QUERY
            if(state.query){
                config.params.q = state.query
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
            console.log('%c Active Filters ' + JSON.stringify(active, null, 2), 'color:hotpink');
            
            let fString = "";
            if (Object.keys(active).length) {
                let processed =[];
                for (const section in active) {
                    processed.push(`${active[section].map(value => section + ':' + value ).join(' OR ')}`);
                }
                fString = processed.join(' AND ');
            }

            // ADD FILTERS TO Q STRING
            if (fString) {
                config.params['post_filter'] = fString
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

            console.log('%c Active Advanced Filters ' + JSON.stringify(advanced_active, null, 2), 'color:dodgerblue');

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
        // search({commit, state }, payload) {
        //     let url = state.baseURL; 
        //     // RECENT SEARCHES
        //     if (payload?.value) {
        //         commit('addRecent', payload);
        //         commit('saveQuery', payload);
        //     }
        //     //LOADING
        //     commit('setLoading', { value: true});
        //     //PAGINATION
        //     var config = {
        //         "params": {
        //             'size': state.perPage,
        //             'from': state.page == 1 ? state.page-1 : ((state.page-1) * state.perPage ),
        //             'aggs': 'resourceTypeName.keyword',
        //             'facet_size': 20
        //         }
        //     }
        //     // QUERY
        //     if(state.query){
        //         // TEMP remove when all docs have resourceTypeName
        //         config.params.q = state.query + " AND _exists_:resourceTypeName"
        //     }else{
        //         config.params.q = "_exists_:resourceTypeName"
        //     }

        //      // RESOURCE FILTER
        //     if (payload?.resourceFilter) {
        //         console.log('%c Resource Filter: ' + payload.resourceFilter, 'color:orange')
        //         state.filters['resourceTypeName.keyword'].forEach(f => {
        //             if (f.term == payload.resourceFilter) {
        //                 f.active = true;
        //             }else{
        //                 f.active = false;
        //             }
        //         });
        //     }

        //     // FILTERS
        //     let active = {};
        //     for (const filter_type in state.filters) {
        //         state.filters[filter_type].forEach(filter => {
        //             if (filter.active) {
        //                 Object.hasOwnProperty.call(active, filter_type) ? 
        //                 active[filter_type].push(filter.term) : active[filter_type] = [filter.term];
        //             }
        //         });
        //     }
        //     // console.log('%c Active Filters ' + JSON.stringify(active, null, 2), 'color:hotpink');
            
        //     let fString = "";
        //     if (Object.keys(active).length) {
        //         for (const section in active) {
        //             fString += ' AND (' + active[section].map(value => section + ':"' + value + '"' ).join(' OR ') + ')'
        //         }
        //     }

        //     // ADD FILTERS TO Q STRING
        //     if (fString) {
        //         config.params.q += fString
        //     }

        //     // ADVANCED FILTERS (UNDER RESOURCE TYPE)
        //     let advanced_active = [];
        //     for (const filter_type in state.filters) {
        //         state.filters[filter_type].forEach(type => {
        //             if (type?.filters) {
        //                 type?.filters.forEach(f => {
        //                     if (f.active) {
        //                         advanced_active.push(f.field)
        //                     }
        //                 })
        //             }
        //         });
        //     }
        //     let advancedString = "" 
        //     advancedString = advanced_active.length ? advanced_active.join(' AND ') : false;

        //     // console.log('%c Active Advanced Filters ' + JSON.stringify(advanced_active, null, 2), 'color:dodgerblue');

        //     // ADD ADVANCED FILTERS TO Q STRING
        //     if (advancedString) {
        //         config.params.q += " AND " + advancedString
        //     }

        //     console.log('%c Search ' + JSON.stringify(config, null, 2), 'color:limegreen');
        //     // SEARCH
        //     axios.get(url, config).then( res =>{
        //         console.log(res)
        //         commit('saveResults', { value: res.data.hits});
        //         commit('saveResultsFacets', { value: res.data.facets?.['resourceTypeName.keyword']?.terms});
        //         commit('setLoading', { value: false});
        //         commit('updatePages', { value: res.data.total});
        //     }).catch( err =>{
        //         commit('setLoading', { value: false});
        //     });
        // },
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
                    'q': `resourceTypeName:${payload.resource} AND _exists_:dateModified`,
                    'size': state.mostRecentSize,
                    '-sort': 'dateModified'
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
        selectAllResources(state){
            if (state.allSelected) {
                state.filters['resourceTypeName.keyword'].forEach((f) => f.active = false);
            } else {
                state.filters['resourceTypeName.keyword'].forEach((f) => f.active = true);
            }
            state.allSelected = !state.allSelected
        },
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
        clearFilter(state, payload){
            if (Object.hasOwnProperty.call(state.filters, payload.section)) {
                console.log('clearing', payload.section)
                state.filters[payload.section] = [];
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
            state.filters['resourceTypeName.keyword'].forEach(filter => filter.result_count = 0);
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
            if (state.recentSearches.includes(payload.value)) {
                //remove old mention
                state.recentSearches.splice(state.recentSearches.indexOf(payload.value), 1);
            }
            //add recent
            state.recentSearches.unshift(payload.value);
            console.log('%c recently searched: ' + JSON.stringify(payload.value, null, 2), 'color:yellow');

            if (state.recentSearches.length > state.maxRecentHistory) {
                //remove last
                state.recentSearches = state.recentSearches.slice(0, state.maxRecentHistory);
            }
            localStorage.rdp_recent = JSON.stringify(state.recentSearches);
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
        allSelected: (state) => {
            return state.allSelected;
        },
    },
}
