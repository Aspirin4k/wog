import Vue from 'vue';
import VueRouter from 'vue-router';

import missionList from './components/pages/mission-list/mission-list.vue';
import missionCreate from './components/pages/mission-create/mission-create.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: missionList },
        { path: '/create', component: missionCreate }
    ]
});

export default router;