<template>
    <v-container>
    <v-layout row wrap class="my-5">
        <v-flex lg8 md8 sm12 mx12 class="px-3">
            <p style="font-size: 2rem; text-align: left;">About Myself</p>
            <p style="text-align: left;">안녕하세요, 저는 황여진입니다.<br/>
            django, vue, firebase를 활용한 웹 개발에 관심이 있습니다.<br/>
            잘 하지는 못 하지만 이번 기회를 통해 더 잘 할 수 있는 사람이 되고 싶습니다. 감사합니다.</p>
        </v-flex>
        <v-flex lg4 md4 sm12 xs12 class="px-3">
            <img height="260vmin;" src="https://firebasestorage.googleapis.com/v0/b/teamportfolio-d978f.appspot.com/o/7g1p192EHnRyUONk0anOuUObSWc2%2Fdeveloper.jpg?alt=media&token=31da2f83-cd23-4102-a238-5ac8c615a144">
        </v-flex>
    </v-layout>
    <div class="container" style="text-align: left;">
        <p style="font-size: 2rem;" class="px-3">What I can do</p>
        <v-layout>
            <v-flex lg sm style="text-align: center;">
                <p style="display: inline;">TDD</p>
            </v-flex>
            <v-flex lg10 sm10>
                <div class="bar learning" data-skill="Level. 2"></div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex lg sm style="text-align: center;">
                <p style="display: inline;">Python</p>
            </v-flex>
            <v-flex lg10 sm10>
                <div class="bar back basic" data-skill="Level. 4"></div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex lg sm style="text-align: center;">
                <p style="display: inline;">C#</p>
            </v-flex>
            <v-flex lg10 sm10>
                <div class="bar back intermediate" data-skill="Level. 6"></div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex lg sm style="text-align: center;">
                <p style="display: inline;">CSS</p>
            </v-flex>
            <v-flex lg10 sm10>
                <div class="bar front advanced" data-skill="Level. 8"></div>
            </v-flex>
        </v-layout>
    </div>
    </v-container>
</template>

<style>
    @keyframes load{
    from {
        width: 0%
    }
    }
    @-webkit-keyframes load{
    from {
        width: 0%
    }
    }
    @-moz-keyframes load{
    from {
        width: 0%
    }
    }
    @-o-keyframes load{
    from {
        width: 0%
    }
    }

    .bar{
    background-color: #EEE;
    padding: 2px;
    border-radius: 15px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #FFF;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    }
    .bar::before{
    content:  attr(data-skill);
    background-color: #f3b0ff;
    display: inline-block;
    padding: 5px 0 5px 10px;
    border-radius: inherit;
    animation: load 2s 0s;
    -webkit-animation: load 2s 0s;
    -moz-animation: load 2s 0s;
    -o-animation: load 2s 0s;
    }

    .bar.front::before{
    background-color: #ffcc33;
    }
    .bar.back::before{
    background-color: #a6cfe3;
    }

    .bar.learning::before{
    width: calc(20% - 10px);
    }
    .bar.basic::before{
    width: calc(40% - 10px);
    }
    .bar.intermediate::before{
    width: calc(60% - 10px);
    }
    .bar.advanced::before{
    width: calc(80% - 10px);
    }
    .bar.expert::before{
    width: calc(100% - 10px);
    }

</style>