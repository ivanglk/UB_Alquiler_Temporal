const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./Modelo/usuario.js');
const Place = require('./Modelo/Place.js');
const bcrypt = require('bcryptjs'); /* para encrypt constraseña*/
const jwt = require('jsonwebtoken');
require('dotenv').config();
const CookieParser = require('cookie-parser');
const imageDownloader = require("image-downloader");
const multer = require('multer');
const fs = require('fs');


const bcryptSalt = bcrypt.genSaltSync(10); /*Funcion que encripta password*/
const jwtSecret = 'jfnvejbelbeñjbge'; /*Random string*/


app.use(express.json()); /* para poder leer los objetos json cuando se cargan en registrar*/
app.use(CookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',

}));

//mongoose.connect(process.env.Mongo_url); /*Tuvimos que descargar el paquete dotenv, nos conectamos a la base de datos de mongodb*/


app.get('/test', (req,res) => {
    /*se uso paquete cors para permitir comunicar localhost con el serve de npm. localhost 4000 con http://127.0.0.1:5173 */
    res.json('test ok')
});

app.post('/register', async (req,res) => {
    mongoose.connect(process.env.Mongo_url);
    const {name,document,email,password} = req.body; /*tomamos los datos en req.body*/
    
    try{
        const userDoc = await User.create({
            name,
            document,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
    
        });
        res.json(userDoc);
    }catch(e){
        res.status(422).json(e);
    }
    
   
})

app.post('/login', async (req,res) => {
    mongoose.connect(process.env.Mongo_url);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc){ /*Revisa que no sea nulo*/
        const passOK = bcrypt.compareSync(password,userDoc.password); /*Compara contraseñas para ver si son iguales*/
        if (passOK){
            jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret, {}, (err,token) => {
                if (err) throw err; /* en la propia funcion verificamos error. */
                res.cookie('token',token).json(userDoc);

            }); /* en mongoDB se guarda el user id como _id*/
            
        }else{
            
            res.json('Contraseña incorrecta');
        }
    } else{
        
        res.status(422).json('No encontrado');
    }

});


app.get('/profile', (req,res) => {
    mongoose.connect(process.env.Mongo_url);
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{}, async (err,userData)=> {
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
});

app.post('/logout', (req,res) => {
    res.cookie('token','').json(true);
});


app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname + '/uploads/' +newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos',100), (req,res) => {
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
});

app.post('/places',(req,res) => {
    const {token} = req.cookies;
    const {title,address,addedPhotos,description,perks,
    extrainfo,checkIn,checkOut,maxGuests, price,} = req.body;
    jwt.verify(token,jwtSecret,{}, async (err,userData)=> {
        if(err) throw err;
        const placeDoc = await Place.create({
            owner:userData.id,
            title,address,photos:addedPhotos,description,perks,
            extrainfo,checkIn,checkOut,maxGuests, price,
        });
        res.json(placeDoc);
        
    });

});

app.get('/user-places', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{}, async (err,userData)=> {
        const{id} = userData;
        res.json(await Place.find({owner:id}));
    });
});

app.get('/places/:id', async (req,res) => {
    mongoose.connect(process.env.Mongo_url);
    const {id} = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req,res) => {
    const {token} = req.cookies;
    const {id,title,address,addedPhotos,description,perks,
    extrainfo,checkIn,checkOut,maxGuests, price,} = req.body;
    jwt.verify(token,jwtSecret,{}, async (err,userData)=> {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,address,photos:addedPhotos,description,perks,
                extrainfo,checkIn,checkOut,maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });


});

app.get('/places' , async (req,res) => {
    res.json(await Place.find());
});
app.listen(4000);

