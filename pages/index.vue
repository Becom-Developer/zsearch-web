<template>
  <b-container class="mb-5">
    <!-- アプリの説明 -->
    <div>
      <b-dropdown
        text="住所検索の使い方"
        block
        variant="info"
        class="my-2"
        menu-class="w-100"
        size="lg"
      >
        <b-dropdown-text style="">
          郵便番号や住所の一部分から該当する郵便番号と住所を検索することができます。
        </b-dropdown-text>
        <b-dropdown-text style="">
          例えば「以下の住所」に「吉」と入力して検索すると全国の住所から該当するものが一覧表示されます。
        </b-dropdown-text>
        <b-dropdown-text style="">
          続けて「都道府県」から「福岡県」を選択すると「福岡県」かつ「吉」の付く住所を絞り込み検索します。
        </b-dropdown-text>
        <b-dropdown-text style="">
          利用にあたりログインや利用料は必要ありません。
        </b-dropdown-text>
        <b-dropdown-text style="">
          ソフトウェア開発者向けにjson形式でwebapi配信も行なっております。
        </b-dropdown-text>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/developers">開発者の方はこちら</b-dropdown-item>
        <b-dropdown-item :href="reloadURL">強制的に再読み込み</b-dropdown-item>
        <!-- <b-dropdown-item-button>開発者の方はこちら</b-dropdown-item-button> -->
      </b-dropdown>
    </div>
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
          <b-btn block size="lg" class="my-3" @click="sendForm">検索</b-btn>
          <b-btn block size="lg" class="my-3" @click="clearForm"
            >検索条件をクリア</b-btn
          >
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
      reloadURL: '',
    }
  },
  computed: {
    ...mapState(['zipcodeDetail', 'items', 'isDetail', 'zipInput']),
  },
  mounted() {
    this.reloadURL = process.env.zsearchWebURL
  },
  methods: {
    ...mapMutations(['addState', 'buildInput']),
    async sendForm() {
      this.hasValidError = false
      this.isCompleted = false
      this.isLoading = true
      if (
        this.zipInput.zipcode === '' &&
        this.zipInput.pref === '' &&
        this.zipInput.city === '' &&
        this.zipInput.town === ''
      ) {
        this.hasValidError = true
        this.isLoading = false
        this.addState({ stateKey: 'items', data: [] })
        this.addState({ stateKey: 'zipcodeDetail', data: {} })
        this.addState({ stateKey: 'isDetail', data: false })
        return
      }
      const res = await this.$zsearchApi(['search', 'like', this.zipInput])
      this.addState({ stateKey: 'items', data: [] })
      this.addState({ stateKey: 'zipcodeDetail', data: {} })
      this.addState({ stateKey: 'isDetail', data: false })
      if ('error' in res) {
        this.hasError = true
      } else {
        this.isCompleted = true
        const items = []
        for (const user of res.data) {
          items.push(user)
        }
        this.addState({ stateKey: 'items', data: items })
      }
      this.isLoading = false
    },
    clearForm() {
      this.hasValidError = false
      this.isCompleted = false
      this.buildInput({ inputKey: 'zipInput', row: { zipcode: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { pref: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { city: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { town: '' } })
    },
  },
}
</script>
