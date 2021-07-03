import './App.css';
import axios from 'axios'
import React, { useState } from 'react';

function App() {
  const [inputFile, setInputFile] = useState(null)
  const [input, setInput] = useState({
    vdoCode: 'lixbx264', bitrate: '1000', to: 'mp4', scale: '640x480'
  })

  function inputChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value
      };
    });
  }

  function vdoChange(event) {
    console.log(event.target.files[0])
    setInputFile(event.target.files[0])
  }
  function submitClick(event) {
    event.preventDefault()
    let data = new FormData();
    data.append('file', inputFile, {
      vdoCode: input.vdoCode, bitrate: input.bitrate, to: input.to, scale: input.scale
    }
    );
    axios.post('http://127.0.0.1:5000/convert', data).then((respond) => { console.log(respond) })
  }
  return (
    <div class="container">
      <br /><br />
      <h1>Online Video Converter</h1>
      <form onSubmit={submitClick} >
        <div class="form-group">
          <input type="file" name="file" onChange={(event) => vdoChange(event)} />
        </div>
        <div class="row">
          <div class="col-sm form-group">
            <label for="vdoCode">Vdo-code:</label>
            <select class="form-control" name="vdoCode" onChange={inputChange}>
              <option>libx264</option>
              <option>H.261</option>
              <option>H.263</option>
              <option value="MPEG-1">MPEG-1</option>
            </select>
          </div>
          <br />
          <div class="col-sm form-group">
            <label for="bitrate">Bitrate:</label>
            <select class="form-control" name="bitrate" onChange={inputChange}>
              <option>1000</option>
              <option>2000</option>
              <option>3000</option>
              <option>4000</option>
              <option>5000</option>
              <option>6000</option>
              <option>7000</option>
              <option>8000</option>
              <option>9000</option>
              <option>10000</option>
              <option>11000</option>
              <option>15000</option>
              <option>20000</option>
              <option>30000</option>
              <option>40000</option>
            </select>
          </div>
          <br />
          <div class="col-sm form-group">
            <label for="to">To:</label>
            <select class="form-control" name="to" onChange={inputChange}>
              <option>mp4</option>
              <option>flv</option>
              <option>avi</option>
              <option>mkv</option>
              <option>mov</option>
            </select>
          </div>
          <br />
          <div class="col-sm form-group">
            <label for="scale">Scale:</label>
            <select class="form-control" name="scale" onChange={inputChange}>
              <option>640x480</option>
              <option>1280x720</option>
              <option>1920x1080</option>
              <option>3840x2160</option>
            </select>
          </div>
        </div>
        <br />
        <div class="form-group">
          <button class="btn btn-danger btn-block" type='submit'>
            Convert
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
