const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configurar armazenamento para uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API para enviar email (simulada)
app.post('/api/enviar-email', upload.single('arquivo'), (req, res) => {
    // Em uma implementação real, aqui seria configurado o envio de email
    // usando nodemailer ou outro serviço
    
    console.log('Solicitação de envio de email recebida:');
    console.log('Email:', req.body.email);
    console.log('Motorista:', req.body.motorista);
    console.log('Data Início:', req.body.dataInicio);
    console.log('Data Fim:', req.body.dataFim);
    
    // Simular sucesso
    res.json({ success: true, message: 'Email enviado com sucesso!' });
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log(Servidor rodando em http://localhost:${port});
});
