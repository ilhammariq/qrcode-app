import { QRCodeCanvas } from 'qrcode.react';
import React, { useState, useRef } from 'react';
import LOGO from '../assets/Logo.png';
import { Rings } from 'react-loader-spinner';
const QrCode = () => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector('canvas');
    let image = canvas.toDataURL('image/png');
    let anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const generateQR = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUrl(text);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const qrcode = (
    <QRCodeCanvas id='qrCode' value={url} size={300} level={'H'} />
  );

  return (
    <div className='app'>
      <div className='app-form'>
        <h1>QR Code Generator</h1>
        <input
          type='text'
          placeholder='Enter text or link to generate QR CODE'
          className='form-qr'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className='btn-qr' onClick={generateQR}>
          Generate
        </button>
      </div>
      {isLoading ? (
        <div className='app-result'>
          <Rings color='#4285f4' height={80} width={80} />
        </div>
      ) : url ? (
        <div className='app-result'>
          <div ref={qrRef} className='app-qrcode'>
            {qrcode}
          </div>
          <button className='btn-qr' onClick={downloadQRCode}>
            Download
          </button>
        </div>
      ) : (
        <div className='app-result'>
          <img className='img-logo' src={LOGO} alt='' />
        </div>
      )}
    </div>
  );
};

export default QrCode;
