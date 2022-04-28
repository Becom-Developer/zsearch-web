<template>
  <b-container class="mb-5">
    <b-jumbotron
      header="zsearch-web"
      lead="zsearch-web: Search for zip code information"
    >
      <p>郵便番号情報を検索</p>
      <b-btn variant="primary" @click="$router.push('/')">トップへ戻る</b-btn>
    </b-jumbotron>
    <!-- 検索 -->
    <div class="mb-3">
      <b-card header="検索条件入力フォーム" header-tag="header" title="">
        <!-- 郵便番号 -->
        <FormCode />
        <!-- 都道府県 -->
        <FormPref />
        <!-- 市町村 -->
        <FormCity />
        <!-- 以下の住所 -->
        <FormTown />
        <div v-if="isLoading">
          <b-alert class="text-center" variant="light" :show="isLoading">
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
          </b-alert>
        </div>
        <div v-else>
          <b-btn block size="sm" @click="sendForm">検索</b-btn>
          <b-btn block size="sm" @click="clearForm">検索条件をクリア</b-btn>
        </div>
        <!-- 検索状況お知らせ -->
        <div class="text-center">
          <b-alert variant="success" :show="isCompleted">検索実行</b-alert>
          <b-alert variant="warning" :show="hasValidError"
            >検索条件を指定してください</b-alert
          >
          <b-alert variant="danger" :show="hasError"
            >問題が発生しました</b-alert
          >
        </div>
      </b-card>
    </div>
    <!-- 検索結果 -->
    <div class="mb-3">
      <b-card header="検索結果" header-tag="header" title="">
        <!--  検索結果リスト -->
        <ZipcodeList />
        <!--  検索結果詳細 -->
        <ZipcodeDetail v-if="isDetail" />
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isCompleted: false,
      hasError: false,
      hasValidError: false,
      isLoading: false,
      res: {
        zserch: {},
        auth: {},
      },
    }
  },
  computed: {
    ...mapState(['zipcodeDetail', 'items', 'isDetail', 'zipInput']),
  },
  methods: {
    ...mapMutations(['addState', 'buildInput']),
    async sendForm() {
      this.hasValidError = false
      this.isCompleted = false
      this.isLoading = true
      if (
        this.zipInput.code === '' &&
        this.zipInput.pref === '' &&
        this.zipInput.city === '' &&
        this.zipInput.town === ''
      ) {
        this.hasValidError = true
        this.isLoading = false
        this.addState({ stateKey: 'items', data: [] })
        return
      }
      const res = await this.$zsearchapi([
        'search',
        'like',
        {
          code: this.zipInput.code,
          pref: this.zipInput.pref,
          city: this.zipInput.city,
          town: this.zipInput.town,
        },
      ])
      this.addState({ stateKey: 'items', data: [] })
      if ('error' in res) {
        this.hasError = true
      } else {
        this.isCompleted = true
        const items = []
        for (const user of res.result) {
          items.push(user)
        }
        this.addState({ stateKey: 'items', data: items })
      }
      this.isLoading = false
    },
    clearForm() {
      this.hasValidError = false
      this.isCompleted = false
      this.buildInput({ inputKey: 'zipInput', row: { code: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { pref: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { city: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { town: '' } })
    },
  },
}
</script>
