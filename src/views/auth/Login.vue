<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password"  v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button >Login</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'

export default {
  setup(){
    const email = ref('')
    const password = ref('')

    const { error, login} = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if(!error.value){
        console.log('User logged in')
      }
    }

    return {password, email, handleSubmit, error}
  }


}
</script>

<style>

</style>