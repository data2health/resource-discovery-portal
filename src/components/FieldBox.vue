<template>
    <tr v-if="name !== '_meta'" class="dark:text-gray-300 min-w-max" :class="[isChild ? 'ml-2' : 'ml-0']">
        <!-- 🌈 Array 🌈 -->
        <template v-if="type == 'array'">
          <template v-if="name =='keywords'">
            <td :class="theme?.text">
              Keywords
            </td>
            <td class="space-x-1">
                <template v-for="tag in content" :key="tag">
                  <router-link class=" text-accent hover:text-accent-light underline" :to='{path: "/search", query:{"q": `"` + tag + `"`}}'><i class="fas fa-hashtag" :class="theme?.text"></i> {{tag}}</router-link>
                </template>
            </td>
          </template>
          <!-- not keywords -->
          <template v-else>
            <td :class="theme?.text" @click="expandArray =! expandArray" class="cursor-pointer font-bold group">
              {{readable_name}} <span class="text-accent">({{content?.length || 'N/A'}})</span>
              <b v-if="!expandArray"><i class="fas fa-plus-circle text-green-400 ml-3 mr-2"></i></b>
              <b v-if="expandArray"><i class="fas fa-minus-circle text-red-400 ml-3 mr-2"></i></b>
            </td>
            <td v-if="expandArray">
              <div class="p-1 text-white">
                <template v-if="content.length > perPage">
                  <select class="appearance-none accent-pink-500 px-2 py-1 font-bold rounded dark:bg-gray-800 focus:outline-none text-accent" v-model="perPage" @change="calculatePages" id="perPage">
                      <option value="" disabled selected>Shown Per Page</option>
                      <option value="10">10 per page</option>
                      <option value="25">25 per page</option>
                      <option value="100">100 per page</option>
                  </select>
                  <div class="flex flex-wrap justify-center p-1 mt-2 space-x-1">
                    <div class="rounded" :class="{ 'disabled': page <= 1 }">
                      <a class="page-link p-1" @click.prevent="prevPage()"><i class="fas fa-step-backward"></i></a>
                    </div>
                    <template v-if="groupPages">
                      <div class="rounded" v-show="!startCapLimitReached">
                        <a href="#" class="page-link p-1" @click.prevent="previousGroup()">Previous 20</a>
                      </div>
                    </template>
                    <template v-for="n in pages" :key="n+'page'">
                      <div v-if="n >= startCap && n <= endCap" class="rounded px-1" :class="{ 'bg-accent': page == n, 'bg-main !text-white': page == n, 'text-white': page == n  }">
                        <a href="#" class="page-link p-1" @click.prevent="page = n" v-text="n"></a>
                      </div>
                    </template>
                    <template v-if="groupPages">
                      <div class="rounded" v-show="!endCapLimitReached">
                        <a href="#" class="page-link p-1" @click.prevent="nextGroup()">Next 20</a>
                      </div>
                    </template>
                    <div class="rounded" :class="{ 'disabled': page >= pages }">
                      <a class="page-link p-1" @click.prevent="nextPage()"><i class="fas fa-step-forward"></i></a>
                    </div>
                  </div>
                </template>
              </div>
              <table class="w-full">
                  <tbody>
                      <template v-for="(item, i) in arrayResults" :key="i+'fb'">
                          <field-box class="m-1" name="" :content="item" isChild="true"></field-box>
                      </template>
                  </tbody>
              </table>
            </td>
            <td v-else @click="expandArray=!expandArray" class="text-gray-400 cursor-pointer dark:text-gray-500 italic">
              click to see more
            </td>
          </template>
        </template>
        <!-- 🌈 String 🌈 -->
        <template v-if="type == 'string'">
          <template v-if="isUrl(content)">
              <td :class="theme?.text">
                {{readable_name}}
              </td>
              <td class="group">
                <a :href="content" target="_blank" rel="nonreferrer" :title="content">
                  <small><span v-text="content.length > 70 ? content.substring(0, 70) + '...' : content"></span> <i class="fas fa-external-link-alt text-accent"></i></small>
                </a>
                <span class="ml-3 opacity-0 group-hover:opacity-100">
                  <CopyButton :copy="content" copy_msg="Copy URL"></CopyButton>
                </span>
              </td>
            </template>
            <template v-else> 
              <td :class="theme?.text">
                {{readable_name ? readable_name + '&nbsp;:' : ''}}
              </td>
              <td class="flex items-center justify-start group">
                <a class="ml-1" v-if="isUrl(content)" v-text="content" :href="content" target="_blank" rel="nonreferrer"></a>
                <template v-else>
                  <Description :text="content"></Description>
                  <span class="ml-3 opacity-0 group-hover:opacity-100">
                    <CopyButton v-if="!name.includes('date')" :copy="content" copy_msg="Copy"></CopyButton>
                  </span>
                </template>
              </td>
            </template>
        </template>
        <!-- 🌈 Object 🌈 -->
        <template v-if="type == 'object'">
          <td :class="theme?.text">
              {{readable_name}}
            </td>
            <td>
                <table class="w-full">
                    <tbody>
                      <template v-for="(value,key) in content" :key="key">
                          <field-box :name="key" :content="value" :theme="theme" isChild="true"></field-box>
                      </template>
                    </tbody>
                </table>
            </td>
        </template>
        <!-- 🌈 Boolean 🌈 -->
        <template v-if="type == 'boolean'">
          <td :class="theme?.text">
            {{readable_name}}
          </td>
          <td>
            <small v-if="content === true"><i class="fas fa-check text-success"></i> <span v-text="content"></span></small>
            <small v-else><i class="fas fa-times text-danger"></i> <span v-text="content"></span></small>
          </td>
        </template>
        <!-- 🌈 Number 🌈 -->
        <template v-if="type == 'number'">
          <td :class="theme?.text">
            {{readable_name}}
          </td>
          <td>
            {{content}}
          </td>
          <!-- <Pill :color="theme['bg']">
              <template v-slot:title>{{readable_name}}</template>
              <template v-slot:value>{{content}}</template>
          </Pill> -->
        </template>
    </tr>
</template>

<script>
import Description from './ExpandableDescription.vue'
import Pill from './Pill.vue'

export default {
    name: "FieldBox",
    data: function(){
        return{
            type: '',
            expandArray:false,
            perPage: 10,
            page: 1,
            pages: 1,
            startCap:0,
            endCap:20,
            groupPages: false,
            pageLimit: 20,
            startCapLimitReached: true,
            endCapLimitReached: false,
            readable_labels : {}
        }
    },
    components:{
      Description,
      Pill
    },
    props: ['name','content','isChild', 'theme'],
    methods:{
        getType(content){
            var self = this;
            if (content) {
               if (content?.constructor === Object) {
                    if (Object.keys(content).length == 0) {
                      self.type = 'IDK'
                    }else{
                      self.type = 'object'
                    }
                }
                else if (content?.constructor === Array) {
                    if (content.length == 0 ) {
                        self.type = 'IDK'
                    }else{
                        self.type = 'array'
                    }
                }
                else if (content?.constructor === Boolean) {
                    self.type = 'boolean'
                }
                else if (content?.constructor === Number) {
                    self.type = 'number'
                }
                else if (content?.constructor === String) {
                    self.type = 'string'
                }else {
                    self.type = 'IDK'
                }
            }else{
              self.type = 'IDK'
            }
        },
        isUrl(txt){
          var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return pattern.test(txt);
        },
        calculatePages: function () {
                var self= this;
                self.pages = Math.ceil(self.content.length / self.perPage);
        
                if (self.pages > self.pageLimit) {
                    self.groupPages =  true;
                }
        },
        previousGroup: function(){
            var self = this;
    
            if (!self.startCapLimitReached) {
                if (self.startCap-20 > 0) {
                self.page = self.startCap-20
                self.startCap = self.startCap-20
                self.endCap = self.endCap-20
                self.endCapLimitReached = false;
                }else {
                self.page = 1
                self.startCap = 0
                self.endCap = 20
                self.startCapLimitReached = true;
                self.endCapLimitReached = false;
                }
            }
        },
        nextGroup: function(){
            var self = this;
            if (!self.endCapLimitReached) {
                if (self.endCap+20 < self.pages) {
                self.page = self.startCap+20
                self.startCap = self.startCap+20
                self.endCap = self.endCap+20
                self.startCapLimitReached = false;
                }else {
                self.page = self.startCap+20
                self.startCap = self.startCap+20
                self.endCap = self.pages
                self.endCapLimitReached = true;
                self.startCapLimitReached = false;
                }
            }
        },
        prevPage: function () {
            var self= this;
            if (self.page > 1)
                self.page -= 1
        },
        nextPage: function () {
            var self= this;
            if (self.page < self.pages)
                self.page += 1
        },
    },
    mounted: function(){
      if (!this.name.startsWith('_')) {
        this.getType(this.content)
        if (this.type == 'array') {
            this.calculatePages();
        }
      }
    },
    computed: {
        arrayResults: function () {
            var start = (this.page - 1) * this.perPage,
                end = start + this.perPage;
            return this.content && this.content.slice(start, end);
        },
        readable_name: function() {
            if (Object.keys(this.readable_labels).length &&
            Object.hasOwnProperty.call(this.readable_labels, this.name)) {
                return this.readable_labels[this.name];
            }
            else if (this.name.includes("_")) {
                let parts = this.name.split("_");
                parts = parts.map(item => item.charAt(0).toUpperCase() + item.slice(1));
                parts = parts.join(" ");
                return parts;
            }else{
                if (/[A-Z]/.test(this.name)) {
                let parts = this.name.split(/(?=[A-Z])/);
                parts = parts.map(item => item.charAt(0).toUpperCase() + item.slice(1));
                parts = parts.join(" ");
                return parts;
                }else{
                return this.name.charAt(0).toUpperCase() + this.name.slice(1);
                }
            }
        }
    }
}
</script>