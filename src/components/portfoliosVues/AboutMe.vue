<template>
  <v-container :class="{css1:cssArr[0], xs6:cssArr[0], css2:cssArr[1], xs12:cssArr[1]}">
    <v-btn large flat color="grey" @click="Aboutdrawer = !Aboutdrawer" id="AboutBtn">사이드바</v-btn>
    <div :themeColor="this.$store.state.theme" class="aboutMeBody">
      <!-- about my self -->
      <div class="contentSize aboutMe_about">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">Intro</span>
            <span class="aboutMe_subTitle">About myself.</span>
          </h4>
          <p v-for="item in (userAbout.mySelf || '').split('.')" >{{ item }}</p>
        </v-container>
      </div>

      <!-- about my skill -->
      <div class="contentSize aboutMe_skills">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">skills</span>
            <span class="aboutMe_subTitle">What I can do.</span>
          </h4>
          <ul>
            <li v-for="item in userAbout.mySkill">{{ item }}</li>
          </ul>
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
        <v-img class="aboutMe_image" :src="userAbout.url"
          lazy-src="https://static.wixstatic.com/media/2a925f_a902eb9026754fc4911fb781ac5f885f~mv2.gif"
        ></v-img>
      </div>

    </div>
    <!-- sidebar -->
    <v-navigation-drawer v-model="Aboutdrawer" fixed dark temporary >
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
                  <div v-for="subItem in items.items">
                    <v-btn flat @click="switchCss(items, subItem.value)">{{ subItem.title }}</v-btn>
                  </div>
                </div>
                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>
                <div class="px-1">
                  <p style="font-weight: bold; font-size: 1.2rem; letter-spacing: 0.05rem;">Color</p>
                  <div v-for="items in this.themeItems">
                    <div v-for="subItem in items.items">
                      <v-btn flat @click="switchTheme()">{{ subItem.title }}</v-btn>
                    </div>
                  </div>
                  <ColorPicker/>
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
                  <p style="font-weight: bold; font-size: 1.2rem; letter-spacing: 0.05rem;">Size</p>
                  <div class="px-1">
                    <p style="color: lightgrey; letter-spacing: 0.05rem;">Title</p>
                    <v-slider
                      v-model="titleS" class="px-2"
                      step="1" max="20" min="1"
                      thumb-label ticks
                    ></v-slider>
                    <p style="color: lightgrey; letter-spacing: 0.05rem;">Subtitle</p>
                    <v-slider
                      v-model="subtitleS" class="px-2"
                      step="1" max="10" min="1"
                      thumb-label ticks
                    ></v-slider>
                  </div>
                </div>
                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>
                <div class="px-1">
                  <p style="font-weight: bold; font-size: 1.2rem; letter-spacing: 0.05rem;">Color</p>
                  <div class="px-1">
                    <p style="color: lightgrey; letter-spacing: 0.05rem;">Title</p>
                      
                  </div>
                </div>
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

          <v-expansion-panel-content>
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
          </v-expansion-panel-content>

        </v-expansion-panel>
      </v-list>
    </v-navigation-drawer>
      
  </v-container>
</template>

<script>
// theme 설정을 위해서 store에 저장
import ColorPicker from './ColorPicker'
import store from '../../store'

export default {
  name: '',
  components: {
    ColorPicker
  },
  data() {
    return {
      Aboutdrawer: false,
      cssArr: [true, false],
      themeArr: [true, false, false],
      radioGroup: 1,
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
      ifPortfolioModal:true,
      ifPortfolioGrid:false,
      nowPortfolioColor:1,
      PortfolioListColors: [
        {
          action: 'fas fa-palette',
          title: 'Color',
          items: [
            { title: 'White', value: 1, selected: true},
            { title: 'Black', value: 2, selected: false},
            { title: 'Blue' , value: 3, selected: false},
          ]
        },
      ],
      // firebase insert
      userAbout: {
        url: 'https://www.opticalexpress.co.uk/media/1065/lady-with-glasses-smiling.jpg',
        // myIntro
        mySelf: '싸피 수강생 서지훈입니다. 저는 아카데믹한 수단으로 지식을 쌓는 대신, 본인의 실제적인 필요에 의해 웹사이트를 제작하면서 다년간 다양한 기술을 터득해 왔습니다. 스스로 생산자이자 동시에 소비자로서 쌓아올린 경험은, 클라이언트에게 보다 섬세하고 직접적이며, 실용적인 서비스를 제공할 것입니다',
        // mySkills
        mySkill: {
          css: ['css3'],
          html: ['html5'],
          js: ['vanilla']
        }
      },
      titleS: null,
      subtitleS: null
    }
  },
  watch: {
    titleS: function() {
      document.getElementsByClassName('aboutMe_subTitle').style.fontSize = this.titleS + 'rem';
    },
    subtitleS: function() {
      document.getElementById('portSubtitle').style.fontSize = this.subtitleS + 'rem';
    }
  },
  methods: {
    switchTheme(theme) {
      console.log(theme)
      store.commit('changeTheme', theme)
    },
    switchPortfolio(theme,out) {
      console.log("switchPortfolio: ",theme,',',out)
        if(theme == 'Modal'){
            this.ifPortfolioModal = !this.ifPortfolioModal
        }
        else if(theme == 'Grid'){
           this.ifPortfolioGrid = !this.ifPortfolioGrid
        }
        else if(theme == 'Color'){
           let idx = this.nowPortfolioColor-1
           this.PortfolioListColors[0].items[idx].selected = false
           this.PortfolioListColors[0].items[out-1].selected = true
           this.nowPortfolioColor = out
           console.log("idx: ",this.PortfolioListColors[0].items[idx])
           console.log("out: ",this.PortfolioListColors[0].items[out-1])
        }
    },
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
      n.selected = true
      console.log(n, m)
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
// sidebar button
#AboutBtn {
  display: fixed;
  left: 650px;
  top: 500px;
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
</style>
