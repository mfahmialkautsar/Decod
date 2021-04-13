import Layout from '../shared/Layout';
import sjcl from 'sjcl';
import { decodeMessage } from '../hooks';
import { useRef, useState } from 'react';
import ImageDropzone from '../components/ImageDropzone';

function Decode() {
  const canvas = useRef(null);
  const [files, setFiles] = useState([]);
  const [submit, setSubmit] = useState(false);

  // function cleanResource() {
  //   document.getElementById('decode-key').value = '';
  //   document.getElementById('object-message--decoded').innerHTML = '';
  // }

  // decode the image and display the contents if there is anything
  function decode() {
    const decryptKey = document.getElementById('decode-key').value;
    console.log(decryptKey);
    const keyFail = 'Key is incorrect or there is nothing here.';

    // decode the message with the supplied key
    const ctx = canvas.current?.getContext('2d');
    const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const message = decodeMessage(
      imgData.data,
      sjcl.hash.sha256.hash(decryptKey)
    );

    // try to parse the JSON
    let obj = null;
    try {
      obj = JSON.parse(message);
    } catch (e) {
      if (decryptKey.length > 0) {
        alert(keyFail);
      }
    }

    if (obj) {
      // decrypt if necessary
      if (obj.ct) {
        try {
          obj.text = sjcl.decrypt(decryptKey, message);
        } catch (e) {
          alert(keyFail);
        }
      }

      // escape special characters
      const escChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '\n': '<br/>',
      };
      const escHtml = function (string) {
        return String(string).replace(/[&<>"'\/\n]/g, function (c) {
          return escChars[c];
        });
      };
      document.getElementById('object-message--decoded').innerHTML = escHtml(
        obj.text
      );
      const result = document.getElementById('page-decode__result');
      result.classList.remove('d-none');
      result.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
    if (files.length === 0) return;
    decode();
  }

  return (
    <Layout title="Decode">
      <div className="page-encode-decode">
        <div className="page-decode">
          <div className="page-decode__wrapper">
            <div className="page-decode__main">
              <h1 className="page-decode__title">Decode Now</h1>
              <p className="page-decode__description">
                Find hidden message inside your image
              </p>
              <form onSubmit={handleSubmit}>
                <ImageDropzone
                  setFiles={setFiles}
                  files={files}
                  canvas={canvas}
                  submit={submit}
                />
                <input
                  id="decode-key"
                  type="password"
                  placeholder="Key"
                  className="page-decode__key-input"
                />
                <button
                  type="submit"
                  id="btn-decode"
                  className="page-decode__btn-start"
                >
                  Decode Now
                </button>
              </form>
            </div>
            <div
              id="page-decode__result"
              className="page-decode__result d-none"
            >
              <h2 className="page-decode__result__title">Hidden Message</h2>
              <p
                id="object-message--decoded"
                className="page-decode__result__message"
              ></p>
            </div>
          </div>
          <canvas id="object-canvas" className="d-none output-img"></canvas>
          <img
            src="/images/decode-bottom.svg"
            alt=""
            className="page-decode__img-bottom"
          />
        </div>
      </div>
    </Layout>
  );
}

export default Decode;
