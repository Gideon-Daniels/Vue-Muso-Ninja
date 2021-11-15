<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <!-- upload playlist image -->
    <label>Upload Playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>

    <div class="error"></div>
    <button v-if="!isPending">Create</button>
     <button v-else disabled >Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage  from '@/composables/useStorage'
import useCollection from '@/composables/useCollections'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'

export default {
    setup(){
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('playlists')
        const { user } = getUser()
        
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const handleSubmit = async () => {
            if(file.value){
                // start isPending
                isPending.value = true
               await uploadImage(file.value)
               await addDoc({
                title: title.value,
                description: description.value,
                userId: user.value.uid,
                userName: user.value.displayName,
                coverUrl: url.value,
                filePath: filePath.value,
                songs: [],
                createdAt: timestamp()
               })
               // end isPending
                isPending.value = false
               if (!error.value){
                   console.log('playlist added')
               }
            }
        }


        // allowed file types
        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected)
            
            if(selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpg)'
            }
        }

        return {isPending, title, description, handleChange, handleSubmit, fileError }
    }
}
</script>

<style>
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }

</style>