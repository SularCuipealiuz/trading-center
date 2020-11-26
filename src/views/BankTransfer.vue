<template>
  <section>
    <v-container class="py-0">
      <span class="main-color caption">请复制下方讯息，进行转帐</span>
      <v-card elevation="1" class="pa-3 mt-2 rounded-lg">
        <div class="mb-1 d-flex justify-space-between align-center">
          <div>
            <span class="main-color subtitle-2">转账银行：</span>
            <span class="subtitle-2">{{ list["bankName"] }}</span>
          </div>
          <v-btn tile outlined x-small class="copy-btn" @click="copyValue(list.bankName)">复制</v-btn>
        </div>
        <div class="mb-1 d-flex justify-space-between align-center">
          <div>
            <span class="main-color subtitle-2">银行账号：</span>
            <span class="subtitle-2">{{ list["account"] }}</span>
          </div>
          <v-btn tile outlined x-small class="copy-btn" @click="copyValue(list.account)">复制</v-btn>
        </div>
        <div class="mb-1 d-flex justify-space-between align-center">
          <div>
            <span class="main-color subtitle-2">转账姓名：</span>
            <span class="subtitle-2">{{ list["accountName"] }}</span>
          </div>
          <v-btn tile outlined x-small class="copy-btn" @click="copyValue(list.accountName)">复制</v-btn>
        </div>
        <div class="mb-1 d-flex justify-space-between align-center">
          <div>
            <span class="main-color subtitle-2">开户行地址：</span>
            <span class="subtitle-2">{{ list["branchName"] }}</span>
          </div>
          <v-btn tile outlined x-small class="copy-btn" @click="copyValue(list.branchName)">复制</v-btn>
        </div>
        <div class="mb-1 d-flex justify-space-between align-center">
          <div>
            <span class="main-color subtitle-2">金额：</span>
            <span class="subtitle-2">{{ list["amount"] }}</span>
          </div>
          <v-btn tile outlined x-small class="copy-btn" @click="copyValue(list.amount)">复制</v-btn>
        </div>
      </v-card>
    </v-container>
    <div class="white mt-3 pt-2">
      <v-text-field
          class="mt-2 input-panel caption"
          label="存款银行"
          placeholder="请选择"
          prepend-icon="*"
          append-outer-icon="far fa-chevron-left"
          readonly
          hide-details
          v-model="bankItem"
          @click="$store.dispatch('toggleBankList', true)"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
      <v-text-field
          class="mt-4 input-panel caption"
          label="存款银行帐号"
          placeholder="请输入存款银行帐号"
          prepend-icon="*"
          hide-details
          v-model="bankForm.account"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
      <v-text-field
          class="mt-4 input-panel caption"
          label="存款人姓名"
          placeholder="为及时到账，请务必输入正确存款人真实姓名"
          prepend-icon="*"
          hide-details
          v-model="bankForm.accountName"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
      <v-text-field
          class="mt-4 input-panel caption"
          label="备注"
          placeholder="转帐後填寫備註內容，更快到账"
          prepend-icon=" "
          hide-details
          v-model="bankForm.memberNote"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
    </div>
    <div class="px-3 mt-4">
      <v-btn class="btn-bg" dark block elevation="0" height="44" @click="submit">提交存款</v-btn>
    </div>
  </section>
</template>

<script>
import copy from "copy-to-clipboard";
import {bankList, submitDeposit} from "@/api";
import {mapGetters} from "vuex";

export default {
  name: "BankTransfer",
  computed: {
    ...mapGetters({
      bankItem: "getBankItem"
    })
  },
  data() {
    return {
      list: this.$route.params.channelInfo,
      bankForm: {
        uid: "",
        channelId: 0,
        bankName: "",
        account: "",
        accountName: "",
        memberNote: "",
        amount: 0
      }
    }
  },
  mounted() {
    this.$store.dispatch("setPageTitle", "银行转账");

    bankList().then(res => {
      this.$store.dispatch("setBankList", res)
    })
  },
  methods: {
    copyValue(val) {
      if (copy(val)) {
        console.log('111')
      }
    },
    submit() {
      this.bankForm.bankName = this.bankItem
      submitDeposit(this.bankForm).then(res => {
        console.log('res', res)
      })
    }
  }
}
</script>

<style scoped>
.main-color {
  color: #97a4c5;
}

.copy-btn {
  padding: 2px 6px !important;
  border-radius: 5px;
  border: solid 1px #6aaaf5;
  color: #6aaaf5;
  font-size: 12px;
  line-height: 1.2;
}

.input-panel {
  height: 60px;
  margin-bottom: -10px;
}

.btn-bg {
  background: rgba(210, 183, 156, 0.5) !important;
  border-radius: 10px;
}
</style>

<style lang="scss">
.v-input__prepend-outer {
  margin-right: 0px !important;
}

.v-input__prepend-outer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 0 !important;
  margin-right: 4px !important;
}

.v-label {
  font-weight: 700;
  font-size: 18px;
}

.v-input__slot::after {
  border-color: transparent !important;
  background-color: transparent !important;
}

.v-input__icon--prepend {
  margin-left: 8px;
}

.v-input__slot::before {
  border-color: transparent !important;
  background-color: transparent !important;
}

.v-input__icon--append-outer {
  transform: rotate(180deg);
  margin-top: -9px !important;
  margin-right: 4px !important;

  > * {
    font-size: 16px !important;
  }
}
</style>