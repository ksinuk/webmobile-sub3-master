<template>
    <div>
        <div class="test"/>
        <PortfolioTemplateList/>
    </div>
</template>

<script>
import ImgBanner from '../components/ImageBanner.vue'
import PortfolioTemplateList from '../components/PortfolioListTemplate.vue'

export default {
    name: 'TestPage',
    components: {
        ImgBanner,
        PortfolioTemplateList
    }
}
</script>

<style>
    .test{
        height:100px;
        width:500px;
    }

</style>
