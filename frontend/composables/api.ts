import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
     baseURL: "http://127.0.0.1:8000"
})

// Set default header
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.headers.common["Accept"] = "application/json";
if (Cookies.get('access_token')) {
    api.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("access_token")}`;
}

// Add interceptor on response
api.interceptors.response.use((response) => {
    // Check if the response is Unauthorized (401)
    if (response.status === 401) {
        // Try to refresh token first
        // useCookie('access_token').value = null
        return api.post("/oauth/token", {
            refreshToken: Cookies.get("refresh_token")
        }).then((response) => {
            if (response.status === 200) {
                // If refresh token success, save the new token
                console.log('refresh token success')
                Cookies.set("access_token", response.data.accessToken);
                Cookies.set("refresh_token", response.data.refreshToken);
            
            } else {
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
            }
        }).catch((error) => {

            console.log('refresh token failed')
            // If refresh token failed, remove the token
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            return error;
        })
    }
    return response
})


export default api;
