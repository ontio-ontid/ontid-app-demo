document.addEventListener('click', (e) => {
    var e = e || window.event;
    var target = e.target || ev.srcElement;
    if(target.getAttribute('data-ontid-btn') === 'login') {
        loadLoginPage();
    }
})

/*
1. 读取meta
2. window.open
3. window.postMessage
*/
function loadLoginPage() {
    const targetUrl = 'http://172.168.3.47/#/signIn'
    const windowName = 'ONT_ID_Open_Platform'
    const windowFeatures = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,height=600,width=600"
    windowRef = window.open(targetUrl, windowName, windowFeatures)

}

window.addEventListener('message', function (e) {
    const ontidOrigin = 'http://172.168.3.47'
    if(e.origin !== ontidOrigin) return;
    alert('received: ' + JSON.stringify(event.data))
})