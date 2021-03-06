const express = require('express');

const responseTime = require('response-time');

const usersRouter = require('./cache.router');

const app = express();

app.use(express.json());

app.use(responseTime());

app.use('/download-excel', usersRouter);

const PORT = process.env.PORT || 443;

app.listen(PORT, console.log(`server listen on port ${PORT}`));



/*const mysql = require('mysql');
const excel = require('exceljs');
const Pool = require("pg").Pool;



// Create a connection to the database
const con = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testdb",
  password: "admin",
  port: 5432
});*/




// open the PostgreSQL connection
/*con.connect((err, client, done) => {
    if (err) throw err;
  
    client.query("SELECT * FROM users", (err, res) => {
      done();
  
      if (err) {
        console.log(err.stack);
      } else {
        const jsonData = JSON.parse(JSON.stringify(res.rows));
        console.log("jsonData", jsonData);
       
        
        let workbook = new excel.Workbook(); //creating workbook
		let worksheet = workbook.addWorksheet('users', 
           {pageSetup:{paperSize: 9, orientation:'landscape'}},
           {headerFooter: {oddFooter: "Page &P of &N", oddHeader: 'Odd Page'}}
          ); //creating worksheet

        
        worksheet.getRow(7).values = ['Item', 'codigos', 'Nombres y Apellidos','Numeros de identificación',
                                      'Estado Civil','Fecha de nacimiento', 'edad' ];
        //  WorkSheet Header
		worksheet.columns = [
            { key:'item', width: 10},
            {  key: 'codigo',width: 10},
            {key: 'fullname', width:30},
            {  key: 'numero_de_identificacion', width: 30},
            {  key: 'estado_civil', width: 30},
            {  key: 'fecha_de_nacimiento', width: 30},
            {  key: 'edad',width: 30}
		]; 
        // fill the cell with BLUE
            ['A7',
            'B7',
            'C7',
            'D7',
            'F7',
            'E7',
            'G7',
            'H7',
            'I7'].map(key => {
            worksheet.getCell(key).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '96C8FB' },
                bgColor: { argb: '96C8FB' }
            };
        });

        //header
        worksheet.mergeCells('D2', 'E2');
        worksheet.getCell('D2').value = ' Fecha envío ';
        worksheet.getCell('D2').border ={
            bottom: {style:'thick', color: {argb:'00000000'}}
        }
        var registro = new Date();
        worksheet.getCell('F2').value = registro;
        worksheet.getCell('F2').border ={
            bottom: {style:'thick', color: {argb:'00000000'}}
        }

        worksheet.mergeCells('A3', 'B3');
        worksheet.getCell('A3').value = ' Buenos días ';

        worksheet.mergeCells('A4', 'I5');
        var mes = 'Agosto';
        var ano = '2022';
        worksheet.getCell('A4').value = ' Anexo formulario ingreso poliza exequias del mes de '+ mes + ano;
        worksheet.getCell('A4').border ={
            bottom: {style:'thick', color: {argb:'00000000'}}
        }

        //add autofilters
        worksheet.autoFilter = 'A7:I7';

        function calcularEdad(fecha) {
          var hoy = new Date();
          var cumpleanos = new Date(fecha);
          var edad = hoy.getFullYear() - cumpleanos.getFullYear();
          var m = hoy.getMonth() - cumpleanos.getMonth();
      
          if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
              edad--;
          }
      
          return edad;
      }
    
        // Add Array Rows.
        jsonData.forEach((item, i) => {
          item.item = i+1;
          item.fullname = item.primer_apellido+' '+item.segundo_apellido+' '+item.nombres;
          item.edad = calcularEdad(item.fecha_de_nacimiento);
          worksheet.addRow(item);
        });
        //worksheet.addRows(jsonData);
        //Front
        workbook.creator = 'IBM';

        //Write to File.
        workbook.xlsx.writeFile("Usuarios.xlsx")
		.then(function() {
			console.log("file saved!");
		});

    }
      
    });
  });*/