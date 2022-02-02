<template>
  <div class="darkMode py-10 text-gray-700 dark:text-gray-400 flex justify-items-stretch" id="scrollArea">
    <div class="relative hidden md:block">
      <div class="p-2 sticky top-10 ml-5">
        <ul class="text-sm space-y-2">
          <template v-for="a in anchors" :key="a.anchor">
            <li>
              <a :class="[{'font-bold text-main dark:text-tertiary-light' : a.visible}, {'ml-4' : !a['main-section']}, {'font-bold' : a['main-section']}]" :href="a.anchor">{{a.name}}</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="min-h-screen max-w-screen-lg m-auto space-y-28">

      <section class="space-y-10 mb-4 p-3 min-h-[50vh]" id="intro">
        <h1 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">About the RDP</h1>
        <p class="text-2xl">
          The CD2H Resource Discovery Portal is a single, intuitive interface that allows researchers to explore the landscape of potential bio-informatics resources around a topic of interest.
        </p>
         <h2 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">What we provide</h2>
        <ul class="space-y-3 list-disc ml-6">
          <li>
            <p class="text-2xl">A simple search interface to quickly find varied resources around a given topic</p>
          </li>
          <li>
            <p class="text-2xl">Specialized interfaces for each resource type with resource-specific facets that allow users to explore the distribution of sources and search by facet</p>
          </li>
          <li>
            <p class="text-2xl">The ability to search resources by both institution and creator</p>
          </li>
        </ul>
      </section>

      <section class="space-y-10 mb-4 p-3 min-h-[10vh]" id="platform">
        <h1 class="text-3xl md:text-5xl mb-6 text-tertiary font-bold">The Platform</h1>
      </section>

      <section class="space-y-10 mb-4 p-3 min-h-[50vh]" id="dashboard">
        <h1 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">{{$filters.numberWithCommas(totalDocsRDP)}} Total Documents!</h1>
        <ul>
          <li>
            <p class="text-2xl">A simple search interface to quickly find varied resources around a given topic</p>
          </li>
          <li>
            <p class="text-2xl">Specialized interfaces for each resource type with resource-specific facets that allow users to explore the distribution of sources and search by facet</p>
          </li>
          <li>
            <p class="text-2xl">The ability to search resources by both institution and creator</p>
          </li>
        </ul>
        <div class="flex justify-center items-center w-full flex-wrap space-y-7 md:space-y-0">
          <div class="w-full md:w-1/2 m-auto">
            <Chart :data="chartData.about.types" type="pie" name='Resource Types'></Chart>
          </div>
          <div class="w-full md:w-1/2 m-auto">
            <Chart :data="chartData.about.sources" type="pie" name='Data Sources'></Chart>
          </div>
        </div>
      </section>

      <section class="space-y-10 mb-4 p-3 min-h-[50vh]" id="works">
        <h1 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">How does our tool work?</h1>
        <p class="text-2xl">
          The resources on the Resource Discovery Portal are continually updated by harvesters that draw metadata from many publicly available biomedical resource repositories such as Medline, NIH Reporter, VIVO profiles. In addition to traditional sources, the RDP performs curated searches on platforms such as Github, Youtube, and CTSA member websites to hand-select resources that are relevant for biomedical research, including videos, channels, slide presentations, and Github profiles.
        </p>
        <div class="space-y-2 text-center">
          <h1 class="text-md md:text-2xl mb-6 text-main dark:text-secondary-light">How to use RDP</h1>
          <figure>
            <img src="/assets/img/video-how.png" alt="how to use rdp" class="w-1/3 m-auto">
            <figcaption class="text-gray-400">Learn how to use the Resource Discovery Portal</figcaption>
          </figure>
        </div>
        <p class="text-2xl">
          The front-end allows users to explore the resource in multiple ways, including:
        </p>
        <p class="text-2xl">
          <b class="text-main dark:text-tertiary">Keyword search </b>- A simple one box search to see a range of results among the 10+ types of resources. Advanced searching is also available for users that would like to limit to specific resource types or further filter based on the many facets available for each resource type.
        </p>
        <p class="text-2xl">
          <b class="text-main dark:text-tertiary">Resource type</b> - Specialized views for each type of resource available. Users can explore interactive visualizations to see breakdowns of the available resources by various facets. Users can also search within a given facet’s results. For example, a user might explore datasets by performing the query “lung,” selecting a database, and browsing based on relevant subject terms.
        </p>
      </section>

      <section class="space-y-10 mb-4 p-3 min-h-[50vh]" id="data">
        <h1 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">Where is our data coming from?</h1>
        <div v-if="filters._index.length" class="space-y-4 p-2">
          <template v-for="source in filters._index" :key="source.name">
            <div class="p-1 space-y-4 border-b border-gray-200">
              <a :v-html="source.link" target="_blank" rel="nonreferrer">
                <img class="w-32" :alt="source.name" :src="source.img">
              </a>
              <h2 class="text-2xl font-bold">{{source.name}}</h2>
              <h3 class="text-lg text-main dark:text-tertiary">{{$filters.numberWithCommas(source.count)}} Documents</h3>
              <p v-html="source.description"></p>
              <p><a :href="source.link" target="_blank" rel="nonreferrer">For citation information and to learn more, click here. <i class="fas fa-external-link-square-alt"></i></a></p>
            </div>
          </template>
        </div>
      </section>

      <section class="space-y-10 mb-4 p-3 min-h-[10vh]" id="project">
        <h1 class="text-3xl md:text-5xl mb-6 text-tertiary font-bold">The Project</h1>
      </section>

      <section class="space-y-10 mb-4 p-3 min-h-[50vh]" id="history">
        <h1 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">History</h1>
        <p class="text-2xl">
          Funded by the CTSA National Center for Data to Health (CD2H), the Resource Discovery Portal has grown out of three distinct initiatives sharing the common goal of increasing the discoverability of resources relevant to biomedical sciences. These initiatives were:
        </p>
        <ul class="space-y-3 list-disc ml-6">
          <li>
            <p class="text-2xl"><b>SciTS</b> Led by <i>David Eichmann, University of Iowa</i> - Responded to the need for a tool that would enable biomedical scientists to better garner academic intelligence, expand their expertise identification abilities, and increase their access to both traditional and non-traditional scientific artifacts.</p>
          </li>
          <li>
            <p class="text-2xl"><b>Outbreak.info</b> Led by <i>Chunlei Wu, Scripps Research</i> - Created a comprehensive metadata schema to promote FAIR data-sharing best practices and maximize the research impact of scientists and their organizations, including the CTSA hubs.</p>
          </li>
          <li>
            <p class="text-2xl"><b>CD2H Tool Registry</b> Led by <i>James Eddy, Sage Bionetworks</i> - Identified gaps caused by dispersed knowledge of biomedical software tools. The team created a centralized, curated library of  resources developed by and for the NCATS research community.</p>
          </li>
        </ul>
        <p class="text-2xl">
          After each initiative completed its first phases, the projects have been merged into the single search interface that is the RDP, resulting in one of the largest, most comprehensive search tools designed specifically for biomedical researchers. The team is continuing to develop this platform to remain on the cutting edge of facilitating science by meeting knowledge discovery needs in biomedical science.
        </p>
      </section>

      <section class="space-y-10 mb-4 p-3 min-h-[50vh]" id="cd2h">
        <h1 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">CD2H</h1>
        <p class="text-2xl">
          The <a href="https://cd2h.org/" target="_blank" rel="nonreferrer">CTSA National Center for Data to Health (CD2H)</a> accelerates advancements in informatics by utilizing findable, accessible, interoperable, and reusable (FAIR) principles to promote collaboration across the Clinical and Translational Science Awards (CTSA) Program community. CD2H was funded in fall 2017 to coordinate and integrate informatics for the CTSA Program by promoting data reuse and interoperability, tool sharing, informatics fluency, and collaboration. The ultimate goal of the CD2H is to help CTSA Hubs thrive, accelerate advancements in informatics, and improve patient care.
        </p>
      </section>

      <section class="mb-4 p-3 w-full min-h-[50vh]" id="team">
        <h1 class="text-2xl md:text-5xl mb-6 text-main dark:text-secondary-light font-extrabold">The Team</h1>
        <div class="text-center font-light text-2xl">
          <template v-for="(members, organization) in team" :key="organization">
            <div class="flex justify-center p-10">
              <img v-if="organization == 'Scripps Research'" src="/assets/img/scripps.png" class="h-10">
              <img v-if="organization == 'University of Iowa'" src="/assets/img/uiowa.png" class="h-20">
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
