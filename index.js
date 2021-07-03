const express = require("express");

const ffmpeg = require("fluent-ffmpeg");

const bodyParser = require("body-parser");

const fs = require("fs");

const fileUpload = require("express-fileupload");

const app = express();

const PORT = process.env.PORT || 5000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");

ffmpeg.setFfprobePath("C:/ffmpeg/bin");

ffmpeg.setFlvtoolPath("C:/flvtool");

console.log(ffmpeg);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/convert", (req, res) => {
  //res.contentType(`video/${to}`);
  //res.attachment(`output.${to}`

  let { to, vdoCode, bitrate, scale } = req.body;
  let file = req.files.file;
  let fileName = `${file.name.replace(/\.[^/.]+$/, "")}.${to}`;
  console.log(to);
  console.log(file);

  file.mv("tmp/" + file.name, function (err) {
    if (err) return res.sendStatus(500).send(err);
    console.log("File Uploaded successfully");
  });

  ffmpeg("tmp/" + file.name)
    .withOutputFormat(to)
    .withVideoCodec(vdoCode)
    .withVideoBitrate(bitrate)
    .withSize(scale)
    .on("end", function (stdout, stderr) {
      console.log("Finished");
      res.download(fileName, function (err) {
        if (err) throw err;

        fs.unlink(fileName, function (err) {
          if (err) throw err;
          console.log("File deleted");
        });
      });
      fs.unlink("tmp/" + file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message);
      fs.unlink("tmp/" + file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
    .saveToFile(fileName);
  //.pipe(res, { end: true });
});

app.listen(PORT);
