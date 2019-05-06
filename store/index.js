export const actions = {
    nuxtServerInit({ dispatch }, { $axios, req, res }) {
        $axios.setHeader('cookie', req.headers.cookie);
        return Promise.all([
            dispatch('user/state'),
            dispatch('catalog/nuxtServerInit'),
            dispatch('order/state'),
            dispatch('basket/state').then(response => {
                res.setHeader('Set-Cookie', response.headers['set-cookie']);
            }),
        ]);
    }
}
