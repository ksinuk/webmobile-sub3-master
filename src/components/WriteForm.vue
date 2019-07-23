<template>
  <v-stepper v-model="e6" vertical style="padding-top: 3rem; padding-bottom: 5rem; padding-left: 10rem; padding-right: 10rem; background-color: #fafafa">
    <v-stepper-step :complete="e6 > 1" step="1">
      ABOUT
      <small>자기 소개와 Skill을 작성하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="1" class="px-5">
      <v-card class="mb-3">
        <v-card-text>
          <v-textarea
            name="input-7-1"
            label="about my self"
            v-model="aboutMe"
            hint="자기 자신을 소개하는 텍스트를 상세히 작성해주세요."
            rows=15
          ></v-textarea>
        </v-card-text>
      </v-card>
      <v-card class="mb-3" v-for="item in skills">
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
            hint="해당 기술 수준을 설명해주세요."
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
      <div class="text-xs-center pb-3">
        <v-btn color="teal" fab small dark @click="addSkill()">
          <v-icon>add</v-icon>
        </v-btn>
      </div>
      <v-btn color="primary" @click="e6 = 2; addSkill()">Continue</v-btn>
      <v-btn flat @click="e6 = 1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      PORTFOLIOS
      <small>수행한 포트폴리오를 정리하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card>
        <v-card-text>
          <table>
            <tbody>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input type="text" name="name" id="name" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">Viewport</th>
                <td>
                  <input type="text" name="etc_2" id="etc_2" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">IE support</th>
                <td>
                  <input type="text" name="email" id="email" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">프로젝트 설명</th>
                <td>
                  <input type="text" name="email" id="project" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">Demo 링크</th>
                <td>
                  <input type="text" name="email" id="demo" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">Repo 링크</th>
                <td>
                  <input type="text" name="email" id="repo" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">카테고리</th>
                <td>
                  <input type="text" name="email" id="repo" value="">
                </td>
              </tr>
              <tr>
                <th scope="row">소스코드</th>
                <td>
                  <select name="subject" id="source" style="width:15%; margin-right:20px; float:left;">
                    <option value="">선택하세요!</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>

                  </select>
                  <input type="text" name="etc_2" id="source_1" value="" style="width:15%; margin-right:20px; float:left;" placeholder="파일명">
                  <input type="text" name="etc_2" id="source_2" value="" style="width:15%; float:left; margin-right:20px;" placeholder="git주소">
                  <input type="text" name="etc_2" id="source_3" value="" style="width:30%; float:left; margin-right:20px;" placeholder="파일설명">
                  <v-btn color="success"  style="width:15%; float:left" v-on:click="sourceClick" >확인</v-btn>
                </td>
              </tr>
              <div id ="input_source">
                <tr>
                    <td style="padding-left: 10rem; padding-bottom: 0; padding-top: 0; border-top:none;"></td>
                    <td style="border-top:none;">
                    <template v-for="(html,index) in category_html" >
                        <template v-if="html !==null">
                        <v-chip close color="teal" text-color="white" v-model="category_html[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                          HTML 파일명: {{ html.file }}, URL : {{html.url}}, 설명 : {{html.keyword}}

                        </v-chip>
                      </template>
                    </template>
                    <template v-for="(css,index) in category_css" >
                        <template v-if="css !==null">
                        <v-chip close color="teal" text-color="white" v-model="category_css[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                              CSS  파일명: {{ html.file }}, URL : {{html.url}}, 설명 : {{html.keyword}}
                        </v-chip>
                      </template>
                    </template>
                    <template v-for="(js,index) in category_js" >
                        <template v-if="css !==null">
                        <v-chip close color="teal" text-color="white" v-model="category_js[index]" style="">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                              JavaScript  파일명: {{ html.file }}, URL : {{html.url}}, 설명 : {{html.keyword}}
                        </v-chip>
                      </template>
                    </template>
                  </td>
                </tr>
              </div>
              <tr>
                <th>포트폴리오이미지</th>
                <td>
                  <div class="fileWrap">
                    <div class="filebox bs3-primary preview-image">
                      <label for="input_file">파일찾기</label>
                      <input class="upload-name" v-model="fileName" placeholder="선택된 파일 없음">
                      <input type="file" name="upfiles[]" id="input_file" class="upload-hidden" @change="processFile($event)">
                    </div>
                  </div>
                  <span></span>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
      <v-btn flat @click="e6 = 1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      TEMPLATE
      <small>적용할 디자인을 선택하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat @click="e6 = 2">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">PREVIEW</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="savePort()">Save</v-btn>
      <v-btn flat @click="e6 = 3">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>

export default {
  name: 'WriteForm',
  data() {
    return {
      e6: 1,
      aboutMe: null,
      skill: {
        name: null,
        degree: null,
        description: null
      },
      skills: [],
      category_css: [],
      category_html: [],
      category_js: []
    }
  },
  methods: {
    addSkill: function() {
      // 깊은 복사
      this.skills.push(JSON.parse(JSON.stringify(this.skill)))
      this.skill.name = null
      this.skill.degree = null
      this.skill.description = null
      console.log(this.skills)
    },
    savePort: function() {
      // firebase에 포트폴리오 정보 최종 저장
      return
    },
    sourceClick(){
      let temp = $('#source option:selected').val();
      let filename = $("#source_1").val();
      let gitsource = $("#source_2").val();
      let keyword = $("#source_3").val();
      if(temp=="CSS"){

          let aJson = new Object();
          aJson.file=filename;
          aJson.keyword=keyword;
          aJson.url=gitsource;
          this.category_css.push(aJson);

      }
      else if(temp=="HTML"){
        let aJson = new Object();
        aJson.file=filename;
        aJson.keyword=keyword;
        aJson.url=gitsource;
        this.category_html.push(aJson);
      }
      else if(temp=="JavaScript"){
        let aJson = new Object();
        aJson.file=filename;
        aJson.keyword=keyword;
        aJson.url=gitsource;
        this.category_js.push(aJson);
      }
      $("#source").val("").prop("selected", true);
      $("#source_1").val("");
      $("#source_2").val("");
      $("#source_3").val("");
    }
  }
}
</script>
\