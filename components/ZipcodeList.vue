<template>
  <div>
    <p class="mt-1">検索件数: {{ rows }} - Current Page: {{ currentPage }}</p>
    <div>
      <div class="">
        <b-table
          id="my-table"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="['検索結果リスト']"
          small
          hover
          responsive
        >
          <template #cell(検索結果リスト)="row">
            <b-row no-gutters>
              <b-col cols="12" class="text-left text-truncate">
                <b-btn
                  size="sm"
                  variant="secondary"
                  class="text-center"
                  @click="showDetail(row)"
                >
                  詳細
                </b-btn>
                <span class="">〒{{ row.item.zipcode }}</span>
                <span>{{ row.item.pref }}</span>
                <span>{{ row.item.city }}</span>
                <span>{{ row.item.town }}</span>
              </b-col>
            </b-row>
          </template>
        </b-table>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="fill"
      ></b-pagination>
    </div>
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
    ...mapState(['zipcodeDetail', 'perPage', 'items', 'isDetail']),
    currentPage: {
      get() {
        return this.$store.state.currentPage
      },
      set(val) {
        this.addState({ stateKey: 'currentPage', data: val })
      },
    },
    rows() {
      return this.items.length
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['addState']),
    showDetail(row) {
      this.addState({ stateKey: 'isDetail', data: true })
      this.addState({ stateKey: 'zipcodeDetail', data: row.item })
    },
  },
}
</script>
