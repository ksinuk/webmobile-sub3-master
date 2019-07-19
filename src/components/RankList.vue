<template>
    <v-layout row wrap>
        <v-flex>
            <carousel per-page="4">
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
                images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
            }
        }
    }
</script>


