<template>
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
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    city: {
      get() {
        return this.$store.state.zipInput.city
      },
      set(val) {
        this.buildInput({ inputKey: 'zipInput', row: { city: val } })
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['buildInput']),
  },
}
</script>
