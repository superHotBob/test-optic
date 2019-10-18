export default () => ({
    endpoint: {
        user:'/api/v1/user/',
        login:'/api/v1/user/login/',
        register:'/api/v1/user/register/',
        forgotpassword:'/api/v1/user/forgotpassword/',
        changepassword:'/api/v1/user/changepassword/',
        logout:'/api/v1/user/logout/',
        update:'/api/v1/user/update/'
    },
    city: false,
    logged: false,
    user: {},
})
