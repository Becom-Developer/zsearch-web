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
        <b-row class="my-1">
          <b-col sm="3" class="text-left">
            <label :for="`type-code`">郵便番号:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-code`"
              v-model="code"
              :type="`text`"
              :readonly="true"
            ></b-form-input>
          </b-col>
        </b-row>
        <!-- <p>{{ code }}</p>
        <p>{{ zip }}</p> -->
        <b-row class="my-1">
          <b-col class="m-0 p-0 text-center">
            <b-form-spinbutton
              v-model="zip.code1.val"
              vertical
              wrap
              :formatter-fn="dayFormatter1"
              min="0"
              max="10"
              @change="dayFormatter1"
            ></b-form-spinbutton>
          </b-col>
          <b-col class="m-0 p-0 text-center">
            <b-form-spinbutton
              v-model="zip.code2.val"
              vertical
              wrap
              :formatter-fn="dayFormatter2"
              min="0"
              max="10"
              :readonly="zip.code2.isRead"
              @change="dayFormatter2"
            ></b-form-spinbutton>
          </b-col>
          <b-col class="m-0 p-0 text-center">
            <b-form-spinbutton
              v-model="zip.code3.val"
              vertical
              wrap
              :formatter-fn="dayFormatter3"
              min="0"
              max="10"
              :readonly="zip.code3.isRead"
              @change="dayFormatter3"
            ></b-form-spinbutton>
          </b-col>
          <b-col style="" class="m-0 p-0 text-center" align-self="center">
            <span class="">-</span>
          </b-col>
          <b-col class="m-0 p-0 text-center">
            <b-form-spinbutton
              v-model="zip.code4.val"
              vertical
              wrap
              :formatter-fn="dayFormatter4"
              min="0"
              max="10"
              :readonly="zip.code4.isRead"
              @change="dayFormatter4"
            ></b-form-spinbutton>
          </b-col>
          <b-col class="m-0 p-0 text-center">
            <b-form-spinbutton
              v-model="zip.code5.val"
              vertical
              wrap
              :formatter-fn="dayFormatter5"
              min="0"
              max="10"
              :readonly="zip.code5.isRead"
              @change="dayFormatter5"
            ></b-form-spinbutton>
          </b-col>
          <b-col class="m-0 p-0 text-center">
            <b-form-spinbutton
              v-model="zip.code6.val"
              vertical
              wrap
              :formatter-fn="dayFormatter6"
              min="0"
              max="10"
              :readonly="zip.code6.isRead"
              @change="dayFormatter6"
            ></b-form-spinbutton>
          </b-col>
          <b-col class="m-0 p-0 text-center">
            <b-form-spinbutton
              v-model="zip.code7.val"
              vertical
              wrap
              :formatter-fn="dayFormatter7"
              min="0"
              max="10"
              :readonly="zip.code7.isRead"
              @change="dayFormatter7"
            ></b-form-spinbutton>
          </b-col>
        </b-row>
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
    <!-- <div>
      <b-btn variant="primary" @click="clickTestZsearch">テスト Zsearch</b-btn>
      <p>{{ res }}</p>
      <b-btn variant="primary" @click="clickTestAuth">テスト Auth</b-btn>
      <p>{{ res }}</p>
    </div> -->
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
      zip: {
        code1: { val: 10, isRead: true },
        code2: { val: 10, isRead: true },
        code3: { val: 10, isRead: true },
        code4: { val: 10, isRead: true },
        code5: { val: 10, isRead: true },
        code6: { val: 10, isRead: true },
        code7: { val: 10, isRead: true },
      },
      days: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '※'],
      code: '',
      res: {
        zserch: {},
        auth: {},
      },
    }
  },
  computed: {
    ...mapState([
      'zipcodeDetail',
      'items',
      'isDetail',
      'town',
      'city',
      'zipInput',
    ]),
  },
  methods: {
    ...mapMutations(['addState', 'buildInput']),
    dayFormatter(value) {
      return this.days[value]
    },
    addCode(code, zipCode) {
      if (zipCode.isRead) {
        return code
      }
      let val = zipCode.val
      if (zipCode.val >= 10) {
        val = ''
      }
      code = code + val.toString()
      return code
    },
    multiAddCode(firstCode, codeNames) {
      let code = firstCode
      for (const codeName of codeNames) {
        code = this.addCode(code, this.zip[codeName])
      }
      return code
    },
    addIsRead(codeNames) {
      for (const codeName of codeNames) {
        this.zip[codeName].isRead = true
      }
    },
    connectCode(codeNames) {
      let code = ''
      for (const codeName of codeNames) {
        code = code + this.zip[codeName].val.toString()
      }
      return code
    },
    dayFormatter1(value) {
      this.zip.code2.isRead = false
      const setVal = this.dayFormatter(value)
      if (value === 10) {
        this.addIsRead(['code2', 'code3', 'code4', 'code5', 'code6', 'code7'])
        this.code = ''
      } else {
        const codeNames = ['code3', 'code4', 'code5', 'code6', 'code7']
        this.code = this.multiAddCode(
          this.addCode(setVal, this.zip.code2),
          codeNames
        )
      }
      return setVal
    },
    dayFormatter2(value) {
      if (this.zip.code2.isRead) {
        return
      }
      this.zip.code3.isRead = false
      const setVal = this.dayFormatter(value)
      if (value === 10) {
        this.addIsRead(['code3', 'code4', 'code5', 'code6', 'code7'])
        this.code = this.zip.code1.val
      } else {
        const code = this.zip.code1.val.toString() + setVal.toString()
        const codeNames = ['code3', 'code4', 'code5', 'code6', 'code7']
        this.code = this.multiAddCode(code, codeNames)
      }
      return setVal
    },
    dayFormatter3(value) {
      if (this.zip.code3.isRead) {
        return
      }
      this.zip.code4.isRead = false
      const setVal = this.dayFormatter(value)
      if (value === 10) {
        this.addIsRead(['code4', 'code5', 'code6', 'code7'])
      } else {
        let code = this.connectCode(['code1', 'code2'])
        code = code + setVal.toString()
        this.code = this.multiAddCode(code, [
          'code4',
          'code5',
          'code6',
          'code7',
        ])
      }
      return setVal
    },
    dayFormatter4(value) {
      if (this.zip.code4.isRead) {
        return
      }
      this.zip.code5.isRead = false
      const setVal = this.dayFormatter(value)
      if (value === 10) {
        this.addIsRead(['code5', 'code6', 'code7'])
      } else {
        let code = this.connectCode(['code1', 'code2', 'code3'])
        code = code + setVal.toString()
        this.code = this.multiAddCode(code, ['code5', 'code6', 'code7'])
      }
      return setVal
    },
    dayFormatter5(value) {
      if (this.zip.code5.isRead) {
        return
      }
      this.zip.code6.isRead = false
      const setVal = this.dayFormatter(value)
      if (value === 10) {
        this.addIsRead(['code6', 'code7'])
      } else {
        let code = this.connectCode(['code1', 'code2', 'code3', 'code4'])
        code = code + setVal.toString()
        this.code = this.multiAddCode(code, ['code6', 'code7'])
      }
      return setVal
    },
    dayFormatter6(value) {
      if (this.zip.code6.isRead) {
        return
      }
      this.zip.code7.isRead = false
      const setVal = this.dayFormatter(value)
      if (value === 10) {
        this.addIsRead(['code7'])
      } else {
        const codeNames = ['code1', 'code2', 'code3', 'code4', 'code5']
        let code = this.connectCode(codeNames)
        code = code + setVal.toString()
        this.code = this.addCode(code, this.zip.code7)
      }
      return setVal
    },
    dayFormatter7(value) {
      if (this.zip.code7.isRead) {
        return
      }
      return this.dayFormatter(value)
    },
    async sendForm() {
      this.hasValidError = false
      this.isCompleted = false
      this.isLoading = true
      if (
        this.code === '' &&
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
          code: this.code,
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
      const zipNames = ['1', '2', '3', '4', '5', '6', '7']
      for (const zipName of zipNames) {
        const name = 'code' + zipName
        this.zip[name].val = 10
        this.zip[name].isRead = true
      }
      for (const name of ['code']) {
        this[name] = ''
      }
      this.buildInput({ inputKey: 'zipInput', row: { pref: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { city: '' } })
      this.buildInput({ inputKey: 'zipInput', row: { town: '' } })
    },
    async getList() {
      const res = await this.$zsearchapi(['search', 'like', { code: '812' }])
      const items = []
      for (const user of res.result) {
        items.push(user)
      }
      this.items = items
    },
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
