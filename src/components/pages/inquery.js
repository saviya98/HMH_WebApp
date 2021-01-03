import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';

class Inquery extends Component {

        state = {
            name : '',
            description : '',
            brand : '',
            dose : '',
            prescr : ''
        }

    handlerChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
        
    }
    //insert inquery
    handlerSubmit = async (event) =>{
    
        event.preventDefault();
        
        //validation
        if(!this.state.name || !this.state.description || !this.state.dose || !this.state.brand){
            alert('Please Fill Required Informations!')
            return;
        }

        const inqItem = {
            name : this.state.name,
            description : this.state.description,
            brand : this.state.brand,
            dose : this.state.dose,
            prescription : this.state.prescription
        }
        

        axios.get(`http://localhost:3000/addinqitem/${inqItem.name}/${inqItem.brand}/${inqItem.description}/${inqItem.dose}/${inqItem.prescription}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        alert('Inquery Added')
    }


    render() {
        return (
            <div className="App">
                <div className="headeri">
                    <h4>INQURIES</h4>
                </div>
                <div className="body-headi">
                    <h5>DETAILS</h5>
                    <hr />
                    <form>
                    <div className="inq-bodyi">
                        <label for="name">Name:</label><br />
                        <input type="text" id="name" name="name" onChange={this.handlerChange} /><br />
                        <label for="name">Description:</label><br />
                        <input type="text" id="descrip" name="description" onChange={this.handlerChange} /><br />
                        <label for="brand">Brand:</label><br />
                        <input type="text" id="brand" name="brand" onChange={this.handlerChange} /><br />
                        <label for="dose">Dose: </label><br />
                        <input type="text" id="dose" name="dose" onChange={this.handlerChange}/><br />
                        <label for="name">Prescription:</label><br />
                        <input type="text" id="prescr" name="prescription" onChange={this.handlerChange}/><br /><br />
                        <input type="submit" value="INQURIE" onClick = {this.handlerSubmit} />
                    </div>
                    </form>
                    <div className="inq-view-button">
                        <Link to='/ViewInquery' id="viewinqbtn" class="" >View Inquries</Link>
                    </div>
                </div>
            </div>

        )
    }
}

export default Inquery;