import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


class ViewInquery extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    state = {
        id : '',
        name : '',
        description : '',
        brand : '',
        dose : '',
        prescription : ''
    }

    //set changed values of inputs
    handlerChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
        
    }

    //update inquries
    handlerSubmit = async (event) =>{
        
        event.preventDefault();
        const inq = {
            id : this.state.id,
            name : this.state.name,
            description : this.state.description,
            brand : this.state.brand,
            dose : this.state.dose,
            prescription : this.state.prescription
        }
        // alert(inq.id)
        // alert(inq.name)

        axios.get(`http://localhost:3000/updateInq/${inq.id}/${inq.brand}/${inq.name}/${inq.dose}/${inq.description}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        alert("Inquery Updated")
    }

    //delete inquries
    handlerDelete(e){

        axios.get(`http://localhost:3000/deleteInq/${e}`)
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })

        alert('Inquery no '+e+' deleted')
    }

    //retriew all the inquries when loading
    componentDidMount(){
        fetch("http://localhost:3000/selectinqitem")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                });
                console.log(result.data);
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    items:[],
                    error: error
                });
            }
        )
    }

    //create pdf
    savePDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const margingLeft = 40;
        const doc = new jsPDF(orientation,unit,size);

        const title = "INQURIES";
        const headers = [["Inquery No","Brand","Name","Dose","Description"]];

        const inqu = this.state.items.map(
            inqu =>[
                inqu.inq_id,
                inqu.Brand,
                inqu.drug_name,
                inqu.dose,
                inqu.description

            ]
        );

        let contents = {
            startY: 50,
            head: headers,
            body: inqu
        };

        doc.setFontSize(20);
        doc.text(title,margingLeft,40);
        require('jspdf-autotable');
        doc.autoTable(contents);
        doc.save("InqueryReport.pdf")
    }

    render() {
        const{ error,isLoaded,items} = this.state;
        if(error){
            return <div>Error: {error.message}</div>;
        }else if(!isLoaded){
            return<div>Loading...</div>;
        }else{
            return (
          
            <div className='App'>
                <div className="headeri">
                        <h4>INQURIES</h4>
                    </div>
                    <form>
                    <button className="down-btn" onClick={this.savePDF}>Download PDF</button>
                <table className="inq-view-table">
                    <thead>
                        <td>Inquery No</td>
                        <td>Brand</td>
                        <td>Name</td>
                        <td>Dose</td>
                        <td>Description</td>
                    </thead>
                    
                    {items.map(item =>(
                        <tbody>
                            <tr>
                                <td ><input type="text" id="id" name="id" defaultValue={item.inq_id} onChange={this.handlerChange} /></td>
                                <td><input type="text" id="brand" name="brand" defaultValue={item.Brand} onChange={this.handlerChange} /></td>
                                <td><input type="text" id="name" name="name" defaultValue={item.drug_name} onChange={this.handlerChange} /> </td>
                                <td><input type="text" id="dose" name="dose" defaultValue={item.dose} onChange={this.handlerChange} /> </td>
                                <td><input type="text" id="description" name="description" defaultValue= {item.description} onChange={this.handlerChange} /></td>
                                <td><input type="submit" name="submit" value="UPDATE" onClick={this.handlerSubmit}/></td>
                                <td><input type="submit" name="submit" value="DELETE" onClick={()=>this.handlerDelete(item.inq_id)}/></td> 
                            </tr>
                        </tbody>
                    ))}
                        
                </table>
                
                </form>
                
            </div>
            );
        }
    }
}

export default ViewInquery;