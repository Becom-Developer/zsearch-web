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
        <b-row class="my-1">
          <b-col sm="3" class="text-left">
            <label :for="`type-pref`">都道府県:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
              :id="`type-pref`"
              v-model="pref"
              :options="options"
              size="sm"
              class=""
            ></b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3" class="text-left">
            <label :for="`type-city`">市町村:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-city`"
              v-model="city"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3" class="text-left">
            <label :for="`type-town`">以下の住所:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-town`"
              v-model="town"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-btn block size="sm" @click="sendForm">検索</b-btn>
        <b-btn block size="sm" @click="clearForm">検索条件をクリア</b-btn>
        <div class="text-center">
          <div v-if="isLoading" class="text-center p-3">
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
          </div>
          <b-alert
            variant="success"
            :show="isCompleted"
            @dismissed="isCompleted = false"
            >検索実行
          </b-alert>
          <b-alert
            variant="warning"
            :show="hasValidError"
            @dismissed="hasValidError = false"
            >検索条件を指定してください</b-alert
          >
          <b-alert
            variant="danger"
            :show="hasError"
            @dismissed="hasError = false"
            >問題が発生しました</b-alert
          >
        </div>
      </b-card>
    </div>
    <!-- 検索結果リスト -->
    <div class="mb-3">
      <b-card header="検索結果" header-tag="header" title="">
        <p class="mt-1">
          検索件数: {{ rows }} - Current Page: {{ currentPage }}
        </p>
        <div class="overflow-auto">
          <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="['zipcode', 'pref', 'city', 'town', 'show_details']"
            small
            hover
          >
            <template #cell(show_details)="row">
              <b-btn size="sm" class="mr-2" @click="showDetail(row)">
                Details
              </b-btn>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
          ></b-pagination>
        </div>
        <div v-if="isDetail">
          <ul>
            <li
              v-for="col in [
                'zipcode',
                'pref',
                'city',
                'town',
                'pref_kana',
                'city_kana',
                'town_kana',
              ]"
              :key="col.id"
            >
              {{ col }}: {{ detail[col] }}
            </li>
          </ul>
        </div>
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
      options: [
        { value: '', text: '指定しない' },
        { value: '北海道', text: '北海道' },
        { value: '青森県', text: '青森県' },
        { value: '岩手県', text: '岩手県' },
        { value: '宮城県', text: '宮城県' },
        { value: '秋田県', text: '秋田県' },
        { value: '山形県', text: '山形県' },
        { value: '福島県', text: '福島県' },
        { value: '茨城県', text: '茨城県' },
        { value: '栃木県', text: '栃木県' },
        { value: '群馬県', text: '群馬県' },
        { value: '埼玉県', text: '埼玉県' },
        { value: '千葉県', text: '千葉県' },
        { value: '東京都', text: '東京都' },
        { value: '神奈川県', text: '神奈川県' },
        { value: '新潟県', text: '新潟県' },
        { value: '富山県', text: '富山県' },
        { value: '石川県', text: '石川県' },
        { value: '福井県', text: '福井県' },
        { value: '山梨県', text: '山梨県' },
        { value: '長野県', text: '長野県' },
        { value: '岐阜県', text: '岐阜県' },
        { value: '静岡県', text: '静岡県' },
        { value: '愛知県', text: '愛知県' },
        { value: '三重県', text: '三重県' },
        { value: '滋賀県', text: '滋賀県' },
        { value: '京都府', text: '京都府' },
        { value: '大阪府', text: '大阪府' },
        { value: '兵庫県', text: '兵庫県' },
        { value: '奈良県', text: '奈良県' },
        { value: '和歌山県', text: '和歌山県' },
        { value: '鳥取県', text: '鳥取県' },
        { value: '島根県', text: '島根県' },
        { value: '岡山県', text: '岡山県' },
        { value: '広島県', text: '広島県' },
        { value: '山口県', text: '山口県' },
        { value: '徳島県', text: '徳島県' },
        { value: '香川県', text: '香川県' },
        { value: '愛媛県', text: '愛媛県' },
        { value: '高知県', text: '高知県' },
        { value: '福岡県', text: '福岡県' },
        { value: '佐賀県', text: '佐賀県' },
        { value: '長崎県', text: '長崎県' },
        { value: '熊本県', text: '熊本県' },
        { value: '大分県', text: '大分県' },
        { value: '宮崎県', text: '宮崎県' },
        { value: '鹿児島県', text: '鹿児島県' },
        { value: '沖縄県', text: '沖縄県' },
      ],
      code: '',
      pref: '',
      city: '',
      town: '',
      res: {
        zserch: {},
        auth: {},
      },
      isDetail: false,
      detail: {},
      perPage: 10,
      currentPage: 1,
      items: [],
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
  },
  methods: {
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
      this.isLoading = true
      this.hasValidError = false
      this.isCompleted = false
      if (
        this.code === '' &&
        this.pref === '' &&
        this.city === '' &&
        this.town === ''
      ) {
        this.hasValidError = true
        this.isLoading = false
        return
      }
      const res = await this.$zsearchapi([
        'search',
        'like',
        { code: this.code, pref: this.pref, city: this.city, town: this.town },
      ])
      if ('error' in res) {
        this.hasError = true
      } else {
        this.isCompleted = true
        const items = []
        for (const user of res.result) {
          items.push(user)
        }
        this.items = items
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
      for (const name of ['code', 'pref', 'city', 'town']) {
        this[name] = ''
      }
    },
    async getList() {
      const res = await this.$zsearchapi(['search', 'like', { code: '812' }])
      const items = []
      for (const user of res.result) {
        items.push(user)
      }
      this.items = items
    },
    showDetail(row) {
      this.isDetail = true
      this.detail = row.item
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
