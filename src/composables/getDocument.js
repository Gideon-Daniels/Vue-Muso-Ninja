import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {

    const document = ref(null)
    const error = ref(null)

    // reference to collection
    let documentRef = projectFirestore
        .collection(collection).doc(id)

       // setup realtime listener to single document
    const unsub = documentRef.onSnapshot( (doc) => {
        // check if document exists
        if(doc.data()){
            document.value = {...doc.data(), id: doc.id}
            error.value = null;
        }else{
            error.value = 'that document does not exist'
        }
    }, (err) => {
        console.log(err.message);
        error.value = 'could not fetch document';
    });
// run when component unmounts
    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        // unsubscribes from realtime listeners
        onInvalidate(() => unsub())
    })

    return { document, error } 
}

export default getDocument