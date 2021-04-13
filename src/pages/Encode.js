import { useRef, useState } from 'react';
import sjcl from 'sjcl';
import ImageDropzone from '../components/ImageDropzone';
import { encodeMessage } from '../hooks';
import Layout from '../shared/Layout';

function Encode() {
  const output = useRef(null);
  const canvas = useRef(null);
  const [files, setFiles] = useState([]);
  const [submit, setSubmit] = useState(false);

  // function cleanResource() {
  // 		// wipe all the fields clean
  // 		document.getElementById('object-message').value = '';
  // 		document.getElementById('encode-key').value = '';
  // 		document.getElementById('page-encode__result').classList.add('d-none');
  // 		output.current.src = "";
  // }

  // encode the image and save it
  function encode() {
    let objectMessage = document.getElementById('object-message').value;
    const encryptKey = document.getElementById('encode-key').value;
    const ctx = canvas.current?.getContext('2d');

    // encrypt the message with supplied key if necessary
    if (encryptKey.length > 0) {
      objectMessage = sjcl.encrypt(encryptKey, objectMessage);
    } else {
      objectMessage = JSON.stringify({ text: objectMessage });
    }

    // exit early if the message is too big for the image
    const pixelCount = ctx.canvas.width * ctx.canvas.height;
    if ((objectMessage.length + 1) * 16 > pixelCount * 4 * 0.75) {
      alert('Message is too big for the image.');
      return;
    }

    // artificially limit the message size
    const maxMessageSize = 1000;

    // exit early if the message is above an artificial limit
    if (objectMessage.length > maxMessageSize) {
      alert('Message is too big.');
      return;
    }

    // encode the encrypted message with the supplied key
    const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    encodeMessage(
      imgData.data,
      sjcl.hash.sha256.hash(encryptKey),
      objectMessage
    );
    ctx.putImageData(imgData, 0, 0);

    // view the new image
    const result = document.getElementById('page-encode__result');
    result.classList.remove('d-none');
    result.scrollIntoView({ block: 'start', behavior: 'smooth' });
    output.current.src = canvas.current.toDataURL();
  }

  const downloadFile = () => {
    const fileName = files[0].name;
    const btnDownload = document.getElementById('btn-download');
    btnDownload.setAttribute('download', `[output] ${fileName}`);
    btnDownload.setAttribute('href', output.current.src);
    btnDownload.click();
  };

  function handleDownload(e) {
    e.preventDefault();
    downloadFile();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
    if (files.length === 0) return;
    encode();
  }

  return (
    <Layout title="Encode">
      <div className="page-encode-decode">
        <div className="page-encode">
          <div className="page-encode__wrapper">
            <div className="page-encode__main">
              <h1 className="page-encode__title">Encode Now</h1>
              <p className="page-encode__description">
                Secured your message and image now
              </p>
              <form onSubmit={handleSubmit}>
                <ImageDropzone
                  setFiles={setFiles}
                  files={files}
                  canvas={canvas}
                  submit={submit}
                />
                <textarea
                  id="object-message"
                  maxLength="1000"
                  placeholder="Input your message here"
                  className="page-encode__text-input"
                  required
                />
                <input
                  id="encode-key"
                  type="password"
                  placeholder="Key (optional)"
                  className="page-encode__key-input"
                />
                <button
                  type="submit"
                  id="btn-encode"
                  className="page-encode__btn-start"
                >
                  Encode Now
                </button>
              </form>
            </div>
            <div
              id="page-encode__result"
              className="page-encode__result d-none"
            >
              <h2 className="page-encode__result__title">Encoded</h2>
              <img
                id="object-output"
                alt="Output"
                className="page-encode__result__img output-img"
                ref={output}
              />
              <button
                type="button"
                className="page-encode__result__save"
                onClick={handleDownload}
              >
                Save Picture
              </button>
              <a id="btn-download" hidden />
            </div>
          </div>
          <img
            src="/images/encode-bottom.svg"
            alt=""
            className="page-encode__img-bottom"
          />
        </div>
      </div>
    </Layout>
  );
}

export default Encode;
