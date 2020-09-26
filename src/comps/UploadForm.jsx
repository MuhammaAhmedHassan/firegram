import React, { useState, useRef } from "react";
import ProgressBar from "./ProgressBar";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageEl = useRef(null);
  const uploadFileRef = useRef(null);

  const types = ["image/png", "image/jpg", "image/jpeg"];

  const changeHandler = (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setLoading(true);
      setFile(selected);
      setError("");

      const reader = new FileReader();
      reader.onload = function (e) {
        imageEl.current.setAttribute("src", e.target.result);
      };

      reader.readAsDataURL(selected);
    } else {
      setLoading(false);
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };
  return (
    <form>
      {file && <img ref={imageEl} className="image-to-upload" />}
      <label aria-disabled={loading ? "true" : "false"}>
        <input
          ref={uploadFileRef}
          type="file"
          accept="image/*"
          disabled={loading}
          onChange={changeHandler}
        />
        {/* <span onClick={() => uploadFileRef.current.click()}>+</span> */}
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error"> {error} </div>}
        {file && (
          <ProgressBar setLoading={setLoading} file={file} setFile={setFile} />
        )}
      </div>
    </form>
  );
}

export default UploadForm;
