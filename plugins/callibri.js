/* eslint-disable */

export default ({ app }) => {
    /*
    ** Only run on client-side and only in production mode
    */
    if (process.env.NODE_ENV !== 'production') return
    !function(){
        var t=document.createElement("script");
        t.type="text/javascript",
            t.async=!0,t.src="//cdn.callibri.ru/callibri.js",
            document.head.appendChild(t)
    }();
}