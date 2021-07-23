/* eslint-disable */

export default ({ app }) => {
    /*
    ** Only run on client-side and only in production mode
    */
    if (process.env.NODE_ENV !== 'production') return


    !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?162",t.onload=function(){VK.Retargeting.Init("VK-RTRG-439571-1BWpn"),VK.Retargeting.Hit()},document.head.appendChild(t)}();

}