import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useFirestore from "../hooks/useFirestore";

function ImageGrid({ setSelectedImg }) {
  const { docs } = useFirestore("images");

  useEffect(() => {
    const images = document.querySelectorAll("[data-src]");

    function preloading(img) {
      const src = img.getAttribute("data-src");
      if (!src) return;
      img.src = src;
    }

    const imgOptions = {
      threshold: 0,
      rootMargin: "0px 0px 0px 0px",
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        preloading(entry.target);
        console.log(entry.target);

        observer.unobserve(entry.target);
      });
    }, imgOptions);

    images.forEach((image) => {
      observer.observe(image);
    });
  }, [docs.length]);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              data-src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }} // 1sec
            />
          </motion.div>
        ))}
    </div>
  );
}

export default ImageGrid;
