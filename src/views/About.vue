<template>
  <div class="darkMode text-gray-700 dark:text-gray-300 flex justify-items-stretch min-w-full" id="scrollArea">
    <div class="relative hidden md:block bg-main-dark dark:bg-gray-900 left-bar">
      <div class="p-2 sticky top-10 ml-5">
        <ul class="space-y-2 text-md">
          <template v-for="a in anchors" :key="a.anchor">
            <li>
              <a class="text-white" :class="[{'font-bold text-accent-light dark:!text-white' : a.visible}, {'ml-4' : !a['main-section']}, {'font-bold' : a['main-section']}]" :href="a.anchor">{{a.name}}</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="min-h-screen m-auto space-y-10 m-0 grow">

      <div class="max-w-6xl m-auto">
        <section class="space-y-10 mb-4 p-3" id="intro">
          <img src="/assets/img/rdp3d.svg" alt="RDP" class="w-1/2 md:w-1/5 m-auto mt-10">
          <h1 class="mb-6 text-gray-600 dark:text-white text-center font-bold">About the RDP</h1>
          <p >
            The CD2H Resource Discovery Portal is a single, intuitive tool to explore the landscape of biomedical resources. It provides some of the most comprehensive and diverse coverage of resources in the biomedical field and unlike generic search services, it is built and tailored specifically with the biomedical community in mind.
          </p>
          <h2 class=" mb-6 text-gray-600dark:text-secondary-light ">The RDP provides:</h2>
          <ul class="space-y-3 list-disc ml-6">
            <li>
              <p >A simple search interface to quickly find varied resources around a given topic</p>
            </li>
            <li>
              <p >Specialized interfaces for each resource type with resource-specific facets that allow users to explore the distribution of sources and search by facet</p>
            </li>
          </ul>
        </section>

        <section class="space-y-5 mb-4 p-3" id="platform">
          <h2 class="dark:text-white mb-6 text-main-600 font-bold">The Platform</h2>
        </section>

        <section class="space-y-10 mb-4 p-3 bg-gray-100 dark:bg-gray-900/50" id="dashboard">
          <h1 class=" mb-6 text-center text-main dark:text-amber-500">{{$filters.numberWithCommas(totalDocsRDP)}} Total Resources!</h1>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-1">
            <div v-for="filter in filters['resourceTypeName.keyword']" :key="filter.term">
              <img :src="filter.img" :alt="filter.term" class="inline w-4"> {{filter.term}}: <b>{{$filters.numberWithCommas(filter.count)}}</b>
            </div>
          </div>
          <div class="flex justify-center items-center w-full flex-wrap space-y-7 md:space-y-0">
            <div class="w-full md:w-1/2 m-auto md:max-w-md">
              <Chart :data="chartData.about['resourceTypeName.keyword']" type="pie" name='Resource Types'></Chart>
            </div>
            <div class="w-full md:w-1/2 m-auto md:max-w-md">
              <Chart :data="chartData.about['_index']" type="pie" name='Data Sources'></Chart>
            </div>
          </div>
        </section>

        <section class="space-y-10 mb-4 p-3 " id="works">
          <img src="/assets/img/laptop.svg" alt="How does our tool work?" class="w-1/2 md:w-1/4 m-auto mt-10">
          <h2 class=" mb-6 text-gray-600 dark:text-white ">How does our tool work?</h2>
          <p >
            The resources on the Resource Discovery Portal are continually updated by harvesters that draw metadata from many publicly available biomedical resource repositories such as Medline, NIH Reporter, VIVO profiles. In addition to traditional sources, the RDP performs curated searches on platforms such as Github, Youtube, and CTSA member websites to hand-select resources that are relevant for biomedical research, including videos, channels, slide presentations, and Github profiles.
          </p>
          <div class="space-y-2 text-center">
            <h3 class="mb-6 text-gray-600 dark:text-white ">How to use RDP</h3>
          </div>
          <p >
            The front-end allows users to explore the resource in multiple ways, including:
          </p>
          <p >
            <b class="text-main dark:text-white">Keyword search </b>- A simple one box search to see a range of results among the 10+ types of resources. Advanced searching is also available for users that would like to limit to specific resource types or further filter based on the many facets available for each resource type.
          </p>
          <p >
            <b class="text-main dark:text-white">Resource type</b> - Specialized views for each type of resource available. Users can explore interactive visualizations to see breakdowns of the available resources by various facets. Users can also search within a given facet’s results. For example, a user might explore datasets by performing the query “lung,” selecting a database, and browsing based on relevant subject terms.
          </p>
        </section>

        <section class="space-y-10 mb-4 p-3 bg-gray-100 dark:bg-gray-900/50" id="data">
          <img src="/assets/img/circle.svg" alt="Where is our data coming from?" class="h-1/2 md:w-1/3 m-auto mt-10">
          <h3 class=" mb-6 text-gray-600 dark:text-white ">Where is our data coming from?</h3>
          <div v-if="filters._index.length" class="p-2 grid grid-cols-1 md:grid-cols-2">
            <template v-for="source in filters._index" :key="source.name">
              <div class="p-3 space-y-4 border-b border-gray-200">
                <div class="m-auto rounded-full from-gray-100 to-gray-500 p-4 flex justify-center bg-gradient-to-r">
                  <a :v-html="source.link" target="_blank" rel="nonreferrer" class="cursor-pointer w-full flex justify-center">
                    <img class="h-12 rounded-xl" :alt="source.name" :src="source.img">
                  </a>
                </div>
                <h2 class="font-bold break-words">{{source.name || source.term}}</h2>
                <p class=" text-main dark:text-white">{{$filters.numberWithCommas(source.count)}} Resources</p>
                <p  v-html="source.description"></p>
                <p><a :href="source.link" target="_blank" rel="nonreferrer">For citation information and to learn more, click here. <i class="fas fa-external-link-square-alt"></i></a></p>
              </div>
            </template>
          </div>
        </section>

        <section class="space-y-5 mb-4 p-3" id="project">
          <h2 class="dark:text-white mb-6 text-main-600 font-bold">The Project</h2>
        </section>

        <section class="space-y-10 mb-4 p-3 " id="history">
          <h2 class="dark:text-white mb-6 text-gray-600">History</h2>
          <p >
            Funded by the CTSA National Center for Data to Health (CD2H), the Resource Discovery Portal has grown out of three distinct initiatives sharing the common goal of increasing the discoverability of resources relevant to biomedical sciences. These initiatives were:
          </p>
          <ul class="space-y-3 list-disc ml-6">
            <li>
              <p ><b>SciTS</b> Led by <i>David Eichmann, University of Iowa</i> - Responded to the need for a tool that would enable biomedical scientists to better garner academic intelligence, expand their expertise identification abilities, and increase their access to both traditional and non-traditional scientific artifacts.</p>
            </li>
            <li>
              <p ><b>Outbreak.info</b> Led by <i>Chunlei Wu, Scripps Research</i> - Created a comprehensive metadata schema to promote FAIR data-sharing best practices and maximize the research impact of scientists and their organizations, including the CTSA hubs.</p>
            </li>
            <li>
              <p ><b>CD2H Tool Registry</b> Led by <i>James Eddy, Sage Bionetworks</i> - Identified gaps caused by dispersed knowledge of biomedical software tools. The team created a centralized, curated library of  resources developed by and for the NCATS research community.</p>
            </li>
          </ul>
          <p >
            After each initiative completed its first phases, the projects have been merged into the single search interface that is the RDP, resulting in one of the largest, most comprehensive search tools designed specifically for biomedical researchers. The team is continuing to develop this platform to remain on the cutting edge of facilitating science by meeting knowledge discovery needs in biomedical science.
          </p>
        </section>

        <section class="space-y-10 mb-4 p-3 " id="cd2h">
          <h2 class=" mb-6 text-gray-600 dark:text-white">CD2H</h2>
          <p >
            The <a href="https://cd2h.org/" target="_blank" rel="nonreferrer">CTSA National Center for Data to Health (CD2H)</a> accelerates advancements in informatics by utilizing findable, accessible, interoperable, and reusable (FAIR) principles to promote collaboration across the Clinical and Translational Science Awards (CTSA) Program community. CD2H was funded in fall 2017 to coordinate and integrate informatics for the CTSA Program by promoting data reuse and interoperability, tool sharing, informatics fluency, and collaboration. The ultimate goal of the CD2H is to help CTSA Hubs thrive, accelerate advancements in informatics, and improve patient care.
          </p>
        </section>

        <section class="mb-4 p-3 w-full " id="team">
          <h3 class=" mb-6 text-gray-600 dark:text-white">The Team</h3>
          <div class="text-center font-light ">
            <template v-for="(members, organization) in team" :key="organization">
              <div class="flex justify-center p-10">
                <img v-if="organization == 'Scripps Research'" src="/assets/img/scripps.png" class="h-10">
                <img v-if="organization == 'University of Iowa'" src="/assets/img/iowa.png" class="h-20">
                <img v-if="organization == 'Sage'" src="/assets/img/sage.svg" class="h-10">
              </div>
              <div class="flex justify-center flex-wrap items-center">
                <template v-for="member in members" :key="member.name">
                  <PersonCard :person="member"></PersonCard>
                </template>
              </div>
            </template>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PersonCard from '../components/PersonCard.vue'
import Chart from '../components/Chart.vue'

export default {
  name: 'About',
  data: function(){
    return {
      anchors:[
        {
          'anchor': '#intro',
          'name': 'Intro',
          'visible': false,
          'main-section': true
        },
        {
          'anchor': '#platform',
          'name': 'The Platform',
          'visible': false,
          'main-section': true
        },
        {
          'anchor': '#dashboard',
          'name': 'Dashboard',
          'visible': false
        },
        {
          'anchor': '#works',
          'name': 'How RDP works',
          'visible': false
        },
        {
          'anchor': '#data',
          'name': 'Sources',
          'visible': false
        },
        {
          'anchor': '#project',
          'name': 'The Project',
          'visible': false,
          'main-section': true
        },
        {
          'anchor': '#history',
          'name': 'History',
          'visible': false
        },
        {
          'anchor': '#cd2h',
          'name': 'CD2H',
          'visible': false
        },
        {
          'anchor': '#team',
          'name': 'The Team',
          'visible': false
        },
      ]
    }
  },
  mounted: function()
  {
    let self = this;
    if(!!window.IntersectionObserver){
      let observer = new IntersectionObserver((entries) => { 
        entries.forEach(entry => {
        if(entry.isIntersecting){
          // console.log(entry);
          // entry.target.src = entry.target.dataset.src;
          let a = self.anchors.find((a) => a.anchor == "#" + entry.target.id);
          a.visible = true;
        }else{
          let a = self.anchors.find((a) => a.anchor == "#" + entry.target.id);
          a.visible = false;
        }
        });
      }, {rootMargin: "0px 0px -500px 0px"});
      document.querySelectorAll('section').forEach(sec => { observer.observe(sec) });
    }
  },
  computed:{
        ...mapGetters([
            'team',
            'filters',
            'chartData',
            'totalDocsRDP'
        ]),
  },
  components:{
    PersonCard,
    Chart
  },
}
</script>
