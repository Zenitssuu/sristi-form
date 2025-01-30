import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import { db } from "./firebase.js";

export const uploadImage = async (file, email) => {
  const storage = getStorage();
  const storageRef = ref(storage, `image/${email}/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Upload failed:", error.message);
    return error;
  }
};

export const storeUser = async ({
  college,
  name,
  email,
  year,
  roll,
  phone,
  event,
  paymentUrl,
  department,
}) => {
  try {
    const newDoc = await addDoc(collection(db, "Users"), {
      name: name,
      college: college,
      email: email,
      year: year,
      roll: roll,
      phone: phone,
      event: event,
      payment: paymentUrl,
      department: department,
    });
    console.log(newDoc);

    return newDoc;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
