<template>
  
</template>

<script>
// @ is an alias to /src


import Loading from 'vue-loading-overlay';
   // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'home',
  components: {
  },
  mounted(){
    this.doAjax();
  },
  data() {
          return {
              isLoading: false,
              fullPage: true
          }
      },

      methods: {
          doAjax() {
              this.isLoading = true;
              // simulate AJAX
              setTimeout(() => {
                this.isLoading = false
              },1000)
          },
          onCancel() {
            console.log('User cancelled the loader.')
          }
      }
}
</script>

<style scoped>
.small-heading {
  color: #bfbfbf;
  font-weight: 600;
}
.headline {
  font-weight: 600;
}
#introAbout {
  padding-top: 80px;
  padding-bottom: 100px;
}
</style>
