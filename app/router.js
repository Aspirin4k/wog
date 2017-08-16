import Vue from 'vue';
import VueRouter from 'vue-router';

import missionList from './components/pages/mission-list/mission-list.vue';
import missionCreate from './components/pages/mission-create/mission-create.vue';
import missionDetail from './components/pages/mission-detail/mission-detail.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: missionList, name: 'main' },
        { path: '/create', component: missionCreate, name: 'create' },
        { path: '/detail/:id', component: missionDetail, name: 'detail' },
        { path: '/edit/:id', component: missionCreate, name: 'edit' },
        { path: '/edit', redirect: '/create' },
        { path: '/detail', redirect: '/' }
    ]
});

export default router;