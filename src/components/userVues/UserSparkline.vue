<template>
  
</template>

<script>
export default {
  data() {
    return {
      userData: [],
      
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // this.userData.visit.sort()

      let i = 0
      if (this.userData.visit.length < 7) {
        i = 0
      } else {
        i = this.userData.visit.length - 7
      }
      for (i; i < this.userData.visit.length; i++) {
        this.labels.push(this.userData.visit[i].split('.')[0].substring(4, 8))
        this.value.push(Number(this.userData.visit[i].split('.')[1]))
      }
    }
  }
}
</script>

<style scoped>
  
</style>

