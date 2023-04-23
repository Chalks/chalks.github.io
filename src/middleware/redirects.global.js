// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => {
    if (to.name === 'tpthemer' && to.hash) {
        return navigateTo(`/tpthemer?theme=${to.hash.substr(1)}`, {replace: true});
    }
});