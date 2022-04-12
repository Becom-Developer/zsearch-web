<template>
  <b-container>
    <b-jumbotron
      header="zsearch-web"
      lead="zsearch-web: Search for zip code information"
    >
      <p>郵便番号情報を検索</p>
      <b-btn variant="primary" @click="$router.push('/')">トップへ戻る</b-btn>
    </b-jumbotron>
    <div>
      <b-btn variant="primary" @click="clickTestZsearch">テスト Zsearch</b-btn>
      <p>{{ res }}</p>
      <b-btn variant="primary" @click="clickTestAuth">テスト Auth</b-btn>
      <p>{{ res }}</p>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      res: {
        zserch: {},
        auth: {},
      },
    }
  },
  methods: {
    async clickTestZsearch() {
      const res = await this.$zsearchapi(['', '', {}])
      this.res.zserch = res
    },
    async clickTestAuth() {
      const res = await this.$authapi(['', '', {}])
      this.res.auth = res
    },
  },
}
</script>
