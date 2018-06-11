import Vuex from 'vuex';
import Vue from 'vue';
import io from 'socket.io-client';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        socket:io("http://localhost:3000"),
    },
    getters: {
        socket: state => {
            return state.socket;
        }
    }
})
export default store;