import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';


class inqTableRaw extends Component {
    render(){
        return(
            <tr>
                <td>{this.state.obj.name}</td>
                <td>{this.state.obj.brand}</td>
                <td>{this.state.obj.description}</td>
                <td>{this.state.obj.dose}</td>
            </tr>
        )
    }
   
}

export default inqTableRaw;