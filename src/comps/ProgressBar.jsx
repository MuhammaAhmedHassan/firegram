import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";

function ProgressBar({ file, setFile, setLoading }) {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      setLoading(false);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
}

export default ProgressBar;
