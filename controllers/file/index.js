const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const File = require('../../models/file');
const readFile = require('../../utils/readFile');


exports.getList = async (req, res, next) => {
    const files = await File.find({});
    res.render('file/list', { files });
}

exports.getUpload = (req, res, next) => {
    res.render('file/upload');
}

exports.postUpload = async (req, res, next) => {
    console.log(req.file)
    const { name } = req.body;
    const mimeType = req.file.mimetype.split('/')[1];
    const records = await readFile(req.file.path);
    const files = new File({ name, filename: req.file.filename, records, mimeType, destination: req.file.path });
    await files.save(); 
    req.flash('successMessage', 'File Uploaded Successfuly');
    res.redirect('/');    
}

exports.editFile = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const file = await File.findById(id);
    file.name = name;
    await file.save();
    req.flash('successMessage', 'File Updated Successfuly');
    res.redirect('/');
}

exports.deleteFile = async (req, res, next) => {
    const { id } = req.params;
    const file = await File.findByIdAndDelete(id);
    fs.unlink(file.destination, (err => {
        if (err) console.log(err);
    }));
    req.flash('successMessage', 'File Deleted Successfuly');
    res.redirect('/');
}

exports.showFile = async (req, res, next) => {
    const { id } = req.params;
    const file = await File.findById(id);
    // console.log(file)
    if(file.mimeType === 'csv') {
        const parsedData = [];
        fs.createReadStream(file.destination).pipe(csv()).on('data', (data) => {
            // console.log(data)
            parsedData.push(data);
        }).on('end', () => {
            // console.log(parsedData)
            return res.render('file/show', { parsedData, file });
        });
    } else if(file.mimeType === 'json') {
        const filePath = path.join(__dirname, '../..', file.destination);
        // console.log(filePath)
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data.toString());
        // console.log(parsedData);
        return res.render('file/show', { parsedData, file });
    } else {
        const filePath = path.join(__dirname, '../..', file.destination);
        const xlsfile = xlsx.readFile(filePath);
        const sheetNames = xlsfile.SheetNames;
        const totalSheets = sheetNames.length;
        let parsedData = [];
        for(let i = 0; i < totalSheets; i++) {
            const tempData = xlsx.utils.sheet_to_json(xlsfile.Sheets[sheetNames[i]]);
            parsedData.push(...tempData);
        }
        // console.log(parsedData)
        return res.render('file/show', { parsedData, file });
    }
}