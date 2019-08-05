<template>
    <v-navigation-drawer
      v-model="drawer" :mini-variant="mini"
      fixed hide-overlay disable-route-watcher
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
            <v-btn icon @click="drawerHandler(item.title)"><v-icon>{{ item.icon }}</v-icon></v-btn>
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
        { title: 'Header', icon: 'fas fa-home' },
        { title: 'About', icon: 'fas fa-user-edit' },
        { title: 'Portfolio', icon: 'fas fa-file-code' }
      ],
      drawer: true,
      mini: true,
    }
  },
  methods: {
    drawerHandler(location) {
      templateMove(location)
      this.$EventBus.$emit(location)
    }
  }
}

function templateMove(location){
  console.log(location)
  var offset = $("#custom" + location).offset();
  console.log(offset)
  $('html, body').animate({scrollTop : offset.top}, 100);
}
</script>