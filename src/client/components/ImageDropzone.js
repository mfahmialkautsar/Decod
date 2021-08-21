import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useLocation } from 'react-router-dom';

export default function ImageDropzone({ setFiles, files, canvas, submit }) {
  const [inputMessage, setInputMessage] = useState('Add Image or Drag here');
  const location = useLocation();

  useEffect(() => {
    if (submit) {
      const uploaderWrapper = document.getElementById('uploader-wrapper');
      if (files.length === 0) {
        uploaderWrapper.classList.add('uploader--invalid');
      } else {
        uploaderWrapper.classList.remove('uploader--invalid');
      }
    }
  }, [submit, files]);

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onDrop = (accepted, rejected) => {
    if (Object.keys(rejected).length > 0) {
      setFiles([]);
      setInputMessage('Please submit a valid image');
    } else {
      setFiles(
        accepted.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
      setInputMessage('Add Image or Drag here');

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = function () {
          const ctx = document.getElementById('object-canvas').getContext('2d');
          ctx.canvas.width = img.width;
          ctx.canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(accepted[0]);
    }
  };

  const thumbsContainer = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };
  const thumbs = files.map((file, i) => (
    <img key={i} style={thumbsContainer} src={file.preview} alt="Preview" />
  ));
  const rootStyle =
    files.length > 0
      ? {
          height: 'max-content',
        }
      : {};
  const render = (isDragReject) => {
    if (isDragReject) {
      return 'Please submit a valid image';
    }
    return Object.keys(files).length > 0 ? (
      files.map(() => thumbs)
    ) : (
      <p>{inputMessage}</p>
    );
  };

  const pathname = location.pathname.split('/');
  const currentPath = pathname[1].toLowerCase();
  const specificClass = `dropzone-image--${currentPath}`;

  return (
    <Dropzone accept="image/*" multiple={false} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragReject }) => (
        <div
          id="uploader-wrapper"
          {...getRootProps()}
          className={`dropzone-image ${specificClass}`}
          style={{ ...rootStyle, cursor: 'pointer' }}
        >
          <input
            id="uploader"
            className="uploader"
            {...getInputProps()}
            // required
          />
          <canvas
            id="object-canvas"
            className="d-none output-img"
            ref={canvas}
          />
          {render(isDragReject)}
        </div>
      )}
    </Dropzone>
  );
}
