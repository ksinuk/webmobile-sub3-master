<!-- sidebar에서 제공되는 검색 기능 -->
<template>
  <v-container id="sideCtn">
    <v-flex>
      <v-text-field
        label="search"
        single-line
      ></v-text-field>
    </v-flex>

    <div v-for="item in routeItems">
      <v-btn
      flat
      :to="item.path">
        {{ item.name }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'sideBarItems',
  data() {
    return {
      routeItems: []
    }
  },
  created() {
    this.$router.options.routes.forEach(route => {
      this.routeItems.push({
        name: route.name,
        path: route.path
      })
    })
  }
}
</script>

<style scoped>
#sideCtn {
  margin-top: 70px;
}
</style>

