export default defineNuxtRouteMiddleware(() => {
    const authCookie = useCookie('testAuth', {});
    // authCookie.value = 'cheesecake';
    console.log('here', authCookie.value);
});

