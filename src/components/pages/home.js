import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <div class="Pharma-Home-body-h">
                    <Link to="/Pharmacy"><h2>Search Patient</h2></Link><br />
                    <Link to="/OutsidePatient"><h2>Outside Patient</h2></Link><br />
                    <Link to="/Inquery"><h2>Inquire Drug</h2></Link><br />
                </div>

                <div class="touch-line">
                    <div class="container">
                        <div class="row">

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Home;