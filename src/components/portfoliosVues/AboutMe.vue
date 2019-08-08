<template>
  <v-container :class="{css1:cssArr[0], xs6:cssArr[0], css2:cssArr[1], xs12:cssArr[1]}">
    <div :themeColor="this.$store.state.theme" class="aboutMeBody">
      <!-- about my self -->
      <div class="contentSize aboutMe_about">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">Intro</span>
            <span id="aboutTitle1" class="aboutMe_subTitle">About myself.</span>
          </h4>
          <div id="aboutSubtitle1">
            <p v-for="item in (portfolio.aboutMe || '').split('.')" >{{ item }}</p>
          </div>
        </v-container>
      </div>

      <!-- about my skill -->
      <div class="contentSize aboutMe_skills">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">skills</span>
            <span id="aboutTitle2" class="aboutMe_subTitle">What I can do.</span>
          </h4>
          <div id="aboutSubtitle2" v-for="item in portfolio.tmp">
              <p style="display: inline;">{{ item.name }}</p>
              <div :id="item.name" class="bar back" :data-skill="item.degree"></div>
          </div>
        </v-container>
      </div>

      <!-- about profile image -->
      <div class="contentSize aboutMe_images">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">skills</span>
            <span class="aboutMe_subTitle">profile</span>
          </h4>
        </v-container>
        <v-img class="aboutMe_image" :src="portfolio.userImage"
          lazy-src="https://static.wixstatic.com/media/2a925f_a902eb9026754fc4911fb781ac5f885f~mv2.gif"
        ></v-img>
      </div>

    </div>
    <!-- sidebar -->
    <v-navigation-drawer v-model="aboutDrawer" fixed temporary disable-route-watcher>
      <v-list class="pt-0" dense>
        <v-expansion-panel>

          <!-- layout selector -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-image pr-3"></i>Layout</div>
            </template>
            <v-card>
              <v-card-text>
                <div v-for="items in this.layoutItems">
                  <!-- swtich btn -->
                  <v-radio-group row v-model="subItem.selected" v-for="subItem in items.items">
                    <v-radio :label="subItem.title" :value="subItem.value" @change="switchCss(items, subItem.value)"></v-radio>
                  </v-radio-group>

                </div>
                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>
                <div class="px-1">
                  <p style="font-weight: bold; font-size: 1.2rem; letter-spacing: 0.05rem;">Theme</p>
                  <div v-for="items in this.themeItems">
                    <v-radio-group row v-model="subItem.selected" v-for="subItem in items.items">
                      <v-radio :label="subItem.title" :value="subItem.value" @change="switchTheme(items, subItem.value)"></v-radio>
                    </v-radio-group>
                  </div>
                </div>
                <div style="text-align: center;">
                  <v-btn small color="primary" @click="">Apply</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <!-- font selector -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-font pr-3"></i>Font</div>
            </template>
            <v-card>
              <v-card-text>
                <div class="px-1">
                  <v-radio-group v-model="aboutChoice" row>
                    <v-radio label="Title" value="title" color="primary"></v-radio>
                    <v-radio label="Subtitle" value="subtitle" color="primary"></v-radio>
                  </v-radio-group>
                  <div class="px-1">
                    <p style="color: lightgrey; letter-spacing: 0.05rem;">Size</p>
                    <!-- title 선택했을 때 -->
                    <v-slider
                      v-if="aboutChoice === 'title'" v-model="aboutTitleS"
                      step="1" max="20" min="1" thumb-label ticks
                      class="px-2"
                    ></v-slider>
                    <!-- subtitle 선택했을 때 -->
                    <v-slider
                      v-else-if="aboutChoice === 'subtitle'" v-model="aboutSubtitleS"
                      step="1" max="10" min="1" thumb-label ticks
                      class="px-2"
                    ></v-slider>
                  </div>
                </div>

                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>

                <!-- color picker -->
                <ColorPicker v-bind:aboutChoice="aboutChoice"/>

                <div style="text-align: center;">
                  <v-btn small color="primary" @click="saveSize()">Apply</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <!-- animation selector -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-image pr-3"></i>Animation</div>
            </template>
            <v-card>
              <v-card-text>
                <div>
                  <div>
                    <button>애니메이션 1</button>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <!-- text ditor -->
          <v-expansion-panel-content>
            <template v-slot:header>
                <div @click="dialog = true"><i class="fas fa-keyboard pr-3"></i>Contents</div>
            </template>
            <template v-slot:actions>
                  <v-icon color="teal"> </v-icon>
            </template>
          </v-expansion-panel-content>

          <!-- <v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-image pr-3"></i>PortfolioList</div>
            </template>
            <v-card>
              <v-card-text>
                <div style="position: relative;">
                  <v-btn flat @click="switchPortfolio('Modal',true)">Modal</v-btn>
                  <div v-if="ifPortfolioModal" class="isok"></div>
                </div>
                <div style="position: relative;">
                  <v-btn flat @click="switchPortfolio('Grid',true)">Grid</v-btn>
                  <div v-if="ifPortfolioGrid" class="isok"></div>
                </div>
                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>
                <div class="px-1">
                  <p style="font-weight: bold; font-size: 1.2rem; letter-spacing: 0.05rem;">Color</p>
                  <div v-for="items in this.PortfolioListColors">
                    <div v-for="subItem in items.items" style="position: relative;">
                      <v-btn flat @click="switchPortfolio('Color',subItem.value)">{{ subItem.title }}</v-btn>
                      <div v-if="subItem.selected" class="isok"></div>
                    </div>
                  </div>
                </div>
                <div style="text-align: center;">
                  <v-btn small color="primary" @click="">Apply</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content> -->

        </v-expansion-panel>
      </v-list>
    </v-navigation-drawer>
    <!-- text editor -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
            <span class="headline">ABOUT</span>
        </v-card-title>
        <v-card-text>
            <v-text-field v-model="portfolio.aboutMe" label="About My Self" rows=15></v-text-field>
            <v-card v-for="item in portfolio.skills" class="mb-3">
              <v-card-text>
                <v-layout>
                  <v-flex lg3 class="px-3">
                    <v-text-field
                      label="skill"
                      v-model="item.name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex lg9 class="px-3">
                    <v-subheader>level</v-subheader>
                    <v-slider
                      v-model="item.degree"
                      step="1"
                      max=10
                      thumb-label
                      ticks
                    ></v-slider>
                  </v-flex>
                </v-layout>
                <v-textarea
                  name="input-7-1"
                  label="description"
                  v-model="item.description"
                  class="px-3"
                ></v-textarea>
              </v-card-text>
            </v-card>
            <v-card>
            <v-card-text>
              <v-layout>
                <v-flex lg3 class="px-3">
                  <v-text-field
                    label="skill"
                    v-model="skill.name"
                  ></v-text-field>
                </v-flex>
                <v-flex lg9 class="px-3">
                  <v-subheader>level</v-subheader>
                  <v-slider
                    v-model="skill.degree"
                    step="1"
                    max=10
                    thumb-label
                    ticks
                  ></v-slider>
                </v-flex>
              </v-layout>
              <v-textarea
                name="input-7-1"
                label="description"
                v-model="skill.description"
                hint="해당 기술 수준을 설명해주세요."
                class="px-3"
              ></v-textarea>
            </v-card-text>
          </v-card>
          <div class="text-xs-center py-3">
            <v-btn color="teal" fab small dark @click="addSkill()">
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false; saveMe();">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'
import firebase from 'firebase/app'

// theme 설정을 위해서 store에 저장
import ColorPicker from './AboutColorPicker'
import store from '../../store'

export default {
  name: '',
  components: {
    ColorPicker
  },
  data() {
    return {
      user: null,
      aboutLayout: 'css1',
      aboutDrawer: false,
      dialog: false,
      // css
      cssArr: [true, false],
      themeArr: [true, false, false],
      // modal
      layoutItems: [
        {
          action: 'fas fa-drafting-compass',
          title: 'Layout',
          items: [
            { title: 'layout1', value: 1, selected: true},
            { title: 'layout2', value: 2, selected: false}
          ]
        },
      ],
      themeItems: [
        {
          action: 'fas fa-palette',
          title: 'Color',
          items: [
            { title: 'default', value: 1, selected: true},
            { title: 'mint', value: 2, selected: false},
            { title: 'simple_cookie', value: 3, selected: false},
          ]
        },
      ],
      fontItems: [
        {
          action: '',
          title: 'font',
          items: [
            { title: 'Title', value: 10},
            { title: 'Subtitle', value: 10}
          ]
        }
      ],
      // ifPortfolioModal:true,
      // ifPortfolioGrid:false,
      // nowPortfolioColor:1,
      // PortfolioListColors: [
      //   {
      //     action: 'fas fa-palette',
      //     title: 'Color',
      //     items: [
      //       { title: 'White', value: 1, selected: true},
      //       { title: 'Black', value: 2, selected: false},
      //       { title: 'Blue' , value: 3, selected: false},
      //     ]
      //   },
      // ],
      // firebase insert
      // userAbout: {
      //   url: 'https://www.opticalexpress.co.uk/media/1065/lady-with-glasses-smiling.jpg',
      //   // myIntro
      //   mySelf: null,
      //   // mySkills
      //   mySkill: []
      // },
      userImage: 'https://www.opticalexpress.co.uk/media/1065/lady-with-glasses-smiling.jpg',
      skill: {
        name: null,
        degree: null,
        description: null
      },
      // font
      aboutChoice: 'title',
      aboutTitleS: '1',
      aboutSubtitleS: '1',
      portfolio: []
    }
  },
  watch: {
    // fontSize watch
    aboutTitleS: function() {
      document.getElementById('aboutTitle1').style.fontSize = this.aboutTitleS + 'rem';
      document.getElementById('aboutTitle2').style.fontSize = this.aboutTitleS + 'rem';
    },
    aboutSubtitleS: function() {
      document.getElementById('aboutSubtitle1').style.fontSize = this.aboutSubtitleS + 'rem';
      document.getElementById('aboutSubtitle2').style.fontSize = this.aboutSubtitleS + 'rem';
    }
  },
  mounted() {
    this.getAbout();
    this.$EventBus.$on('About', () => {
      this.aboutDrawer = !this.aboutDrawer
    })
  },
  methods: {
    // firebase db 가져오기
    getAbout: function() {
      let __this = this;
      const tmp = firebase.auth().onAuthStateChanged(function(user) {
        __this.user = user.uid;
        console.log(__this.user);
        FirebaseServices.getMyPort(__this.user).then(function(res) {
          __this.portfolio = res;
          __this.portfolio.tmp = []
          res.skills.forEach(function(skill) {
            __this.portfolio.tmp.push(JSON.parse(JSON.stringify(skill)));
            skill.degree = skill.degree.substring(7, skill.degree.length);
          })
          // res.skills.forEach(function(skill) {
          //   let tmp = skill.degree.substring(7, skill.degree.length) + "0% - 10px";
          //   console.log(document.getElementById(skill.name));
          //   document.getElementById(skill.name).style.width = calc(tmp);
          //   console.log(document.getElementById(skill.name).style);
          // })
        })
      })
    },
    switchTheme(item, num) {
      for (let i=0; i < this.themeArr.length; i++) {
        if (num == (i+1)) {
          item.items[i].selected = true
          store.commit('changeTheme', item.items[i].title)
        } else {
          item.items[i].selected = false
        }
      }
    },
    // switchPortfolio(theme,out) {
    //     if(theme == 'Modal'){
    //         this.ifPortfolioModal = !this.ifPortfolioModal
    //     }
    //     else if(theme == 'Grid'){
    //         this.ifPortfolioGrid = !this.ifPortfolioGrid
    //     }
    //     else if(theme == 'Color'){
    //         let idx = this.nowPortfolioColor-1
    //         this.PortfolioListColors[0].items[idx].selected = false
    //         this.PortfolioListColors[0].items[out-1].selected = true
    //         this.nowPortfolioColor = out
    //     }
    // },
    // CSS 변환시 배열 교체용
    switchCss(item, num) {
      let boolArr = []
      for (let i=0; i < this.cssArr.length; i++) {
        if (num == (i+1)) {
          boolArr.push(true)
          item.items[i].selected = true
        } else {
          boolArr.push(false)
          item.items[i].selected = false
        }
      }
      this.cssArr = boolArr
    },
    checkLog(n, m) {
      console.log(n, m)
    },
    addSkill: function() {
      // 깊은 복사
      if (this.skill.name !== null && this.skill.degree !== null && this.skill.description !== null) {
        this.portfolio.skills.push(JSON.parse(JSON.stringify(this.skill)))
        this.skill = 'Level. ' + this.skill
        this.portfolio.tmp.push(JSON.parse(JSON.stringify(this.skill)))
        this.skill.name = null
        this.skill.degree = null
        this.skill.description = null
      } else {
        alert("모두 작성하지 않은 skill은 저장되지 않습니다.");
      }
    },
    async saveMe() {
      if (this.skill.name !== null && this.skill.degree !== null && this.skill.description !== null) {
        this.portfolio.skills.push(JSON.parse(JSON.stringify(this.skill)))
        this.skill.degree = 'Level. ' + this.skill.degree
        this.portfolio.tmp.push(JSON.parse(JSON.stringify(this.skill)))
      }
      const result = await FirebaseServices.postPortfolios(this.user, this.portfolio.aboutMe, this.portfolio.layout, this.portfolio.banner, this.portfolio.portfolios, this.portfolio.tmp, this.portfolio.subtitle, this.portfolio.title, this.portfolio.userImage);
    }
  }
}
</script>

<style lang="scss" scoped>
// layout selector
.css1{
  @import "./scss/aboutMe_1.scss";
}
.css2{
  @import "./scss/aboutMe_2.scss";
}
.isok{
  position:absolute;
  top:50%;
  right:20%;
  transform: translateY(-50%);
  margin:auto 20px;
  background-color: green;
  border-radius: 10px;
  height:20px;
  width:20px;
}

// skill graph code
@keyframes load{
  from {
      width: 0%
  }
  }
  @-webkit-keyframes load{
  from {
      width: 0%
  }
  }
  @-moz-keyframes load{
  from {
      width: 0%
  }
  }
  @-o-keyframes load{
  from {
      width: 0%
  }
  }

  .bar{
  background-color: #EEE;
  padding: 2px;
  border-radius: 15px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #FFF;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  }
  .bar::before{
  content:  attr(data-skill);
  background-color: #f3b0ff;
  display: inline-block;
  padding: 5px 0 5px 10px;
  border-radius: inherit;
  animation: load 2s 0s;
  -webkit-animation: load 2s 0s;
  -moz-animation: load 2s 0s;
  -o-animation: load 2s 0s;
  }

  .bar.front::before{
  background-color: #ffcc33;
  }
  .bar.back::before{
  background-color: #a6cfe3;
  }
</style>
