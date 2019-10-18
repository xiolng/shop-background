export const setCookie = cookies =>
    localStorage.setItem("cookieList", JSON.stringify(cookies))
export const getCookie = () => JSON.parse(localStorage.getItem("cookieList"))
export const clearStorage = () => localStorage.clear()
export const openUrl = link => {
    // console.log(8888888, link)
    if (link.links.indexOf("localhost") >= 0) {
        window.location.href = `/login`
        return false
    }
    if (link.links.indexOf("-dev") >= 0) {
        // console.log(9999999,this.props)
        window.location.href = `http://172.16.1.61:8080/${
            link.status
            }?service=http://${link.links}`
        return false
    }
    window.location.href = `https://sso.youxin.com/${link.status}?service=${
        link.links
        }`
}

export const goLogout = () => {
    const links = window.location.origin
    openUrl({
        status: "logout",
        links
    })
    // console.log('没有token', this.$store)
}
