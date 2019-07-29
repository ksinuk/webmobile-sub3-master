<template>
  <v-container>

    <v-data-table
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.displayName }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.emailVerified }}</td>
        <td class="text-xs-right">{{ props.item.disabled }}</td>
        <td class="text-xs-right">{{ props.item.metadata.lastSignInTime }}</td>
        <td class="text-xs-right">{{ props.item.metadata.creationTime }}</td>
        <td><button @click="postCall(props.item.uid)">postCall</button></td>
      </template>
    </v-data-table>

    <v-btn @click="searchItem()">불러오기</v-btn>

  </v-container>
</template>

<script>
export default {
  name: 'adminuser',
  components: {
  },
  data () {
    return {
      headers: [
        {
          text: 'UserName',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { 
          text: 'Email',
          sortable: false,
          value: 'calories'
        },
        {
          text: 'EmailVerified',
          sortable: false,
          value: 'fat'
        },
        { 
          text: 'Disabled',
          sortable: false,
          value: 'carbs'
        },
        { 
          text: 'lastSign',
          sortable: false,
          value: 'protein'
        },
        { 
          text: 'creation',
          sortable: false,
          value: 'iron'
        },
        { 
          text: 'apiCall',
          sortable: false,
          value: 'iron'
        }
      ],
      users: []
    }
  },
  methods: {
    searchItem: function() {
      this.$http.get("http://localhost:3000/api/users")
        .then((result) => {
          this.users = result.data
        })
    },
    postCall: function(uid) {
      this.$http.post("http://localhost:3000/api/users", { user: uid })
        .then((result) => {
          console.log(result)
        })
    }
  }
}
</script>

<style scoped>
  
</style>

