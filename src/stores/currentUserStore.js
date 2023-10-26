
import { reactive } from 'vue'
import Cookies from 'js-cookie';
import { postLogin, getTokenInfo } from '../api/api-authentification'

export const currentUserStore = reactive({
    user: null,
    connected: false,
    loading: false,
    id: null,
    token: null,
    async loginWithToken() {
        this.loading = true;
        let token = Cookies.get('token')
        if (token) {
            this.user = await getTokenInfo(token)
            if (this.user) {
                this.initUser()
            } else {
                this.connected = false;
            }
        }
        this.loading = false;
    },
    async loginWithAuth(email, password, errorCallback) {
        this.loading = true;
        this.user = await postLogin(email, password).catch(errorCallback)
        if (this.user) {
            this.initUser()
        } else {
            this.connected = false
        }
        this.loading = false;
        return this.user
    },
    initUser() {
        Cookies.set('token', this.user.token);
        this.id = this.user.id;
        this.token = this.user.token
        this.connected = true;
    },
    disconnect() {
        Cookies.remove('token', { path: '' })
        this.user = null;
        this.id = null;
        this.connected = false;
    }
})