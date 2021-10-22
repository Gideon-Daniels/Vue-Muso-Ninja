import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

const logout = async () => {
    error.value = null
    try {
        // send request to firebase signout user from database
        await projectAuth.signOut()
    } catch (error) {
        console.log(err.message)
        error.value = err.message
    }



}

const useLogout = () => {
    return { logout, error}
}

export default useLogout
