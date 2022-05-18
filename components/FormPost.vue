<template>
  <div>
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
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
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
    }
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
        this.buildInput({ inputKey: 'zipInput', row: { code: '' } })
      } else {
        const codeNames = ['code3', 'code4', 'code5', 'code6', 'code7']
        const codeVal = this.multiAddCode(
          this.addCode(setVal, this.zip.code2),
          codeNames
        )
        this.buildInput({ inputKey: 'zipInput', row: { code: codeVal } })
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
        const codeVal = this.zip.code1.val
        this.buildInput({ inputKey: 'zipInput', row: { code: codeVal } })
      } else {
        const code = this.zip.code1.val.toString() + setVal.toString()
        const codeNames = ['code3', 'code4', 'code5', 'code6', 'code7']
        const codeVal = this.multiAddCode(code, codeNames)
        this.buildInput({ inputKey: 'zipInput', row: { code: codeVal } })
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
        const codeVal = this.multiAddCode(code, [
          'code4',
          'code5',
          'code6',
          'code7',
        ])
        this.buildInput({ inputKey: 'zipInput', row: { code: codeVal } })
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
        const codeVal = this.multiAddCode(code, ['code5', 'code6', 'code7'])
        this.buildInput({ inputKey: 'zipInput', row: { code: codeVal } })
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
        const codeVal = this.multiAddCode(code, ['code6', 'code7'])
        this.buildInput({ inputKey: 'zipInput', row: { code: codeVal } })
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
        const codeVal = this.addCode(code, this.zip.code7)
        this.buildInput({ inputKey: 'zipInput', row: { code: codeVal } })
      }
      return setVal
    },
    dayFormatter7(value) {
      if (this.zip.code7.isRead) {
        return
      }
      return this.dayFormatter(value)
    },
  },
}
</script>
