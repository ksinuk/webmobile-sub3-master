<template lang="html">
<v-flex xs12 sm12 md12 lg12 xl2>
  <tiny-slider :mouse-drag="false" loop="true" items="1" gutter="20" autoplay="true" autoplayTimeout="3000" >
    <img  src="@/assets/chicks-4107838_960_720.png" alt="">
    <img  src="@/assets/fefefe.png" alt="">
  <img  src="@/assets/istockphoto-814326134-1024x1024.jpg" alt="">

  </tiny-slider>
</v-flex>
</template>

<script>

import VueTinySlider from 'vue-tiny-slider';
import 'tiny-slider/src/tiny-slider';
export default {
  name: 'slider',
  components: {
    'tiny-slider': VueTinySlider
  }
}
</script>

<style lang="css">
.tns-outer button {
  display: none;
}


</style>
