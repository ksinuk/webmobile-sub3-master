<template>
  <div>
    <BackBanner>
      <div slot="pageName">
        <p style="font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem; text-shadow: 2px 2px 2px #103b5b; color: white;">Search Results</p>
      </div>
    </BackBanner>
    <v-container>
      <!-- 검색 결과가 있을 때 -->
      <div :query="query" v-if="resultList.length !== 0">
        <p style="align: center; font-size: 2rem; font-weight: 300; margin-top: 3rem; margin-bottom: 5rem;">"{{ query }}"의 검색 결과입니다.</p>
        <v-layout class="pb-5">
          <v-flex v-for="result in resultList" lg4 class="px-3 py-3">
            <v-card>
                <v-img
                :src="result.img"
                height="200px"
                >
                </v-img>

                <v-card-title primary-title>
                <div>
                    <div class="headline">{{ result.title }}</div>
                    <div>
                      <tr>
                        <td v-for="hashtag in result.hashtags">
                          <v-chip color="teal" text-color="white">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                            {{ hashtag }}
                          </v-chip>
                        </td>
                      </tr>
                    </div>
                </div>
                </v-card-title>
                <!-- 해당 포트폴리오 페이지로 이동 -->
                <v-card-actions>
                    <v-btn flat color="purple">Explore</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
      <!-- 검색 결과가 없을 때 -->
      <div v-else :query="query" style="height: 50vh;">
        <div>
        <p style="align: center; font-size: 2rem; font-weight: 300; margin-top: 3rem; margin-bottom: 5rem;">"{{ query }}"의 검색 결과가 없습니다.</p>
        </div>
      </div>
    </v-container>
    <newFooter></newFooter>
  </div>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'

// @ is an alias to /src
import BackBanner from '@/components/BackBanner.vue'
import newFooter from '@/components/newFooter.vue'

export default {
  name: 'SearchResult',
  components: {
    BackBanner,
    newFooter
  },
  data() {
    return {
      query: null,
      resultList: []
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    async getItems() {
      // variable routing 통해 넘어온 검색단어를 가져옴
      this.query = this.$route.params.search_value
      var target = this.query
      var tmp = await FirebaseServices.getPortfolios()
      for (let idx in tmp) {
        if (tmp[idx].hashtags.includes(target)) {
          this.resultList.push(tmp[idx])
        }
      }
      console.log(this.resultList)
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