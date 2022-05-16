const CheckAdmin = () => {
    var cookieArr = document.cookie.split(";");
    var data = "";
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if("role" === cookiePair[0].trim()) {
            data = decodeURIComponent(cookiePair[1]);
        }
    }
    return data;
}

export default CheckAdmin;