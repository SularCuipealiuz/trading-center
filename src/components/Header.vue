<template>
  <v-app-bar app color="white" flat height="44" class="app-bar-shadow">
    <v-icon class="go-back" size="20" @click="goBack">
      far fa-chevron-left
    </v-icon>
    <div class="d-flex align-center ma-auto font-weight-bold">
      {{ title }}
    </div>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      title: "getMcPageTitle"
    })
  },
  methods: {
    goBack() {
      if (this.$route.name !== "Home") {
        this.$router.go(-1)
      } else {
        this.leaveDeposit()
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
    }
  }
};
</script>

<style lang="scss" scoped>
.app-bar-shadow {
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08) !important;
}
</style>
