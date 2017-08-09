import Vue from 'vue';
import VueRouter from 'vue-router';

import missionList from './components/pages/mission-list/mission-list.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: missionList }
    ]
});

export default router;