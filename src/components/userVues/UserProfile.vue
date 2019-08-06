<template>
  <v-container>
    <v-flex xs12>
      <v-card>
        <v-layout row>
          <v-flex>
            <v-layout my-3>
              <v-flex>
                <v-card flat color="transparent">
                  <v-avatar tile size="256" class="profileImg">
                    <img :src="photoURL ? photoURL:this.$store.state.imgSrc.noImgSrc" alt="avatar">
                  </v-avatar>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">Halycon Days</div>
                <div>Ellie Goulding</div>
                <div>(2013)</div>
              </div>
            </v-card-title>
          </v-flex>
          
        </v-layout>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfile',
  components: {

  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>