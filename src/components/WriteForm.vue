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
      <v-card v-if="skills.length === 0">

      </v-card>
      <v-card class="mb-3" v-for="(skill, index) in skills">
        <v-card-text v-if="index === skills.length || skills.length === 0">
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
        <v-card-text v-else>
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
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      PORTFOLIOS
      <small>수행한 포트폴리오를 정리하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      TEMPLATE
      <small>적용할 디자인을 선택하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">PREVIEW</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
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
      skills: []
    }
  },
  methods: {
    addSkill: function() {
      this.skills.push(this.skill)
      this.skill.name = null
      this.skill.degree = null
      this.skill.description = null
      console.log(this.skills)
    }
  }
}
</script>
\