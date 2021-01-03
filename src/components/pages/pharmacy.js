import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class Pharmacy extends Component {
    

    constructor(props){
        super(props);
        this.state={
            error: null,
            isLoaded: false,
            patients: [],
            drugs:[]
        };
    }

    state = {
        id: '',
        // patients: [],
        p_name: '',
        age: '',
        p_nic: '',
        p_phone: ''

    }

    handlerChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    //search prescription 
    // handlerSubmit = async (event) => {
    //     event.preventDefault();
    //     const idNic = {
    //         id: this.state.id
    //     }

    //     this.componentDidMount(this.state.id);
    //     alert(this.state.id)

        // fetch(`http://localhost:3000/inPatient/4`)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 patients: result.data
        //             });
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 patients:[],
        //                 error: error
        //             });
        //         }
        //     )

        //     alert(idNic.id)
    // }

    // handlerGetID = async (e) =>{
    //     alert(e)
    //     await fetch(`http://localhost:3000/inPatient/${e}`)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     patients: result.data
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     patients:[],
    //                     error: error
    //                 });
    //             }
    //         )

    // }

    // async componentDidMount(){
    //     await this.handlerGetID();
    // }

        //retriew doctor entered prescription and patient info
       async componentDidMount(){
            await fetch(`http://localhost:3000/inPatient/7`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        patients: result.data
                    });
                    
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        patients:[],
                        error: error
                    });
                }
            )

            fetch(`http://localhost:3000/inPatientPres/7`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        drugs: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        drugs:[],
                        error: error
                    });
                }
            )
        
    }
    
    //downloadable pdf crete
    createPDF = () =>{
        const unit = "pt";
        const size = "A4"; //page size
        const orientation = "landscape"; //orientation
        const margingLeft = 40;
        const doc = new jsPDF(orientation,unit,size); //create pdf layout

        //add title
        const title = `Prescription for - Name: ${this.state.patients.map(item => item.p_name)} | Age: ${this.state.patients.map(item => item.age)}`;
        //header for table
        const header = [["Drug","Brand Name","For","Form","Days"]];

        //getting data from state
        const drug = this.state.drugs.map(
            drug =>[
                drug.drug_name,
                drug.brand_name,
                drug.for_,
                drug.form,
                drug.due_in_days
            ]
        );

        let content = {
            startY: 50,
            head: header,
            body: drug
        };

        doc.setFontSize(15);//font size
        doc.text(title,margingLeft,40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("PresReport.pdf")
    
    }
    
    render() {
        const{error,isLoaded,patients,drugs} = this.state;
        // if(error){
        //     return <div>Error: {error.message}</div>
        // }else if(!isLoaded){
        //     return <div>Loading...</div>
        // }else{
        return (

            //search for patient by id
            <div className="">
                <div className="topnav">
                    <div className="search-container">
                        <form >
                            <input type="text" placeholder="Patient id" name="search" onChange={this.handlerChange} />
                            <button type="submit" onClick={()=>this.handlerGetID(this.state.search)}>Get Prescripton</button>
                        </form>
                    </div>
                    <div className="headeri">
                        <h4>PHARMACY</h4>
                    </div>
                </div>
                
                <div className="patient-info">
                    <div className="phead">Patient Information</div><hr />
                    <div className="pbody">
                        <img src="images/testi_01.png" alt="Patient Picture" />
                        {patients.map(patient =>(
                        <ul key={patient.p_id}>
                        
                            <li><h6>Name : {patient.p_name} </h6></li>
                            <li><h6>Age : {patient.age}</h6></li>
                            <li><h6>ID : {patient.p_nic}</h6></li>
                            <li><h6>Contact Number : {patient.p_phone}</h6></li>
                            
                        </ul>
                        ))}
                    </div>
                </div>
                

                <div className="prescrip-main">
                    <div className="prescrip-head">Prescription</div><hr />
                    <div>
                        <form>
                        <table className="prescrip-OutTable">
                            <tr>
                                <th>Drug</th>
                                <th>Brand</th>
                                <th>Tabs</th>
                                <th>Dose</th>
                                <th>Form</th>
                                <th>For</th>
                                <th>Duration(Days)</th>
                                <th>Days</th>
                                <th>Qty</th>
                            </tr>
                            {drugs.map(drug =>(
                            <tr key={drug.pres_id}>
                                <td><input type="text" id="drug" name="drug" defaultValue={drug.drug_name} onChange={this.handlerChange} /></td>
                                <td>
                                    <select name="" id="">
                                        <option defaultValue="">{drug.brand_name}</option>
                                        <option defaultValue="">SPC</option>
                                    </select>
                                </td>
                                <td><input type="number" id="tabs" name="tabs" defaultValue={drug.tabs} onChange={this.handlerChange} /></td>
                                <td>
                                    <select name="" id="">
                                    <option value="">{drug.dose}</option>
                                        <option value="">20mg</option>
                                    </select>
                                </td>
                                <td><input type="text" id="form" name="form" defaultValue={drug.form} onChange={this.handlerChange} /></td>
                                <td><input type="text" id="for" name="for" defaultValue={drug.for_} onChange={this.handlerChange} /></td>
                                <td><input type="text" id="duration" name="duration" defaultValue={drug.due_in_days} onChange={this.handlerChange} /></td>
                                <td><input type="text" id="days" name="days" defaultValue={drug.days} onChange={this.handlerChange} /></td>
                                <td><input type="text" id="qty" name="qty" defaultValue={drug.Qty} onChange={this.handlerChange} /></td>
                            </tr>
                            ))}
                           
                        </table>
                        </form>
                    </div>
                </div>

                <div className="under-buttons">
                    <button className="btn" onClick={this.createPDF}>Print Prescription</button>
                </div>


            </div>

        )
    }   
    
}

export default Pharmacy;