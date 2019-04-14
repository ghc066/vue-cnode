import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		isLogin: false,
		userInfo: {},
		accessToken: "",
		topics: {
			job: [],
			all: [],
			good: [],
			share: [],
			ask: []
		}
	},
	getters: {
		getTopics: state => state.topics,
		getToken: state => state.accessToken,
		getIsLogin: state => state.isLogin,
		getUserInfo: state => state.userInfo,
	},
	mutations: {
		setLogin(state, data) {
			state.isLogin = data;
		},
		setUserInfo(state, data) {
			state.userInfo = data;
		},
		setTopics(state, data) {
			var type = data.type;
			state.topics[type] = data.data;
		},
		setAddTopics(state, data) {
			var type = data.type;
			state.topics[type] = state.topics[type].concat(data.data);
		}
	},
	actions: {
		ActionLogin({
			commit
		}, data) {
			commit("setLogin", data);
		},
		ActionUserInfo({
			commit
		}, data) {
			commit("setUserInfo", data);
		},
		ActionTopics({
			commit
		}, data) {
			commit("setTopics", {
				data: data.data,
				type: data.type
			});
		},
		ActionAddTopics({
			commit
		}, data) {
			commit("setAddTopics", data)
		}
	}
})