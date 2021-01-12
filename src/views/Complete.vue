<template>
  <section>
    <v-container class="py-0">
      <v-card elevation="1" class="pa-3 mt-2 rounded-lg">
        <div class="d-flex justify-center align-center flex-column">
          <img class="mb-4" src="../assets/svg/icon-s-confirm.svg" alt="">
          <span class="subtitle-2 font-weight-bold">恭喜您，您的存款申请已提交。</span>
        </div>
        <v-divider class="mb-8 mt-4"></v-divider>
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
            <span class="subtitle-2">{{ channelItem["amount"] }}</span>
          </div>
          <v-btn tile outlined x-small class="copy-btn" @click="copyValue(list.amount)">复制</v-btn>
        </div>
      </v-card>
      <div class="mt-3 main-color caption">我们正在处理您的存款申请，请您耐心等待！</div>
    </v-container>
    <div class="px-3 mt-4">
      <v-btn class="btn-outline btn-radius mb-3" outlined block elevation="0" height="44" @click="leaveDeposit">回首頁</v-btn>

      <v-btn class="btn-radius btn-bg" dark block elevation="0" height="44" @click="leaveDepositAndGotoTradeRecords">存款紀錄</v-btn>
    </div>
    <div class="mt-5 caption text-center">如需帮助，请
      <span class="text-decoration-underline" style="color: #c09267;">联系客服</span>
    </div>
  </section>
</template>

<script>
import copy from "copy-to-clipboard";
import {mapGetters} from "vuex";

export default {
  name: "BankTransfer",
  computed: {
    ...mapGetters({
      bankItem: "getBankItem",
      userInfo: "getUserInfo"
    })
  },
  data() {
    return {
      list: this.$route.params.receiveInfo,
      channelItem: this.$route.params,
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
    console.log(this.$route.params)
  },
  methods: {
    copyValue(val) {
      if (copy(val)) {
        console.log('111')
      }
    },
    leaveDeposit() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      let isPhone = u.indexOf('iPhone') > -1
      if (isAndroid) {
        window.jsInterface.leaveDeposit()
      } else if (isPhone) {
        location.href = "lyBw://leaveDeposit"
      } else {
        location.href = "http://192.168.0.122:8081/"
      }
    },
    leaveDepositAndGotoTradeRecords(){
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      if (isAndroid) {
        window.jsInterface.leaveDepositAndGotoTradeRecords()
      } else {
        location.href = "lybw://leaveDepositAndGotoTradeRecords"
      }
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
}

.btn-radius {
  border-radius: 10px;
}

.btn-outline {
  border-color: #c09267 !important;
  color: #c09267 !important;
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