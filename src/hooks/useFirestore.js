import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

function useFirestore(collection) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // .onSnapshot is fired on every change in the database
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const documents = [];

        snap.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
}

export default useFirestore;
