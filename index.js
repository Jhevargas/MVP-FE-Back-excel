const mysql = require('mysql');
const excel = require('exceljs');
const Pool = require("pg").Pool;



// Create a connection to the database
const con = new Pool({
  host: "localhost",
  user: "jhonv",
  database: "IBMFONDO",
  password: "diana",
  port: 5432
});


// open the PostgreSQL connection
con.connect((err, client, done) => {
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

        
        worksheet.getRow(7).values = ['Id', 'codigos', 'Nombres', 'Primer apellido', 
                                      'Segundo Apellido','Numeros de identificación',
                                      'Estado Civil','Fecha de nacimiento', 'edad' ];
        //  WorkSheet Header
		worksheet.columns = [
            {  key: 'users_id',width: 10},
            {  key: 'codigos',width: 10},
			{  key: 'nombres', width: 30 },
			{  key: 'primer_apellidos', width: 30},
            {  key: 'segundo_apellidos', width: 30},
            {  key: 'numeros_de_identificacion', width: 30},
            {  key: 'estado_civil', width: 30},
            {  key: 'fechas_de_nacimiento', width: 30},
            {  width: 30}
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
    
        // Add Array Rows.
        worksheet.addRows(jsonData);
        //Front
        workbook.creator = 'IBM';

        //Write to File.
        workbook.xlsx.writeFile("Usuarios.xlsx")
		.then(function() {
			console.log("file saved!");
		});

    }
      
    });
  });