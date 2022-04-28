<template>
  <div>
    <div class="my-4">
      <p class="h1">〒 {{ zipcodeDetail['zipcode'] }}</p>
      <p class="h2">
        <span>{{ zipcodeDetail['pref'] }}</span>
        <span>{{ zipcodeDetail['city'] }}</span>
      </p>
      <p class="h3">{{ zipcodeDetail['town'] }}</p>
    </div>
    <div class="my-4">
      <p class="h4">
        <span>{{ zipcodeDetail['pref_kana'] }}</span>
        <span>{{ zipcodeDetail['city_kana'] }}</span>
      </p>
      <p class="h4">
        <span>{{ zipcodeDetail['town_kana'] }}</span>
      </p>
    </div>
    <b-row>
      <b-col md="4" class="mb-2">
        <b-btn block size="lg" @click="copy('zipcode')">郵便番号をコピー</b-btn>
      </b-col>
      <b-col md="4" class="mb-2">
        <b-btn block size="lg" @click="copy('address')">住所をコピー</b-btn>
      </b-col>
      <b-col md="4" class="mb-2">
        <b-btn block size="lg" @click="copy('kana')">よみがなをコピー</b-btn>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['zipcodeDetail']),
  },
  mounted() {},
  methods: {
    ...mapMutations(['addState']),
    async copy(word) {
      const detail = this.zipcodeDetail
      let copyText = `${detail.zipcode}${detail.pref}${detail.city}`
      if (word === 'zipcode') {
        copyText = detail.zipcode
      }
      if (word === 'address') {
        copyText = `${detail.pref}${detail.city}${detail.town}`
      }
      if (word === 'kana') {
        copyText = `${detail.pref_kana}${detail.city_kana}${detail.town_kana}`
      }
      try {
        await navigator.clipboard.writeText(copyText)
        // alert('コピーしました')
      } catch (error) {
        alert((error && error.message) || 'コピーに失敗しました')
      }
    },
  },
}
</script>
