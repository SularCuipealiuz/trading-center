<template>
  <v-app>
    <router-view name="head"></router-view>
    <v-main class="grey lighten-5 relative">
      <v-alert v-show="showAlert" transition="slide-y-reverse-transition" color="#0fcf51"
               close-icon="fal fa-times-circle"
               type="success" dense
               class="absolute rounded-0" dismissible>
        123
      </v-alert>
      <v-container fluid class="px-0 py-4">
        <router-view name="body"></router-view>
      </v-container>
    </v-main>

    <v-dialog
        v-model="showBankList"
        content-class="bottom-panel"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
        @click:outside="$store.dispatch('toggleBankList', false)"
    >
      <v-card color="#f4f4f4" tile>
        <v-toolbar
            class="header-panel"
        >
          <v-btn
              icon
              dark
              @click="$store.dispatch('toggleBankList', false)"
          >
            取消
          </v-btn>
          <v-toolbar-title class="subtitle-1">选择所属银行</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-0 pt-4">
          <div v-for="(e,index) in bankList" :key="index">
            <v-btn class="justify-start align-center py-6 bank-btn" block tile elevation="0" @click="selectBankItem(e)">
              {{ e.desc }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-overlay v-show="showBankList"></v-overlay>
  </v-app>
</template>

<script>

import {verify} from "@/api";
import {getToken} from "@/plugins/auth";
import {mapGetters} from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      bankList: "getBankList",
      showBankList: "getBankListPanel"
    })
  },
  data: () => ({
    //
    showAlert: false
  }),
  created() {
    let token = ""
    const url = new URL(location.href)
    if (url.searchParams.get('token') !== null) {
      token = "Bearer " + url.searchParams.get('token');
    } else if (sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== undefined) {
      token = "Bearer " + sessionStorage.getItem('token');
    } else if (getToken() !== undefined && getToken() !== null) {
      token = "Bearer " + getToken();
    }
    verify({
      token: token
    }).then(res => {
      this.$store.dispatch('setUserInfo', res)
      console.log('test:', res)
    })
  },
  mounted() {
  },
  methods: {
    selectBankItem(element) {
      this.$store.dispatch("selectBankItem", element.desc)
      this.$store.dispatch('toggleBankList', false)
    }
  }
};
</script>
<style lang="scss" scoped>

.relative {
  position: relative;

  .absolute {
    position: absolute;
    top: 0;

    width: 100%;
  }
}
</style>
<style lang="scss">
.v-alert {
  .v-icon {
    font-size: 20px !important;
  }
}

.header-panel {
  flex: 0 0 auto !important;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
  border-bottom: 1px solid #eeeeee !important;
}

.bottom-panel {
  height: auto !important;
  max-height: 80% !important;
  top: auto !important;
  bottom: 0 !important;
  border-top-right-radius: 15px !important;
  border-top-left-radius: 15px !important;

  .v-toolbar__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .v-btn {
      position: absolute;
      left: 16px;
      margin: auto;

      .v-btn__content {
        color: #c09267;
        font-weight: bold;
      }
    }

    .v-toolbar__title {
      padding-left: 0px;
    }
  }
}


.bank-btn {
  border-bottom: 1px solid #eeeeee !important;
  background-color: white !important;
}
</style>
