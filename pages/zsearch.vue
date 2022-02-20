<template>
  <div>
    <b-container>
      <b-jumbotron header="検索" lead="zsearch-web: 郵便番号の多彩な検索 ">
        <p>For more information visit website</p>
        <b-button variant="primary" @click="$router.push('/')"
          >トップへ戻る</b-button
        >
      </b-jumbotron>
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="郵便番号からの検索">
              <b-card-text>郵便番号からの検索</b-card-text>
              <b-container fluid class="p-0">
                <b-card title="郵便番号選択" sub-title="Card subtitle">
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label :for="`type-postcode`">postcode:</label>
                    </b-col>
                    <b-col sm="1" class="m-0 p-0">
                      <b-form-select
                        :id="`type-postcode`"
                        v-model="postcode1"
                        :options="options"
                        @change="col1"
                      ></b-form-select>
                    </b-col>
                    <b-col v-if="isShow2" sm="1" class="m-0 p-0">
                      <b-form-select
                        :id="`type-postcode`"
                        v-model="postcode2"
                        :options="options"
                        @change="col2"
                      ></b-form-select>
                    </b-col>
                    <b-col v-if="isShow3" sm="1" class="m-0 p-0">
                      <b-form-select
                        :id="`type-postcode`"
                        v-model="postcode3"
                        :options="options"
                        @change="col3"
                      ></b-form-select>
                    </b-col>
                    <b-col v-if="isShow4" sm="1" class="m-0 p-0">
                      <b-form-select
                        :id="`type-postcode`"
                        v-model="postcode4"
                        :options="options"
                        @change="col4"
                      ></b-form-select>
                    </b-col>
                    <b-col v-if="isShow5" sm="1" class="m-0 p-0">
                      <b-form-select
                        :id="`type-postcode`"
                        v-model="postcode5"
                        :options="options"
                        @change="col5"
                      ></b-form-select>
                    </b-col>
                    <b-col v-if="isShow6" sm="1" class="m-0 p-0">
                      <b-form-select
                        :id="`type-postcode`"
                        v-model="postcode6"
                        :options="options"
                        @change="col6"
                      ></b-form-select>
                    </b-col>
                    <b-col v-if="isShow7" sm="1" class="m-0 p-0">
                      <b-form-select
                        :id="`type-postcode`"
                        v-model="postcode7"
                        :options="options"
                      ></b-form-select>
                    </b-col>
                  </b-row>
                  <p>{{ postcode1 }}{{ postcode2 }}{{ postcode3 }}</p>
                  <p>
                    {{ postcode4 }}{{ postcode5 }}{{ postcode6 }}{{ postcode7 }}
                  </p>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label :for="`type-pref`">pref:</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input
                        :id="`type-pref`"
                        v-model="pref"
                        :type="`text`"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label :for="`type-city`">city:</label>
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
                    <b-col sm="3">
                      <label :for="`type-town`">town:</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input
                        :id="`type-town`"
                        v-model="town"
                        :type="`text`"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <!-- <b-row
                    v-for="key in ['start_year', 'end_year']"
                    :key="key.id"
                    class="my-1"
                  >
                    <b-col sm="3">
                      <label :for="`type-${key}`">{{ key }}:</label>
                    </b-col>
                    <b-col sm="9">{{ periodInput[key] }} </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label :for="`type-start_date`">start_date:</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input
                        :id="`type-start_date`"
                        v-model="start_date"
                        :type="`date`"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="my-1">
                    <b-col sm="3">
                      <label :for="`type-end_date`">end_date:</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input
                        :id="`type-end_date`"
                        v-model="end_date"
                        :type="`date`"
                      ></b-form-input>
                    </b-col>
                  </b-row> -->

                  <b-btn block size="sm" @click="search">検索実行</b-btn>
                  <!-- <b-alert
                    variant="success"
                    dismissible
                    :show="isCompleted"
                    @dismissed="isCompleted = false"
                    >登録は成功しました。{{ res }}</b-alert
                  >
                  <b-alert
                    variant="danger"
                    dismissible
                    :show="isError"
                    @dismissed="isError = false"
                    >登録は失敗しました。{{ res }}</b-alert
                  > -->

                  <p>{{ res }}</p>
                  <!-- <p>{{ address }}</p> -->
                  <div v-for="add in address" :key="add.id">
                    <p>
                      {{ add.zipcode }}: {{ add.pref }}{{ add.city
                      }}{{ add.town }}
                    </p>
                  </div>
                </b-card>
              </b-container>
            </b-tab>
            <b-tab title="Build">
              <b-card-text>設定の初期化など</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  data() {
    return {
      postcode1: '',
      postcode2: '',
      postcode3: '',
      postcode4: '',
      postcode5: '',
      postcode6: '',
      postcode7: '',
      pref: '',
      city: '',
      town: '',
      options: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
      res: {},
      address: [],
    }
  },
  //   computed: { ...mapState(['userList']) },
  methods: {
    col1() {
      if (this.postcode1 === '') {
        this.isShow2 = false
        this.isShow3 = false
        this.isShow4 = false
        this.isShow5 = false
        this.isShow6 = false
        this.isShow7 = false
        this.postcode2 = ''
        this.postcode3 = ''
        this.postcode4 = ''
        this.postcode5 = ''
        this.postcode6 = ''
        this.postcode7 = ''
        return
      }
      this.isShow2 = true
    },
    col2() {
      if (this.postcode2 === '') {
        this.isShow3 = false
        this.isShow4 = false
        this.isShow5 = false
        this.isShow6 = false
        this.isShow7 = false
        this.postcode3 = ''
        this.postcode4 = ''
        this.postcode5 = ''
        this.postcode6 = ''
        this.postcode7 = ''
        return
      }
      this.isShow3 = true
    },
    col3() {
      if (this.postcode3 === '') {
        this.isShow4 = false
        this.isShow5 = false
        this.isShow6 = false
        this.isShow7 = false
        this.postcode5 = ''
        this.postcode6 = ''
        this.postcode7 = ''
        return
      }
      this.isShow4 = true
    },
    col4() {
      if (this.postcode4 === '') {
        this.isShow5 = false
        this.isShow6 = false
        this.isShow7 = false
        this.postcode6 = ''
        this.postcode7 = ''
        return
      }
      this.isShow5 = true
    },
    col5() {
      if (this.postcode5 === '') {
        this.isShow6 = false
        this.isShow7 = false
        this.postcode7 = ''
        return
      }
      this.isShow6 = true
    },
    col6() {
      if (this.postcode6 === '') {
        this.isShow7 = false
        return
      }
      this.isShow7 = true
    },
    async search() {
      console.log('------')
      console.log(this.postcode2)
      let searchCode = ''
      if (this.postcode1 !== '') {
        console.log(this.postcode1)
        searchCode = this.postcode1
      }
      if (this.postcode2 !== '') {
        searchCode += this.postcode2
      }
      if (this.postcode3 !== '') {
        searchCode += this.postcode3
      }
      if (this.postcode4 !== '') {
        searchCode += this.postcode4
      }
      if (this.postcode5 !== '') {
        searchCode += this.postcode5
      }
      if (this.postcode6 !== '') {
        searchCode += this.postcode6
      }
      if (this.postcode7 !== '') {
        searchCode += this.postcode7
      }
      let searchPref = ''
      if (this.pref !== '') {
        searchPref = this.pref
      }
      let searchCity = ''
      if (this.city !== '') {
        searchCity = this.city
      }
      let searchTown = ''
      if (this.town !== '') {
        searchTown = this.town
      }
      console.log(searchCode)
      const url = 'https://zsearch-api.becom.co.jp/'
      const res = await this.$axios.$post(url, {
        path: 'search',
        method: 'like',
        params: {
          code: searchCode,
          pref: searchPref,
          city: searchCity,
          town: searchTown,
        },
        apikey: 'becom',
      })
      console.log(res)
      if (res.error) {
        this.res = res.error
      }
      if (res.message) {
        this.res = res.message
        const result = res.result
        const resResult = []
        for (const row of result) {
          const list = {
            zipcode: row.zipcode,
            pref: row.pref,
            city: row.city,
            town: row.town,
          }
          resResult.push(list)
        }
        this.address = resResult
      }
      //   this.res = res
    },
  },
}
</script>
