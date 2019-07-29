<template>
    <v-layout row wrap>
        <v-flex>
            <!-- 0729 err fix -->
            <carousel :per-page="pageNum">
                <slide v-for="number in images.length" class="px-2">
                    <v-card>
                        <v-img
                        :src="images[number]"
                        height="200px"
                        >
                        </v-img>

                        <v-card-title primary-title>
                        <div>
                            <div class="headline">Portfolio names</div>
                            <span class="grey--text">Portfolio category</span>
                        </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat>Like</v-btn>
                            <v-btn flat color="purple">Explore</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </slide>
            </carousel>
        </v-flex>
    </v-layout>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';

    export default {
        name: 'RankList',
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                pageNum: 4,
                images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
            }
        }
    }
</script>


