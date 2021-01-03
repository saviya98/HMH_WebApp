import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class OutsidePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            prescriptions: []
        };
    }

    state = {
        pName : '',
        rdoc : '',
        age : '',
        phone : '',
        
        pres_id : '6',
        drug : '',
        dbrand : '',
        tabs : '',
        dose : '',
        form : '',
        for : '',
        duration : '',
        days : '',
        qty : '',

        itemcode: '',
        itemname: '',
        itemqty: '',
        itemprice: ''

    }

    handlerChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    //insert patient information
    handlerSubmit = async (event) =>{
        
        event.preventDefault();

        //validation
        if(!this.state.pName || !this.state.phone || !this.state.rdoc || !this.state.age){
            alert('Please Enter all Informations')
            return;
        }
        else if(!this.state.phone.match(/[0-9]/) || this.state.phone.length !== 10){
            alert('Enter Valid Phone Number!')
            return;
        }
        
        const outPaInfo = {
            pName : this.state.pName,
            rdoc : this.state.rdoc,
            age : this.state.age,
            phone : this.state.phone
            
        }
        
        axios.get(`http://localhost:3000/outPatientInfo/${outPaInfo.pName}/${outPaInfo.age}/${outPaInfo.rdoc}/${outPaInfo.phone}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    //insert prescription details
    handlerPrescription = async(event)=>{
        
        event.preventDefault();
        
        const outPaPrescription = {
            pres_id:this.state.pres_id,
            drug : this.state.drug,
            dbrand: this.state.dbrand,
            tabs : this.state.tabs,
            dose : this.state.dose,
            form : this.state.form,
            for : this.state.for,
            duration : this.state.duration,
            days : this.state.days,
            qty : this.state.qty

        }
        // alert(outPaPrescription.pres_id)
        // alert(outPaPrescription.drug)

        axios.get(`http://localhost:3000/outPatientPres/${outPaPrescription.drug}/${outPaPrescription.tabs}/${outPaPrescription.dose}/${outPaPrescription.form}/${outPaPrescription.for}/${outPaPrescription.duration}/${outPaPrescription.days}/${outPaPrescription.qty}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    //insert other items
    handlerOtherItem = async(event) =>{
        event.preventDefault();

        const otherItems = {
            itemcode: this.state.itemcode,
            itemname: this.state.itemname,
            itemprice: this.state.itemprice,
            itemqty: this.state.itemqty
        }

        axios.get(`http://localhost:3000/insertOtherItems/${otherItems.itemcode}/${otherItems.itemqty}/${otherItems.itemname}/${otherItems.itemprice}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })


    }
    //generate pdf
    createpdf = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const margingLeft = 40;
        const doc = new jsPDF(orientation,unit,size);

        const title = `Prescription Name: ${this.props.match.params.pName}`;
        const headers = [["Name","Age","Ref Doctor","Phone"]];

        const outPaInfo = {
            pName : this.state.pName,
            rdoc : this.state.rdoc,
            age : this.state.age,
            phone : this.state.phone
            
        }

        let contents = {
            startY: 50,
            head: headers,
            body: outPaInfo
        };

        doc.setFontSize(20);
        doc.text(title,margingLeft,40);
        require('jspdf-autotable');
        doc.autoTable(contents);
        doc.save("PrescriptionReport.pdf")

    }


    render() {
        // const{error,isLoaded,prescriptions} = this.state;
        // if(error){
        //     return <div>Error: {error.message}</div>;
        // }else if(!isLoaded){
        //     return<div>Loading...</div>;
        // }else{
        return (
            <div className="">
                <div className="topnav">
                    <div className="search-container">
                        <form action="/action_page.php">
                            <input type="text" placeholder="Patient id" name="search" />
                            <button type="submit">Get Prescripton</button>
                        </form>
                    </div>
                    <div className="headeri">
                        <h4>OUSTSIDE PATIENT</h4>
                    </div>
                </div>


                <div className="pa-info">
                    <label><h5>Patient Information</h5></label>
                    <hr />
                    <form >
                        Name : <input type="text" name="pName" onChange={this.handlerChange}/>
			            Reffered Doctor : <input type="text" name="rdoc" onChange={this.handlerChange}/>
                        <br />
                        <div class="ageph">
                            Age  : <input type="number" name="age"  onChange={this.handlerChange}/>
				            Phone :<input id="pa-in-phone" type="number" name="phone"  onChange={this.handlerChange}/>
                        </div>
                        <br />
                        <input type="submit" name="submit" value="ADD INFO" onClick={this.handlerSubmit}/>
                    </form>
                </div>

                <div className="prescrip-mainO">
                    <div className="prescrip-headO">Prescription</div><hr />
                    <div>
                        <form>
                        <table className="prescrip-OutTable">
                            <tr>
                                <th>Drug</th>
                                <th>Tabs</th>
                                <th>Dose</th>
                                <th>Form</th>
                                <th>For</th>
                                <th>Duration(Days)</th>
                                <th>Days</th>
                                <th>Qty</th>
                            </tr>
                            <tr>
                                <td><input type="text" id="drug" name="drug" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="tabs" name="tabs" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="dose" name="dose" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="form" name="form" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="for" name="for" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="duration" name="duration" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="days" name="days" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="qty" name="qty" onChange={this.handlerChange} /></td>
                                <td><input className="btnother" type="submit" name="submit" value="ADD" onClick={this.handlerPrescription}/></td>
                                {/* <td><input type="button" name="remove" value="Remove" onChange={this.handleRemove}/></td> */}
                            </tr>
                            <tr>
                                <td><input type="text" id="drug" name="drug" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="tabs" name="tabs" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="dose" name="dose" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="form" name="form" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="for" name="for" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="duration" name="duration" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="days" name="days" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="qty" name="qty" onChange={this.handlerChange} /></td>
                                <td><input className="btnother" type="submit" name="submit" value="ADD" onClick={this.handlerPrescription}/></td>
                                {/* <td><input type="button" name="remove" value="Remove" onChange={this.handleRemove}/></td> */}
                            </tr>
                            <tr>
                                <td><input type="text" id="drug" name="drug" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="tabs" name="tabs" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="dose" name="dose" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="form" name="form" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="for" name="for" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="duration" name="duration" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="days" name="days" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="qty" name="qty" onChange={this.handlerChange} /></td>
                                <td><input className="btnother" type="submit" name="submit" value="ADD" onClick={this.handlerPrescription}/></td>
                                {/* <td><input type="button" name="remove" value="Remove" onChange={this.handleRemove}/></td> */}
                            </tr>
                            <tr>
                                <td><input type="text" id="drug" name="drug" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="tabs" name="tabs" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="dose" name="dose" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="form" name="form" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="for" name="for" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="duration" name="duration" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="days" name="days" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="qty" name="qty" onChange={this.handlerChange} /></td>
                                <td><input className="btnother" type="submit" name="submit" value="ADD" onClick={this.handlerPrescription}/></td>
                                {/* <td><input type="button" name="remove" value="Remove" onChange={this.handleRemove}/></td> */}
                            </tr>
                            <tr>
                                <td><input type="text" id="drug" name="drug" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="tabs" name="tabs" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="dose" name="dose" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="form" name="form" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="for" name="for" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="duration" name="duration" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="days" name="days" onChange={this.handlerChange} /></td>
                                <td><input type="text" id="qty" name="qty" onChange={this.handlerChange} /></td>
                                <td><input className="btnother" type="submit" name="submit" value="ADD" onClick={this.handlerPrescription}/></td>
                                {/* <td><input type="button" name="remove" value="Remove" onChange={this.handleRemove}/></td> */}
                            </tr>
                        </table>
                        </form>
                    </div>
                </div>

                <div className="pharm-other-main">
                    <div className="prescrip-headO-o">OTHER ITEMS</div><hr />
                    <div>
                        <table >
                            <tr>
                                <th>ITEM CODE</th>
                                <th>ITEM NAME</th>
                                <th>QTY</th>
                                <th>PRICE</th>
                            </tr>

                            <tr>
                                <td><input type="text" id="itemcode" name="itemcode" onChange={this.handlerChange} /></td>
                                <td> <input type="text" id="itemname" name="itemname" onChange={this.handlerChange} /></td>
                                <td><input type="text" name="itemqty" onChange={this.handlerChange} /></td>
                                <td><input type="text" name="itemprice" onChange={this.handlerChange} /></td>
                                <td><input  className="btnother" type="submit" value="Add Items" onClick={this.handlerOtherItem}/></td>
                            </tr>
                            <tr>
                                <td><input type="text" id="itemcode" name="itemcode" onChange={this.handlerChange} /></td>
                                <td> <input type="text" id="itemname" name="itemname" onChange={this.handlerChange} /></td>
                                <td><input type="text" name="itemqty" onChange={this.handlerChange} /></td>
                                <td><input type="text" name="itemprice" onChange={this.handlerChange} /></td>
                                <td><input  className="btnother" type="submit" value="Add Items" onClick={this.handlerOtherItem}/></td>
                            </tr>
                            <tr>
                                <td><input type="text" id="itemcode" name="itemcode" onChange={this.handlerChange} /></td>
                                <td> <input type="text" id="itemname" name="itemname" onChange={this.handlerChange} /></td>
                                <td><input type="text" name="itemqty" onChange={this.handlerChange} /></td>
                                <td><input type="text" name="itemprice" onChange={this.handlerChange} /></td>
                                <td><input  className="btnother" type="submit" value="Add Items" onClick={this.handlerOtherItem}/></td>
                            </tr>
                        

                        </table>
                    </div>

                </div>
                <div>
                    <button onClick={this.createpdf}>Print Prescription</button>
                </div>

                {/* <div className="note-main">
                    <form action="#" className="add-note">
                        <textarea name="specialNote" id="#" cols="30" rows="10">Special Notes Here...</textarea>
                        <button type="submit">Add Note</button>
                    </form>
                </div> */}

        </div>

        )
        }
    //}
}

export default OutsidePatient;