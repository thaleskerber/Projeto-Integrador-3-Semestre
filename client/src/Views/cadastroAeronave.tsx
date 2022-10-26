import { Component, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Aircraft from "../Models/aircraft";
import '../Style/App.css';
import aviao from "../Icons/aviao.png";
import { getValue } from "@testing-library/user-event/dist/utils";
import { BrakingLevel } from '../Enuns/enuns';
import React from "react";
import axios from 'axios';
import Swal from 'sweetalert2'

type state = {
    modelError: string,
    engineError: string,
    reversorError: string,
    certificationError: string,
    flapError: string,
    breakingError: string,
    weightMinError: string,
    weightMaxError: string,
    result: string,
}
class cadastroAeronave extends Component<any, state>{

    private aircraft: Aircraft = new Aircraft('', '', '', 0, 0, 0, 0, 0);
    
    constructor(props: any) {
        super(props);
        this.state = {
            modelError: '',
            engineError: '',
            reversorError: '',
            certificationError: '',
            flapError: '',
            breakingError: '',
            weightMinError: '',
            weightMaxError: '',
            result: ''
        }
        this.modelChange = this.modelChange.bind(this);
        this.engineChange = this.engineChange.bind(this);
        this.certificationChange = this.certificationChange.bind(this);
        this.reversorChange = this.reversorChange.bind(this);
        this.flapChange = this.flapChange.bind(this);
        this.brakingLevelChange = this.brakingLevelChange.bind(this);
        this.aircraftWeightChangeMin = this.aircraftWeightChangeMin.bind(this);
        this.aircraftWeightChangeMax = this.aircraftWeightChangeMax.bind(this);
        //this.cadastrar = this.cadastrar.bind(this);
    }


    eventoFormulario = (evento: any) => {
        evento.preventDefault()
    }

    /*receberValorEntrada(event){
        let entrada = event.target.value
        this.setState({
            aircraft.model: entrada,
            engine: entrada,
        })
    }*/

    modelChange(event) {
        let modelError = ""
        const target = event.target;
        this.aircraft.setModel = target.value;
        if (!this.aircraft.getModel) {
            modelError = "The model is required";
        } else {
            modelError = ""
        }
        this.setState({ modelError: modelError })
    }
    engineChange(event) {
        let engineError = ""
        const target = event.target;
        this.aircraft.setEngine = target.value;
        if (!this.aircraft.getEngine) {
            engineError = "The engine is required";
        } else {
            engineError = ""
        }
        this.setState({ engineError: engineError })
    }
    certificationChange(event) {
        let certificationError
        const target = event.target;
        this.aircraft.setCertification = target.value;
        if (!this.aircraft.getCertification) {
            certificationError = "Select a certification"
        } else {
            certificationError = ""
        }
        this.setState({ certificationError: certificationError })
    }
    flapChange(event) {
        let flapError
        const target = event.target;
        this.aircraft.setFlapValue = target.value;
        if (!this.aircraft.getFlapValue) {
            flapError = "Select a flap"
        } else {
            flapError = ""
        }
        this.setState({ flapError: flapError })
    }
    reversorChange(event) {
        let reversorError
        const target = event.target;
        this.aircraft.setReverserAmount = target.value;
        if (!this.aircraft.getReverserAmount) {
            reversorError = "The aircraft must have at least one(1) reversor."
        } else {
            reversorError = ""
        }
        this.setState({ reversorError: reversorError })
    }
    brakingLevelChange(event) {
        const target = event.target;
        this.aircraft.setBrakingApplicationLevel = target.value;
        if (this.state.breakingError.includes("Select")) {
          this.setState({ breakingError: "" })
        }
        if (this.state.result != "") this.setState({ result: "" })
      }

   aircraftWeightChangeMin(event) {
        const target = event.target;
        this.aircraft.setAircraftWeightMin = target.value;
        if (this.aircraft.getAircraftWeightMin < 5000) {
          this.setState({ weightMinError: "The weight must be above 5000" })
        }
   
        if (this.state.weightMinError.includes("required") || this.state.weightMinError.includes("above") && this.aircraft.getAircraftWeightMin >= 5000) {
          this.setState({ weightMinError: "" })
        }
        if (this.state.result != "") this.setState({ result: "" })
      }
   aircraftWeightChangeMax(event) {
       const target = event.target;
       this.aircraft.setAircraftWeightMax = target.value;
       if ( this.aircraft.getAircraftWeightMax < 10000) {
           this.setState({ weightMaxError: "The weight must be above 10000" })
       }
       if ( this.aircraft.getAircraftWeightMax > 100000){
           this.setState({weightMaxError: "The weight must be below 100000"})
       }

       if (this.state.weightMaxError.includes("required") || this.state.weightMaxError.includes("above") && this.aircraft.getAircraftWeightMax >= 10000) {
           this.setState({ weightMaxError: "" })
       }
       if (this.state.result != "") this.setState({ result: "" })
       }
   /*cadastrar(event) {
       const target = event.target.value
       this.aircraft.result = //Adicionar result à aeronave novamente para colocar os valores necessários aqui
   }*/

   validate = () => {
       let modelError = "";
       let engineError = "";
       let reversorError = "";
       let certificationError = "";
       let flapError = "";
       let breakingError = "";
       let weightMinError = "";
       let weightMaxError = "";

       if (!this.aircraft.getModel) {
           modelError = "The model is required"
       } else {
           modelError = ""
       }
       if (!this.aircraft.getEngine) {
           engineError = "The engine is required";
       } else {
           engineError = ""
       }
       if (!this.aircraft.getReverserAmount) {
           reversorError = "The aircraft must have at least one(1) reversor."
       } else {
           reversorError = ""
       }
       if (!this.aircraft.getCertification) {
           certificationError = "Select a certification"
       } else {
           certificationError = ""
       }
       if (!this.aircraft.getFlapValue) {
           flapError = "Select a flap"
       } else {
           flapError = ""
       }
       if (!this.aircraft.getBrakingApplicationLevel) {
           breakingError = "Select a braking level";
       } else {
           breakingError = ""
       }
       if (!this.aircraft.getAircraftWeightMin) {
           weightMinError = "The weight is required";
       } else if (this.aircraft.getAircraftWeightMin < 5000) {
           weightMinError = "The weight must be above 5000";
       } else {
           weightMinError = ""
       }
       if (!this.aircraft.getAircraftWeightMax) {
           weightMaxError = "The weight is required";
       } else if (this.aircraft.getAircraftWeightMax > 100000) {
           weightMaxError = "The weight must be above 100000";
       } else {
           weightMaxError = ""
       }
     
       this.setState({ modelError: modelError, engineError: engineError, reversorError: reversorError, certificationError: certificationError, flapError: flapError,  breakingError: breakingError, weightMinError: weightMinError, weightMaxError: weightMaxError});
       if (modelError || engineError || reversorError || certificationError || flapError || breakingError || weightMinError || weightMaxError) {
           return false
       }

       return true;
   }

    postClickButton = (event: any) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            axios.post("http://localhost:3001/airplane/cadastrar", {
                model: this.aircraft.getModel,
                engine: this.aircraft.getEngine,
                certification: this.aircraft.getCertification,
                aircraftWeightMin: this.aircraft.getAircraftWeightMin,
                aircraftWeightMax: this.aircraft.getAircraftWeightMax,
                flap: this.aircraft.getFlapValue,
                reverserAmount: this.aircraft.getReverserAmount,
                brakingApplicationLevel: this.aircraft.getBrakingApplicationLevel
            })
            /*
            axios.post("http://localhost:3001/operationDistance/cadastrar",{
                refWithouIce: 2312321,
                refWithIce: 324234,
                weightReference: 4324,
                weightWithIce: 21121,
                weightBellowWithIce: 121212121,
                weightAboveWithIce: 1,
                altitudeReference: 2,
                altitudeWithIce: 0,
                altitudeWithoutIce: 65656,
                tempReference: 9077,
                tempBellowWithIce: 213,
                tempAboveWithIce: 21121,
                tempBellowWithoutIce: 121212121,
                tempAboveWithoutIce: 1,
                windReference: 2,
                windHeadWithIce: 0,
                windTailWithIce: 35325,
                windHeadWithoutIce: 5235,
                windTailWithoutIce: 35,
                slopeReference: 21121,
                slopeUphillWithIce: 121212121,
                slopeDownhillWithIce: 1,
                slopeUphillWithoutIce: 2,
                slopeDownhillWithoutIce: 0,
                overspeedReference: 435435,
                overspeedWithIce: 45345,
                overspeedWithotIce: 89789,
                reverserWithIce: 21121,
                reverserWithoutIce: 121212121,
                airplaneId: 1
            })*/

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Register completed',
                showConfirmButton: false,
                timer: 1500
              })
            setTimeout(function() {
                window.location.reload();
              }, 1500);
        }
    }

    render() {
        return (
            <form onSubmit={this.eventoFormulario} id="form">
                <Container className="px-2 mb-5">
                    <Container>
                        <Row className="px-2 mb-5 mt-5">
                            <img src={aviao} alt="Avião." className="img col-sm-5 col-md-3 col-lg-2"></img>
                            <h1 className='text-center mt-5 col-sm-7 col-md-9'>Aircraft model</h1>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Form>
                            <Row>
                                <Col>
                                    <h5 className="card-title">Aircraft model</h5>
                                    <input type='text' className='input form-control form-control-lg inputGroup-sizing-sm' id="model"
                                        placeholder="Aircraft model" onChange={this.modelChange} />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.modelError}
                                    </div>

                                </Col>
                                <Col>
                                    <h5 className="card-title">Engine</h5>
                                    <input type='text' className="input form-control form-control-lg inputGroup-sizing-sm" id='engine' placeholder='Engine' onChange={this.engineChange} />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.engineError}
                                    </div>
                                </Col>
                                <Col>
                                    <h5 className="card-title">Reversor</h5>
                                    <input type='number' className="input form-control form-control-lg inputGroup-sizing-sm" id='reversor' placeholder='Reversor' onChange={this.reversorChange} />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.reversorError}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <h5 className="card-title">Braking application level</h5>
                                    <select defaultValue="-1" className="input text-select form-select form-select-sm form-control-sm select custom-select mb-3" id="brankingLevel" onChange={this.brakingLevelChange}>
                                    <option value="-1" disabled>Select...</option>
                                    <option value="1">Maximum Manual</option>
                                    <option value="2">Autobrake High</option>
                                    <option value="3">Autobrake Med.</option>
                                    <option value="4">Autobrake Low</option>
                                    </select>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.breakingError}
                                    </div>
                                </Col>
                                <Col>
                                    <h5 className="card-title">Certification</h5>
                                    <select defaultValue="-1" className="input text-select form-select form-select-sm form-control-sm custom-select select md-3" id="btnCertification" onChange={this.certificationChange}>
                                        <option value="-1" disabled>Select</option>
                                        <option value="1">ANAC</option>
                                        <option value="2">EASA</option>
                                        <option value="2">FAA</option>
                                    </select>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.certificationError}
                                    </div>
                                </Col>
                                <Col>
                                    <h5 className="card-title">Flap</h5>
                                    <select defaultValue="-1" className="input text-select form-select form-select-sm form-control-sm custom-select select md-3" id="btnFlap" onChange={this.flapChange}>
                                        <option value="-1" disabled>Select</option>
                                        <option value="1">220</option>
                                        <option value="2">450</option>
                                    </select>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.flapError}
                                    </div>
                                </Col>
                                
                               
                            </Row>
                            <Row>
                                <Col>
                                    <h5 className="card-title">Aircraft Weight Min </h5>
                                    <input type='number' className='input form-control form-control-lg inputGroup-sizing-sm' id="weight" placeholder="Aircraft Weight" onChange={this.aircraftWeightChangeMin} />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.weightMinError}
                                    </div>
                                </Col>
                                <Col>
                                    <h5 className="card-title">Aircraft Weight Max </h5>
                                    <input type='number' className='input form-control form-control-lg inputGroup-sizing-sm' id="weight" placeholder="Aircraft Weight" onChange={this.aircraftWeightChangeMax} />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.weightMaxError}
                                    </div>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Row className="px-2 mt-5">
                                <Col/>
                            </Row>
                            <Row className="px-2">
                                <Col>
                                    <Button className="botao-resultado" size="lg" onClick={this.postClickButton}>Save</Button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Form>
                    </Container>
                </Container>
            </form>
        );
    }
}


export default cadastroAeronave;