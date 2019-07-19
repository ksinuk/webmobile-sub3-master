<template>
<div>
    <h2>{{title}}</h2>
    <p>작성자 : {{man}}</p>
    <p>작성시간 : {{time}}</p>
    <p>방문수 : {{cnt}}</p>
    <p>추천수 : {{boomup}}</p>
    <hr>
    {{text}}
</div>
</template>

<script>
export default {
	name: 'ReadBoard',
	props: {
	},
    data: function(){return{
        title:'제목이다.',
        text:'this is text',
        boomup:10,
        man:'iami',
        cnt:100,
        time:'1970-01-01-00:00'
    }},
	methods: {
    },
    watch:{
    }
}
</script>
<style>
</style>

