<template>
  <v-stepper non-linear v-model="e6" vertical style="padding-top: 3rem; padding-bottom: 5rem; padding-left: 10rem; padding-right: 10rem; background-color: #fafafa">
    <!--<v-stepper-step editable :complete="e6 > 3" step="1">-->
    <v-stepper-step editable step="1">
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
      <div class="text-xs-center py-3">
        <v-btn color="teal" fab small dark @click="addSkill()">
          <v-icon>add</v-icon>
        </v-btn>
      </div>
      <v-btn color="primary" @click="e6 = 2; addSkill()">Continue</v-btn>
      <v-btn flat @click="e6 = 1">Cancel</v-btn>
    </v-stepper-content>

    <!-- 2. portfolio 추가 -->
    <v-stepper-step editable step="2">
      PORTFOLIOS
      <small>수행한 포트폴리오를 정리하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="mb-3">
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="title"
              :counter="20"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
            label="Description"
            v-model="description"
            hint="프로젝트를 설명해주세요."
            rows=10
          ></v-textarea>
            <v-text-field
              v-model="viewport"
              label="Viewport"
            ></v-text-field>
            <v-text-field
              v-model="ie"
              label="IE Support"
            ></v-text-field>
            <v-text-field
              v-model="demo"
              label="Demo Link"
            ></v-text-field>
            <v-text-field
              v-model="repository"
              label="Repo Link"
            ></v-text-field>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Category</th>
                  <th class="text-left">File Name</th>
                  <th class="text-left">Git Path</th>
                  <th class="texdt-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <v-select
                      v-model="category"
                      :items="items"
                      label="Category"
                      solo
                      required
                    ></v-select>
                  </td>
                  <td>
                    <v-text-field
                      v-model="fileName"
                      label="File Name"
                      solo
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      v-model="gitPath"
                      label="Git Path"
                      solo
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      v-model="fileDes"
                      label="Description"
                      solo
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-btn color="teal" fab small dark @click="">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <template>
              <v-file-input label="File input"></v-file-input>
            </template>
            <!--<v-file-input
              v-model="files"
              label="Image File Uploader"
              color="primary accent-4"
              accept="image/png, image/jpeg, image/bmp"
              counter
              multiple
              placeholder="Input your portfolio images"
              prepend-icon="mdi-paperclip"
              outlined
              :display-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="primary accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>-->
          </v-form>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
      <v-btn flat @click="e6 = 1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step editable step="3">
      TEMPLATE
      <small>적용할 디자인을 선택하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat @click="e6 = 2">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step editable step="4">PREVIEW</v-stepper-step>
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
      title: null,
      description: null,
      viewport: null,
      ie: null,
      demo: null,
      repository: null,
      category: null,
      fileName: null,
      gitPath: null,
      fileDes: null,
      select: null,
      items: ['html', 'css', 'js', 'json', 'c', 'c++', 'java', 'python'],
      files: []
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