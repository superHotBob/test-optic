export default () => ({
    view: true,
    endpoint: {
        sections:'/api/v1/catalog/',
        favorites:'/api/v1/catalog/favorites/',
        bestsellers:'/api/v1/catalog/bestsellers/',
        elements:'/api/v1/catalog/elements/',
        compare:'/api/v1/catalog/compare/'
    },
    favorites: {
        items: {},
        count: {}
    },
    compare: {
        items: {},
        count: {}
    },
    newItems: {},
    bestsellers: {},
    sections: {},
})