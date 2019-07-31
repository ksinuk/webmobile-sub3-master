<template>
    <v-container>
        <v-layout>
            <v-flex style="text-align: center;">
                <p style="font-size: 2rem;">Portfolio</p>
            </v-flex>
        </v-layout>
        <v-layout class="mb-5">
            <v-card
                class="mx-auto"
                min-height="100vmin"
            >
                <v-tabs
                v-model="active"
                >
                <v-tab
                    v-for="n in 3"
                    :key="n"
                    fixed-tabs
                    ripple
                >
                    Item {{ n }}

                </v-tab>
                <v-tab-item
                    v-for="n in 3"
                    :key="n"
                >
                    <v-card-text>{{ text }}</v-card-text>
                </v-tab-item>
                </v-tabs>
            </v-card>
        </v-layout>
    </v-container>
</template>