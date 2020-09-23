const {google} = require('googleapis');
const keys = require('./keys.json');
const ejs = require('ejs');
const express = require('express');
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.get('/', (req, res) => {
    res.render('index');
 });
 
app.get('/activity', (req, res) => {
    res.render('activity');
 });
 app.get('/beauty', (req, res) => {
    res.render('beauty');
 });
 app.get('/cpp', (req, res) => {
    res.render('cpp');
 });
 app.get('/elements', (req, res) => {
    res.render('elements');
 });
 app.get('/introduction', (req, res) => {
    res.render('Introduction');
 });
 app.get('/q&a', (req, res) => {
    res.render('q&a');
 });





const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
);


client.authorize(function (err,tokens){

    if(err){
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client);
    }
});


async function gsrun(cl){
    const gsapi = google.sheets({version:'v4',auth: cl});
    const optbeauty = {
        spreadsheetId: '1umnWJdDGmb1bUjGClxldn9VMo54iYSdKzSYiqPx5jnw',
        range: 'beauty!A2:D11'
    };


    app.get('/bplus',async function (req, res) {
        let data = await gsapi.spreadsheets.values.get(optbeauty);
        let dataArray = data.data.values;
        res.render('bplus',{data: dataArray});
    });

    const optcpp = {
        spreadsheetId: '1umnWJdDGmb1bUjGClxldn9VMo54iYSdKzSYiqPx5jnw',
        range: 'cpp!A2:F11'
    };


    app.get('/cppplus',async function (req, res) {
        let data = await gsapi.spreadsheets.values.get(optcpp);
        let dataArray = data.data.values;
        res.render('cppplus',{data: dataArray});
    });
};


app.listen(3000, () => console.log('Server up and running'));