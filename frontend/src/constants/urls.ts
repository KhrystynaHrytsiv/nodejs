const pizza = '/pizzas';
const auth ='/auth';
export const urls = {
    pizza,
    auth:{
        login: `${auth}/signIn`,
        register: `${auth}/singUp`,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`
    }
}