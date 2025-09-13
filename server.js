const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Excel file path
const excelFile = 'visitors.xlsx';

// Helper to append data to Excel
function appendToExcel(name, email) {
    let data = [];
    if (fs.existsSync(excelFile)) {
        const workbook = XLSX.readFile(excelFile);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(sheet);
    }
    data.push({ Name: name, Email: email, Timestamp: new Date().toISOString() });
    const newSheet = XLSX.utils.json_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Visitors');
    XLSX.writeFile(newWorkbook, excelFile);
}

app.post('/api/visit', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email required.' });
    }
    appendToExcel(name, email);
    res.json({ message: 'Thank you for visiting!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});