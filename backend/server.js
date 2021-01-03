const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');


//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 's@vij#nu315',
    database : 'hnh_db'
});

//Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

app.use(cors());
app.use(bodyparser.json());

//*****INQURIE ******//
//Insert data into Inquries
app.get('/addinqitem/:drug_name/:Brand/:description/:dose/:prescrption', (req,res)=>{
    let item = {drug_name:req.params.drug_name,Brand:req.params.Brand,description:req.params.description,dose:req.params.dose,prescrption:req.params.prescription};
    let sql = "INSERT INTO inquries SET ?";
    let query = db.query(sql,item,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.send('Item added');
    })
});

//Retrieve data from Inquries
app.get('/selectinqitem', (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = 'SELECT * FROM inquries';
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            data: result
        })
    });
});

//update data
app.get('/updateInq/:inq_id/:brand/:dname/:dose/:description',(req,res)=>{
    let drug = {inq_id:req.params.inq_id,Brand:req.params.brand,drug_name:req.params.dname,dose:req.params.dose,description:req.params.description};
    let sql = `UPDATE inquries SET Brand='${req.params.brand}',drug_name='${req.params.dname}',dose='${req.params.dose}',description='${req.params.description}' WHERE inq_id= ${req.params.inq_id}`;
    let query = db.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        return res.send('item ipdated');
    });
});

//delete data
app.get('/deleteInq/:inq_id',(req,res)=>{
    let sql = `DELETE FROM inquries WHERE inq_id= ${req.params.inq_id}`;
    let query = db.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send('item deleted');
    });
});



//****INSIDE PATIENT*****//
//retriew data
app.get('/inPatient/:pid',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `SELECT p.p_name,p.p_nic,p.age,p.p_phone
               FROM patinet p,prescription s
               WHERE s.pres_id = '${req.params.pid}' and p.p_id = s.patient_id`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            data: result
        })
    });
});

//retriew prescription
app.get('/inPatientPres/:pid',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `SELECT i.tabs,i.for_,i.form,i.dose,i.due_in_days,i.days,i.Qty,o.brand_name,i.drug_name
               FROM prescription p, prescription_item i, patinet t,outlet_item o
               WHERE i.pres_id = '${req.params.pid}' and p.pres_id = i.pres_id  and t.p_id = p.patient_id  and i.item_no = o.item_no`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            data: result
        })
    });
});

//****OUTSIDE PATIENT****//
//insert patient info
app.get('/outPatientInfo/:p_name/:age/:p_description/:p_phone', (req,res)=>{
    let ouPaInfo = {p_name:req.params.p_name,age:req.params.age,p_description:req.params.p_description,p_phone:req.params.p_phone};
    let sql = `INSERT INTO patinet(p_name,age,p_description,p_phone) VALUES ('${req.params.p_name}','${req.params.age}','${req.params.p_description}','${req.params.p_phone}')`;
    let query = db.query(sql,ouPaInfo,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.send('Item added');
    })
});

// retrieve prescription
app.get('/showPrescription/4',(req,res) =>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `SELECT * 
               FROM prescription p, prescription_item i 
               WHERE pi_id = ${req.params.pi_id} `
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.json({
            data: result
        })
    });
});

//insert outside prescription 
app.get('/outPatientPres/:drug_name/:tabs/:dose/:form/:for_/:due_in_days/:days/:Qty',(req,res) =>{
    let outPaPrescrition = {drug_name:req.params.drug_name,tabs:req.params.tabs,dose:req.params.dose,form:req.params.form,for_:req.params.for_,due_in_days:req.params.due_in_days,days:req.params.days,Qty:req.params.Qty};
    let sql = `INSERT INTO prescription_item(drug_name,tabs,dose,form,for_,due_in_days,days,Qty) VALUES('${req.params.drug_name}','${req.params.tabs}','${req.params.dose}','${req.params.form}','${req.params.for_}','${req.params.due_in_days}','${req.params.days}','${req.params.Qty}')`;
    let query = db.query(sql,outPaPrescrition,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.send('Prescription added');
    });                        
});

//insert other items
app.get('/insertOtherItems/:itemCode/:qty/:itemName/:item_price',(req,res) => {
    let otherItems = {itemCode:req.params.itemCode,qty:req.params.qty,itemName:req.params.itemName,item_price:req.params.item_price};
    let sql = 'INSERT INTO other_item SET ?';
    let query = db.query(sql,otherItems,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.send('Other Items Added');
    });
});





app.listen('3000',()=>{
    console.log('Server startted on 5000');
});