import Vue from 'vue';
import App from './App.vue';

// import CurModal from './plugins/curModal';
import './index';

import store from './store'

Vue.config.productionTip = false;

// Vue.use(CurModal);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
