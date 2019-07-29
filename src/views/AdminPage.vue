<template>
  <div>
    <v-container>
        <h1>admin page</h1>
        <div v-for="user in users">
          <p>uid : {{ user.uid }}, email : {{ user.email }}</p>
        </div>
        <button @click="searchItem()">불러오기</button>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'adminpage',
  components: {
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
    searchItem: function() {
      this.$http.get("http://localhost:3000/api/users")
        .then((result) => {
          this.users = result.data
        })
    }
  }
}
</script>

<style scoped>
  
</style>

