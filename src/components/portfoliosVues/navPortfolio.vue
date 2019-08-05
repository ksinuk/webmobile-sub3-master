<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    fixed
    hide-overlay
    stateless
  >
    <v-toolbar flat class="transparent">
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <!-- eventBus를 활용한 데이터 통신 -->
          <v-btn @click="$EventBus.$emit(item.title)">{{ item.title }}</v-btn>
        </v-list-tile-action>

      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  data () {
    return {
      items: [
        { title: 'Header', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
        { title: 'Portfolio', icon: 'question_answer' },
      ],
      drawer: true,
      mini: true,
    }
  }
}
</script>