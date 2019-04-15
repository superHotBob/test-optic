export const actions = {
    async nuxtServerInit({ dispatch }, { $axios, req, res }) {
        console.log(req.headers.cookie);
        $axios.setHeader('cookie', req.headers.cookie);
        return Promise.all([
            dispatch('basket/request').then(response => {
                res.setHeader('Set-Cookie', response.headers['set-cookie']);
            }),
        ]);
    }
}
