import { useRouter } from "vue-router";
import Cookies from 'js-cookie';

const authMiddleware = async (to) => {
    const router = useRouter()
    const token = Cookies.get('access_token')

    if (to.path === '/') {
        if (token != null) {
            // Redirect to Home
            console.log('Welcome')
            await router.push('/Dashboard')
        }
    } else {
        // Redirect to Login if Token is invalid
        if (token == null) {
            console.log('Redirect to Login')
            await router.push('/')
        }
    }
};

export default authMiddleware;