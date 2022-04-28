<template>
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
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['isDetail']),
    town: {
      get() {
        return this.$store.state.town
      },
      set(val) {
        this.addState({ stateKey: 'town', data: val })
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['addState']),
  },
}
</script>
