const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', function (req, res) {
    connection.query('select * from kamar ', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data kamar',
                data: rows
            })
        }
    });
});

// untuk membuat data baru kamar 
router.post('/store', [
    body('Nomor_Kamar').notEmpty(),
    body('Tipe_Kamar').notEmpty(),
    body('harga').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        Nomor_Kamar: req.body.Nomor_Kamar,
        Tipe_Kamar: req.body.Tipe_Kamar,
        harga: req.body.harga,
    }
    connection.query('insert into kamar  set ?', Data, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from kamar  where id_Kamar  = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if(rows.lenght <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data kamar ',
                data: rows[0]
            })
        }
    })
})


// untuk mengubah data kamar data
router.patch('/update/:id', [
    body('Nomor_Kamar').notEmpty(),
    body('Tipe_Kamar').notEmpty(),
    body('harga').notEmpty(),

], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        Nomor_Kamar: req.body.Nomor_Kamar,
        Tipe_Kamar: req.body.Tipe_Kamar,
        harga: req.body.harga,
    }
    connection.query(`update kamar  set ? where id_Kamar  = ${id}`, Data, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Success..!',
            })
        }
    })
})  


// untuk menghapus data kamar 
router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from kamar where id_Kamar  = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been delete !',
            })
        }
    })
})

module.exports = router; // Corrected export statement