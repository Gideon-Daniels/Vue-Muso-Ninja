import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query ) => {
    const documents = ref(null)
    const error = ref(null)
    // reference to collection
    let collectionRef = projectFirestore
        .collection(collection)
        .orderBy('createdAt')

    if (query) {
        collectionRef = collectionRef.where(...query)
    }
    
       // setup realtime listener with onSnapShot 
    const unsub = collectionRef.onSnapshot( (snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
            
            //  must wait for the server to create the timestamp & send it back
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id})
        });

        // update values
        documents.value = results;
        error.value = null;
    }, (err) => {
        console.log(err.message);
        documents.value = null;
        error.value = 'could not fetch data';
    });

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsub())
    })

    return { documents, error } 
}

export default getCollection