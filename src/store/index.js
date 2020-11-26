import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageTitle: "",
    showAlert: false,
    bankList: [],
    bankListPanel: false,
    bankItem: null
  },
  mutations: {
    SET_PAGE_TITLE(state, title) {
      state.pageTitle = title;
    },
    SET_ALERT_STATE(state, boolean) {
      state.showAlert = boolean;
    },
    SET_BANK_LIST(state, payload) {
      state.bankList = payload
    },
    TOGGLE_BANK_LIST(state, boolean) {
      state.bankListPanel = boolean
    },
    SELECT_BANK_ITEM(state, payload) {
      state.bankItem = payload
    }
  },
  actions: {
    setPageTitle({commit}, title) {
      commit("SET_PAGE_TITLE", title);
    },
    setAlertState({commit}, boolean) {
      commit("SET_ALERT_STATE", boolean);
    },
    setBankList({commit}, payload) {
      commit("SET_BANK_LIST", payload);
    },
    toggleBankList({commit}, boolean) {
      commit("TOGGLE_BANK_LIST", boolean);
    },
    selectBankItem({commit}, payload) {
      commit("SELECT_BANK_ITEM", payload);
    }
  },
  modules: {},
  getters: {
    getMcPageTitle(state) {
      return state.pageTitle;
    },
    getAlertState(state) {
      return state.showAlert
    },
    getBankList(state) {
      return state.bankList
    },
    getBankListPanel(state) {
      return state.bankListPanel
    },
    getBankItem(state) {
      return state.bankItem
    }
  }
});
