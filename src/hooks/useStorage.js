import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  // this function need to run everytime user selects a new image, so use useEffect
  useEffect(() => {
    const filename = `${Math.random() * 10000000000}-${file.name}`;
    // references
    const storageRef = projectStorage.ref(filename); // here we're creating a
    // reference to a file inside the default firebase storage bucket, now that
    // file doesn't exist yet, we're just saying that when we upload something
    // using this reference the file have this name (ref(...)) inside the default
    // bucket
    const collectionRef = projectFirestore.collection("images");
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        // this function will run when the file is fully uploaded
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
