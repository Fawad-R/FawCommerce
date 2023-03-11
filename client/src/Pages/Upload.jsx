// // import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// // const storage = getStorage();

// // // Create the file metadata
// // /** @type {any} */
// // const metadata = {
// //   contentType: 'image/jpeg'
// // };

// // // Upload file and metadata to the object 'images/mountains.jpg'
// // const storageRef = ref(storage, 'images/' + file.name);
// // const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// // // Listen for state changes, errors, and completion of the upload.
// // uploadTask.on('state_changed',
// //   (snapshot) => {
// //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
// //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// //     console.log('Upload is ' + progress + '% done');
// //     switch (snapshot.state) {
// //       case 'paused':
// //         console.log('Upload is paused');
// //         break;
// //       case 'running':
// //         console.log('Upload is running');
// //         break;
// //     }
// //   }, 
// //   (error) => {
// //     // A full list of error codes is available at
// //     // https://firebase.google.com/docs/storage/web/handle-errors
// //     switch (error.code) {
// //       case 'storage/unauthorized':
// //         // User doesn't have permission to access the object
// //         break;
// //       case 'storage/canceled':
// //         // User canceled the upload
// //         break;

// //       // ...

// //       case 'storage/unknown':
// //         // Unknown error occurred, inspect error.serverResponse
// //         break;
// //     }
// //   }, 
// //   () => {
// //     // Upload completed successfully, now we can get the download URL
// //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// //       console.log('File available at', downloadURL);
// //     });
// //   }
// // );

// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const storage = getStorage();

// // Create the file metadata
// /** @type {any} */
// const metadata = {
//   contentType: 'image/jpeg'
// };

// // Upload file and metadata to the object 'images/mountains.jpg'
// const storageRef = ref(storage, 'images/' + file.name);
// const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on('state_changed',
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;

//       // ...

//       case 'storage/unknown':
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//     }
//   }, 
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// );
import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from './Firebase.jsx'
const Upload = () => {
  let [state,updateState]=useState({})
  let [state2,updateState2]=useState({})
  let [state3,updateState3]=useState(null)
  let inputEvent=(e)=>{
  updateState({...state,[e.target.name]:e.target.value});
  // console.log('state',state);
  }
  let imgEvent=(e)=>{
    // console.log(e.target.files[0]);
    updateState2({[e.target.name]:e.target.files[0]});
    updateState3(true)
    uploading(e.target.files[0],'img')
    // console.log('state2',state2);
    // console.log('state2',e.target.files[0]);
  }
  
  let uploading = async(file,urlType) => {
    // console.log('uploading');
    // const storage = getStorage();
  // /** @type {any} *//
  // console.log('fileee',file);
  const metadata = {
    contentType: 'image/jpeg'
  };
  let name = new Date().getTime()+ file.name;
  const storageRef = ref(storage, name );
  // const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  // , metadata
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          // console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
          case 'storage/unknown':
          break;
          }
        }, 
        () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        updateState((prev)=>{
          return {...prev,[urlType]:downloadURL}
      })
      });
    }
  );
}
  let SubmitEvent=async(e)=>{
  e.preventDefault();
  // console.log(state);
  let val=await fetch('/product',{
    "method":"POST",
    "headers":{
      "content-Type":"application/json"
    },
    body:JSON.stringify(state)
  })
  // console.log(val);
  }
  return (
    <div className='Upload'>
      <form action="" method="post">
      <h3 style={{"marginTop":"5%"}}>Add Products</h3>
      <input type="text" onChange={inputEvent} className='textInput' placeholder='title' name="title" id="" />
      <input type="text" onChange={inputEvent} className='textInput' placeholder='desc' name="desc" id="" />
      <label style={{"margin":"0%"}} htmlFor="image">Select Product Image</label>
      <input type="file" onChange={imgEvent} name="image" id="image" />
      <input type="text" onChange={inputEvent} className='textInput' placeholder='categories' name="categories" id="" />
      {/* <input type="number" min="1" className='textInput' placeholder='price' name="price" id="" /> */}
      <input type="number" onChange={inputEvent}  min="1" className='textNum' placeholder='size' name="size" id="" />
      <label style={{"margin":"0%"}} htmlFor="image">Pick color</label>
      <input type="color" onChange={inputEvent}  name="color" id="" />
      <input type="number" onChange={inputEvent}  min="1" className='textNum' placeholder='price' name="price" id="" />
      <input style={{"marginBottom":"2%"}} onClick={SubmitEvent} type="submit" value="Add product" />
      {/* <input type="range" name="" id="" /> */}
      </form>
    </div>
  )
}

export default Upload