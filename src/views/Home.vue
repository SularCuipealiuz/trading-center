<template>
  <section class="home">
    <v-container class="subtitle-2 font-weight-bold white">
      <span class="pl-2">支付方式</span>
      <v-divider class="my-1"></v-divider>

      <div class="py-2 payment-panel">
        <div v-for="(e,index) in paymentList" :key="index"
             class="pt-1 d-flex justify-center align-center flex-column payment-item caption font-weight-bold"
             :class="{'active-item':selectedPaymentItem.id === e.id}"
             @click="changePaymentItem(e)">
          <img class="flag" :src="iconList[e.cornerIcon]" alt="">
          <img v-show="selectedPaymentItem.id === e.id" class="selected" src="../assets/svg/badge-recommend-confirm.svg"
               alt="">
          <img class="icon" :src="e['iconUrl']" alt="">
          {{ e.typeName }}
        </div>
      </div>
    </v-container>
    <v-container class="subtitle-2 font-weight-bold white">
      <span class="pl-2">支付渠道</span>
      <v-divider class="my-1"></v-divider>
      <div class="py-2 channel-panel" v-if="channelList.length > 0">
        <div v-for="(e,index) in channelList" :key="index"
             class="d-flex justify-center align-center flex-column channel-item subtitle-2 font-weight-bold"
             :class="{'active-item':selectedChannelItem.id === e.id}"
             @click="changeChannelItem(e)">
          {{ e.frontendName }}
        </div>
      </div>
    </v-container>
    <v-container class="subtitle-2 font-weight-bold white">
      <span class="pl-2">存款金额</span>
      <v-divider class="my-1"></v-divider>
      <div v-if="quickMoneyItemList.length > 0">
        <div class="py-2 payment-money-panel">
          <div v-for="(e,index) in quickMoneyItemList" :key="index"
               class="d-flex justify-center align-center flex-column payment-money-item caption font-weight-bold"
               :class="{'active-item':selectedQuickMoneyItem.amount === e.amount}"
               @click="changeQuickMoneyItem(e)">
            ¥{{ e.amount }}
          </div>
        </div>
        <div class="mt-3 custom-panel">
          <span class="icon">¥</span>
          <v-text-field
              class="pl-6 pt-0 ma-0"
              placeholder="最低50, 最高10000"
              hide-details
              v-model="amount"
          ></v-text-field>
          <span class="append caption">0.15元</span>
        </div>
        <v-divider class="my-1"></v-divider>
        <div style="color: #97a4c5" class="caption">为了快速到账系统自动生成0.15元</div>
      </div>
    </v-container>
    <div class="px-3">
      <v-btn class="btn-bg" dark block elevation="0" height="44" @click="nextStep">下一步</v-btn>
    </div>
    <div class="caption text-center">如需帮助，请
      <span class="text-decoration-underline" style="color: #c09267;">联系客服</span>
    </div>
  </section>
</template>

<script>
import {queryByTenant, queryChannelByDepositType} from "@/api";

export default {
  name: "Home",
  data() {
    return {
      amount: null,
      paymentList: [],
      channelList: [],
      quickMoneyItemList: [],
      selectedPaymentItem: null,
      selectedChannelItem: null,
      selectedQuickMoneyItem: null,
      iconList: {
        // cornerIcon = 0:无, 1:热门, 2:火爆, 3:安全, 4:稳定, 5:推荐
        0: "",
        1: require("../assets/svg/corner-hot.svg"),
        2: require("../assets/svg/corner-fire.svg"),
        3: require("../assets/svg/corner-safe.svg"),
        4: require("../assets/svg/corner-save.svg"),
        5: require("../assets/svg/corner-recommend.svg")
      }
    }
  },
  mounted() {
    this.$store.dispatch("setPageTitle", "存款");
    this.getPaymentList()
  },
  methods: {
    changeQuickMoneyItem(e) {
      this.selectedQuickMoneyItem = e
    },
    changeChannelItem(e) {
      this.selectedChannelItem = e
    },
    changePaymentItem(e) {
      this.selectedPaymentItem = e
      this.getChannelList(e.typeCode)
    },
    getPaymentList() {
      queryByTenant().then(res => {
        this.paymentList = this.sortByKey(res, "sort")
        this.$set(this, "selectedPaymentItem", this.paymentList[0])
        this.getChannelList(this.selectedPaymentItem.typeCode)
      }).catch(err => {
        this.error = err
      })
    },
    getChannelList(typeCode) {
      queryChannelByDepositType({
        typeCode: typeCode
      }).then(res => {
        this.channelList = res
        if (this.channelList.length > 0) {
          this.$set(this, "quickMoneyItemList", this.channelList[0].quickPayment)
          this.$set(this, "selectedChannelItem", this.channelList[0])
          this.$set(this, "selectedQuickMoneyItem", this.channelList[0].quickPayment[0])
        } else {
          this.$set(this, "quickMoneyItemList", [])
        }
      })
    },
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        let val1 = a[key];
        let val2 = b[key];
        return Number(val1) - Number(val2);
      })
    },
    nextStep() {
      const payment = this.selectedPaymentItem
      let channel = this.selectedChannelItem
      // const item = this.selectedQuickMoneyItem
      channel["channelInfo"].amount = this.amount ? this.amount : this.selectedQuickMoneyItem.amount

      console.log('channel', channel)

      if (payment.typeCode === 0) {
        this.$router.push({name: "BankTransfer", params: channel})
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.home {
  > * {
    margin-bottom: 14px;
  }
}

.payment-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(60px, 60px);
  grid-column-gap: 12px;
  grid-row-gap: 10px;

  > .payment-item {
    position: relative;
    border-radius: 6px;
    border: solid 1px #eeeeee;

    &.active-item {
      border: solid 1px #d2b79c !important;

      > .selected {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    > .icon {
      max-height: 24px;
    }

    > .flag {
      position: absolute;
      top: -1px;
      right: -2px;
    }
  }
}

.channel-panel {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-auto-rows: minmax(35px, 35px);
  grid-column-gap: 12px;
  grid-row-gap: 10px;

  > .channel-item {
    position: relative;
    border-radius: 6px;
    border: solid 1px #eeeeee;
    padding-left: 12px;
    padding-right: 12px;

    &.active-item {
      border: solid 1px #6aaaf5 !important;
      color: #6aaaf5;

      > .selected {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}

.payment-money-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(35px, 35px);
  grid-column-gap: 12px;
  grid-row-gap: 10px;

  > .payment-money-item {
    position: relative;
    border-radius: 6px;
    border: solid 1px #eeeeee;
    padding-left: 12px;
    padding-right: 12px;

    &.active-item {
      border: solid 1px #6aaaf5 !important;
      color: #6aaaf5;

      > .selected {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}

.custom-panel {
  position: relative;

  .icon {
    position: absolute;
    left: 7px;
    top: 5px;
    bottom: 0;
    margin: auto;

    font-family: "DIN Condensed Web" !important;
    font-size: 16px;
    font-weight: 900;
  }

  .append {
    position: absolute;
    right: 3px;
    top: 6px;
    bottom: 0;
    margin: auto;

    color: #c09267;
  }
}

.btn-bg {
  background: rgba(210, 183, 156, 0.5) !important;
  border-radius: 10px;
}
</style>
<style>
.home .v-input__slot::after {
  border-color: transparent !important;
  background-color: transparent !important;
}

.home .v-input__slot::before {
  border-color: transparent !important;
  background-color: transparent !important;
}
</style>