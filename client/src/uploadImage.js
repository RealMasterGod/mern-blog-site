import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "./firebase";

export const upload = (file) => {
    const fileName =  Date.now()+file.name
    return new Promise((resolve,reject) => {
        const storage = getStorage(app);
        const storageRef = ref(storage,'images/'+fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
            }, 
            (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    reject(error)
                    break;
                    case 'storage/canceled':
                    // User canceled the upload
                    reject(error)
                    break;
            
                    // ...
            
                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    reject(error)
                    break;
                }
            }, 
            () => {
            // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        )
    })
}