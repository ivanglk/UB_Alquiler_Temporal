const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./Modelo/usuario.js')
const bcrypt = require('bcryptjs'); /* para encrypt constraseña*/
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10); /*Funcion que encripta password*/
const jwtSecret = 'jfnvejbelbeñjbge'; /*Random string*/


app.use(express.json()) /* para poder leer los objetos json cuando se cargan en registrar*/
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',

}));

mongoose.connect(process.env.Mongo_url); /*Tuvimos que descargar el paquete dotenv, nos conectamos a la base de datos de mongodb*/


app.get('/test', (req,res) => {
    /*se uso paquete cors para permitir comunicar localhost con el serve de npm. localhost 4000 con http://127.0.0.1:5173 */
    res.json('test ok')
});

app.post('/register', async (req,res) => {
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
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc){ /*Revisa que no sea nulo*/
        const passOK = bcrypt.compareSync(password,userDoc.password); /*Compara contraseñas para ver si son iguales*/
        if (passOK){
            jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret, {}, (err,token) => {
                if (err) throw err; /* en la propia funcion verificamos error. */
                res.cookie('token',token).json('Contraseña correcta');

            }); /* en mongoDB se guarda el user id como _id*/
            
        }else{
            res.status(422).json('Contraseña incorrecta');
        }
    } else{
        res.json('No encontrado');
    }

});
app.listen(4000);

