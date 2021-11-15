import React,{useState} from 'react';
import PercentageBar from './PercentageBar/PercentageBar';
import Table from 'react-bootstrap/Table';
import {Modal,Form} from 'react-bootstrap';
import { Picky } from 'react-picky';
import 'react-picky/dist/picky.css';
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "fusioncharts";
// import {reportingGraph} from '../CommonFunctions/DataSourceConfigs';
import {testFirstScreenValidation,testSecondScreenValidation,testThirdScreenValidation,testFourthScreenValidation} from './ScreenValidations';

 
//const PercentageBar = <PercentageBar/>;  

const percentageValue = 76;

// function handleClick(){
//   window.alert("working");
// };


const OEEReporting = () =>
  {
    const [show,setShow] = useState(false);
    const [site,setSite] =useState("Select Site");
    const [line,setLine] =useState("Select Line");
    const [runstart,setRunstart] =useState("Select Run Start Time");
    const [runend,setRunend] =useState("Select Run End Time");
    const [lineid,setLineid] =useState("Select Line ID");
    const [partid,setPartid] =useState("Select Part ID");
    const [step,setStep] = useState(4);
    const [alertModal,setAlertModal] = useState(true);
    

    function nextScreen(){
      if(step!==4)
      setStep(step+1);
      if(step===4)
        window.alert("Last screen");
    }
    function previousScreen(){
      if(step===1)
        window.alert("First Screen");
      if(step!==1)
        setStep(step-1);
    }
    let firstScreenAlert = step===1?<p style={{color:'orange',textAlign:'center'}}>"Please complete selections first"</p>:null;
    let secondScreenAlert = step===2?<p style={{color:'orange',textAlign:'center'}}>"Please select an anomoly"</p>:null;
    let thirdScreenAlert = step===3?<p style={{color:'orange',textAlign:'center'}}>"Third alert"</p>:null;
    let fourthScreenAlert = step===4?<p style={{color:'orange',textAlign:'center'}}>"Final alert"</p>:null;
    let modal = <div>
                    <Modal show={show} onHide={()=>setShow(false)} size="xl">
                      <Modal.Header closeButton>
                      <Modal.Title id="example-custom-modal-styling-title">
                        Controller On/Off Status Summary
                      </Modal.Title>
                    </Modal.Header>
                      <Form >
                     <div className='modal-body'>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          Table Content
                        </div>
                      </div>
                    </div>
                   </div>
                   {/*<div className='modal-footer'>
                    <button type ="button" className=" form-group btn btn-primary float-right" onClick={this.submit}>Submit</button>
                   </div>*/}
                      </Form>
                    </Modal>
                  </div>;
    let alertMessage = <div>
                    <Modal show={alertModal} onHide={()=>setAlertModal(false)} size="sm">
                      <Modal.Header closeButton>
                      <h2 style={{color:'red'}}>Alert</h2>
                    </Modal.Header>
                      <Form >
                     <div className='modal-body'>
                    <div className='row'>
                      <div className='col-lg-12 text-center deletetxt'>
                        {firstScreenAlert}
                        {secondScreenAlert}
                        {thirdScreenAlert}
                        {fourthScreenAlert}
                      </div>
                    </div>
                   </div>
                      </Form>
                    </Modal>
                  </div>
    let incompleteSelectionsButton = <button onClick={()=>setAlertModal(true)}>Next</button>;
    let nextButton = ((step===1&&testFirstScreenValidation(line,site,runstart,runend,lineid,partid)||(step===2&&testSecondScreenValidation())||(step===3))?(<button onClick={()=>nextScreen()}>Next</button>):(incompleteSelectionsButton));
    let screen1 = (step!==1?
                        null:
                          (<div>
                              <ul>Site Name
                            <Picky className= "" placeholder="Select Site" options={["partList","site2","site3"]} 
                                 value={site} includeFilter={false}
                                 dropdownHeight={300} defaultFocusFilter = {true} keepOpen={true}
                                  onChange={value=>{
                                  setSite(value);
                                }
                              }
                                />
                               </ul>  
                                <ul>Line Name<Picky className= "" placeholder="Select Line" options={["Line1","Line2","Line3"]} 
                                   value={line} includeFilter={false}
                                   dropdownHeight={300} defaultFocusFilter = {true} keepOpen={true}
                                    onChange={value=>{
                                    setLine(value);
                                  }
                                }
                                  />
                                  </ul>
                                <ul>Run Start<Picky className= "" placeholder="Select Run Start Time" options={["r1","r2","r3"]} 
                                   value={runstart} includeFilter={false}
                                   dropdownHeight={300} defaultFocusFilter = {true} keepOpen={true}
                                    onChange={value=>{
                                    setRunstart(value);
                                  }
                                }
                                  />
                                  </ul>
                                <ul>Run End<Picky className= "" placeholder="Select Run End Time" options={["re1","re12","re3"]} 
                                   value={runend} includeFilter={false}
                                   dropdownHeight={300} defaultFocusFilter = {true} keepOpen={true}
                                    onChange={value=>{
                                    setRunend(value);
                                  }
                                }
                                  /></ul>
                                <ul>Line ID<Picky className= "" placeholder="Select Line ID" options={["li1","li2","li3"]} 
                                   value={lineid} includeFilter={false}
                                   dropdownHeight={300} defaultFocusFilter = {true} keepOpen={true}
                                    onChange={value=>{
                                    setLineid(value);
                                  }
                                }
                                  /></ul>
                                <ul>Part ID<Picky className= "" placeholder="Select Part ID" options={["pi1","pi2","pi3"]} 
                                   value={partid} includeFilter={false}
                                   dropdownHeight={300} defaultFocusFilter = {true} keepOpen={true}
                                    onChange={value=>{
                                    setPartid(value);
                                  }
                                }
                                /></ul>
                        </div>));
    let screen2 = (step!==2?
                    null:
                    ( <div>
                          <p>{site},{line},{lineid}</p>
                          <p>Run Start: {runstart}</p>
                          <p> Part ID: {partid}</p>
                          <p>Run End: {runend}</p>
                          <p> Part Description: Unavailable</p>
                          <div onClick={()=>setShow(true)}>
                            <label>Run Metrics Performance</label>
                            <p>Controller On %</p> 
                            <PercentageBar style={{width:"80%"}} percentage={percentageValue} />
                            <p> CP</p>
                            <p>Controller Active %</p>
                            <PercentageBar percentage={percentageValue}/>
                            <p> CPK </p>
                          </div>
                          <h2>Anomoly Report:</h2>
                          <div style={{borderStyle:"solid"}}> Data goes here</div>
                      </div>
                      ));
    let screen3 = (step!==3?null:(<div>
                          <p>{site},{line},{lineid}</p>
                          <p>Run Start: {runstart}</p>
                          <p> Part ID: {partid}</p>
                          <p>Run End: {runend}</p>
                          <p> Part Description: Unavailable</p>
                          <div onClick={()=>setShow(true)}>
                            <label>Run Metrics Performance</label>
                            <p>Controller On %</p> 
                            <PercentageBar style={{width:"80%"}} percentage={percentageValue} />
                            <p> CP</p>
                            <p>Controller Active %</p>
                            <PercentageBar percentage={percentageValue}/>
                            <p> CPK </p>
                          </div>
                          <h2>Process Data Graph:</h2>
                          <div style={{borderStyle:"solid"}}> Graph goes here</div>
                      </div>));
    let screen4 = (step!==4?null:(<div>Step 4</div>));
    let next = (step===4?null:nextButton);
    let back = ((step===1)?null:(<button onClick={()=>previousScreen()}>Back</button>));
    let addToReport = ((step!==2&&step!==3)?null:(<button onClick={()=>window.alert("Add to Report")}>Add to Report</button>));
    let printReport = (step!==4?null:(<button onClick={()=>window.alert("Print Report")}>Print Report</button>));
    return (<div>
                         {modal}
                   {alertMessage}
                  <div className="antialiased">
                        <div className="page">
                      <div className="content">
                            <ol className="breadcrumb breadcrumb-alternate px-3 mb-3 ll_Realview-breadcrumb" aria-label="breadcrumbs">
                              <li className="breadcrumb-item"><a href="#"><i className="zmdi zmdi-home zmdi-hc-fw"></i>Reporting</a></li>
                              <li className="breadcrumb-item active" aria-current="page"><a href="#"> Reporting</a></li>
                            </ol>
                            <div><h1>Extrusion Line Report</h1></div>
                            {screen1}
                            {screen2}
                            {screen3}
                            {screen4}
                          <div>
                            {next}
                            {back}
                            {addToReport}
                            {printReport}                          
                          </div>  
                         </div>
                      </div>
                  </div>
         </div>
         );
  }

export default OEEReporting; 