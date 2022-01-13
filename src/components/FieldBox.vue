<template>
    <div v-if="name !== '_meta'" class="m-0 rounded-none dark:text-gray-300" :class="[isChild?'p-1 border-left':'p-1 border-bottom']">
        <!-- 🌈 Array 🌈 -->
        <template v-if="type == 'array'">
          <div class="row m-0">
            <div class="text-left">
              <small class="cursor-pointer font-bold" :class="theme?.text" @click="expandArray=!expandArray">
                <span v-text="readable_name"></span> (<span v-text="content.length"></span>) 
                <b v-if="!expandArray">+</b>
                <b v-if="expandArray">-</b>
              </small>
            </div>
            <div class="col-sm-12" v-if="expandArray">
              <div>
                <template v-if="content.length > perPage">
                  <select class="m-auto w-25" v-model="perPage" @change="calculatePages" id="perPage">
                      <option value="" disabled selected>Shown Per Page</option>
                      <option value="10">10 per page</option>
                      <option value="25">25 per page</option>
                      <option value="100">100 per page</option>
                  </select>
                  <div class="flex flex-wrap justify-center p-1 mt-2">
                    <div class="page-item rounded-none" :class="{ 'disabled': page <= 1 }">
                      <a class="page-link p-1" @click.prevent="prevPage()"><i class="fas fa-step-backward"></i></a>
                    </div>
                    <template v-if="groupPages">
                      <div class="page-item rounded-none" v-show="!startCapLimitReached">
                        <a href="#" class="page-link p-1" @click.prevent="previousGroup()">Previous 20</a>
                      </div>
                    </template>
                    <template v-for="n in pages" :key="n+'page'">
                      <div v-if="n >= startCap && n <= endCap" class="page-item rounded-none" :class="{ 'active': page == n, 'bg-main': page == n, 'white-text': page == n  }">
                        <a href="#" class="page-link p-1" @click.prevent="page = n" v-text="n"></a>
                      </div>
                    </template>
                    <template v-if="groupPages">
                      <div class="page-item rounded-none" v-show="!endCapLimitReached">
                        <a href="#" class="page-link p-1" @click.prevent="nextGroup()">Next 20</a>
                      </div>
                    </template>
                    <div class="page-item rounded-none" :class="{ 'disabled': page >= pages }">
                      <a class="page-link p-1" @click.prevent="nextPage()"><i class="fas fa-step-forward"></i></a>
                    </div>
                  </div>
                </template>
              </div>
              <template v-for="(item, i) in arrayResults" :key="i+'fb'">
                <field-box class="m-1" name="" :content="item" isChild="true"></field-box>
              </template>
            </div>
          </div>
        </template>
          <!-- 🌈 String 🌈 -->
          <template v-if="type == 'string'">
            <div class="flex">
              <template v-if="isUrl(content)">
                <div class="text-left">
                  <small :class="theme?.text">
                    <b v-text="readable_name"></b> <i v-if="!readable_name" class="fas fa-circle"></i> <span v-else>:</span>
                  </small>
                </div>
                <div class="ml-1">
                  <a :href="content" target="_blank" rel="nonreferrer">
                    <small><span v-text="content"></span> <i class="fas fa-external-link-alt"></i></small>
                  </a>
                </div>
              </template>
              <template v-else> 
                <div class="flex">
                  <small :class="theme?.text">
                    <b v-text="readable_name?readable_name+' :':''" class="mr-1"></b>
                  </small>
                </div>
                <div class="flex">
                  <a class="ml-1" v-if="isUrl(content)" v-text="content" :href="content" target="_blank" rel="nonreferrer"></a>
                  <template v-else>
                    <small>
                      <i v-if="name == '@type' && content == 'Person' " class="fas fa-user text-muted"></i>
                      <i v-if="name == '@type' && content == 'Organization' " class="fas fa-building text-muted"></i>
                      <i v-if="name == '@type' && content == 'CreativeWork' " class="fas fa-lightbulb text-muted"></i>
                    </small> &nbsp;
                    <small class="text-muted text-left" v-html="content"></small>
                  </template>
                </div>
              </template>
            </div>
          </template>
          <!-- 🌈 Object 🌈 -->
          <template v-if="type == 'object'">
            <div class="flex">
              <div class=" flex justify-start items-center">
                <small :class="theme?.text">
                  <b v-text="readable_name"></b> <i class="fas fa-chevron-circle-right mr-1"></i>
                </small>
              </div>
              <div>
                <template v-for="(value,key) in content" :key="key">
                  <field-box :name="key" :content="value" isChild="true"></field-box>
                </template>
              </div>
            </div>
          </template>
          <!-- 🌈 Boolean 🌈 -->
          <template v-if="type == 'boolean'">
            <div class="flex">
              <div class=" flex justify-start items-center">
                <small :class="theme?.text">
                  <b v-text="readable_name"></b> :&nbsp;
                </small>
              </div>
              <div>
                <small v-if="content === true"><i class="fas fa-check text-success"></i> <span v-text="content"></span></small>
                <small v-else><i class="fas fa-times text-danger"></i> <span v-text="content"></span></small>
              </div>
            </div>
          </template>
          <!-- 🌈 Number 🌈 -->
          <template v-if="type == 'number'">
            <div class="flex">
              <div class=" flex justify-start items-center">
                <small :class="theme?.text">
                  <b v-text="readable_name"></b> :&nbsp;
                </small>
              </div>
              <div>
                <small><span v-text="content"></span></small>
              </div>
            </div>
          </template>
        </div>
</template>

<script>
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
    props: ['name','content','isChild', 'theme'],
    methods:{
        getType(content){
            var self = this;
            if (content) {
               if (content?.constructor === Object) {
                    self.type = 'object'
                }
                else if (content?.constructor === Array) {
                    self.type = 'array'
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
      this.getType(this.content)
      if (this.type == 'array') {
          this.calculatePages();
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