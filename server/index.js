const express = require("express");
const bodyparser = require("body-parser");
const fs = require('fs');
const { createWorker } = require("tesseract.js");
const cors = require("cors");
var fileupload = require("express-fileupload");
let session = require("express-session");

const app = express();
let worker = createWorker();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(fileupload());

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(session({
    name: "filename",
    secret: 'a**ds%dc11sd@agjki123',
    resave: false,
    saveUninitialized: false
}));

function executeAsync(func)  { setInterval(func, 1000); }

app.post("/api/insert", async (req, res) => {

    // save image
    let file = req.files.file;

    const save_path = __dirname + "/uploads/" + file.name;
    file.mv(save_path);

    req.session.filename = file.name;

    res.send("succesfully inserted file named : " + file.name);
});

app.get("/api/obtainText", async (req, res) => {
    // save image
    const filename = (req.query.filename === undefined) ? req.session.filename : req.query.filename;

    console.log("filename : " + filename);
    
    // tesseract
    await worker.load();              // load tesseract core scripts
    await worker.loadLanguage('eng'); // load language
    await worker.initialize('eng');   // init language

    const { data: { text } } = await worker.recognize('uploads/' + filename).catch(e = () => {res.send("error when reading file, check content of image!");}); // fetch text from image

    res.send(text);
});

app.listen(4000 , () => {
    console.log("server is running on port 4000");

    executeAsync(() => {
        fs.readdir('./uploads/', (err, files) => {
            if(err)
                console.log("error : " + err);        

            files.forEach(file => {
                fs.stat('./uploads/' + file, (error, stats) => {
                    if(error)
                        console.log("error : " + error);

                    const newData = parseInt(Date.parse(stats.birthtime));
                    const currentDate = parseInt(Date.now());
                    let dif = (((currentDate - newData) / 1000) / 60); // minutes
                    
                    if(dif > 120)
                    {
                        fs.unlink("./uploads/" + file, (err) => {
                            if (err) throw err;

                            console.log('Plik został usuniety, poniewaz jest ponad 2 godziny na serwerze');
                        })
                    }
                })
            })
        })
    });
})