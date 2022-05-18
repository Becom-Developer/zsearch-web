<template>
  <b-row class="my-1">
    <b-col sm="3" class="text-left">
      <label :for="`type-code`">郵便番号:(半角数字)</label>
    </b-col>
    <b-col sm="9">
      <b-form-input
        :id="`type-code`"
        v-model="code"
        :type="`number`"
        :readonly="false"
        size="lg"
      ></b-form-input>
    </b-col>
  </b-row>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    code: {
      get() {
        return this.$store.state.zipInput.zipcode
      },
      set(val) {
        this.buildInput({ inputKey: 'zipInput', row: { zipcode: val } })
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['buildInput']),
  },
}
</script>
