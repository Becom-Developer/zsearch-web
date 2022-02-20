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
        <div>
          <b-table
            :sticky-header="'200px'"
            :items="items"
            head-variant="light"
          ></b-table>
        </div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="郵便番号からの検索">
              <b-card-text>郵便番号からの検索</b-card-text>
              <b-container fluid class="p-0">
                <b-card title="郵便番号選択" sub-title="Card subtitle">
                  {{ form }}
                  <b-row
                    v-for="key in ['code', 'pref', 'city', 'town']"
                    :key="key.id"
                    class="my-1"
                  >
                    <b-col sm="3">
                      <label :for="`type-${key}`">{{ key }}:</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input
                        :id="`type-${key}`"
                        v-model="form[key]"
                        :type="`text`"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-btn block size="sm" @click="search">検索実行</b-btn>

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
export default {
  data() {
    return {
      form: {
        code: '',
        pref: '',
        city: '',
        town: '',
      },
      res: {},
      address: [],
      items: [
        {
          select: 'ボタン',
          zipcode: '8120041',
          pref: '福岡県',
          city: '福岡市博多区',
          town: '吉塚',
        },
      ],
    }
  },
  methods: {
    async search() {
      const url = 'https://zsearch-api.becom.co.jp/'
      const res = await this.$axios.$post(url, {
        path: 'search',
        method: 'like',
        params: {
          code: this.form.code.trim(),
          pref: this.form.pref.trim(),
          city: this.form.city.trim(),
          town: this.form.town.trim(),
        },
        apikey: 'becom',
      })
      if (res.error) {
        this.res = res.error
      }
      if (res.message) {
        this.res = res.message
        const result = res.result
        const resResult = []
        for (const row of result) {
          const list = {
            select: 'button',
            zipcode: row.zipcode,
            pref: row.pref,
            city: row.city,
            town: row.town,
          }
          resResult.push(list)
        }
        this.address = resResult
        this.items = resResult
      }
    },
  },
}
</script>
