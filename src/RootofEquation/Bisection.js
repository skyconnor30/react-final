// import {React,Component} from "react";
// import Form from "react-bootstrap/Form";
// import { Button } from "react-bootstrap";

// class Bisection extends Component{
//     constructor(){
//         super();
//     }
//     getValue(){
//         var Number = document.getElementById("number").value;
//         var Root = document.getElementById("rootof").value;
//         console.log(Number);
//         console.log(Root);
//         document.getElementById("shownumber").innerHTML=Number;
//         document.getElementById("showrootof").innerHTML=Root;
//         var Answer = Number.parseFloat + Root.parseFloat;
//         document.getElementById("showanswer").innerHTML=Answer;
//         console.log(Answer);
//     }
//     render(){
//         return(
//             <div>
//                 <h3>
//                     Bisection Calculation
//                 </h3>
//                 <Form>
//                     <Form.Group className="bisection">
//                         <Form.Label>
//                             input information
//                         </Form.Label>
//                         <div>
//                             <Form.Control id="number" type="number" step="1" placeholder="Number" style={{width:"20%",margin:"0 auto"}}></Form.Control>
//                             <Form.Control id="rootof" type="number" step="1" placeholder="Root" style={{width:"20%",margin:"0 auto"}}></Form.Control>
//                         </div>
//                         <Button onClick={this.getValue}>
//                             Submit
//                         </Button>
//                     </Form.Group>
//                 </Form>
//                 <div id="shownumber"></div>
//                 <div id="showrootof"></div>
//                 <div id ="showanswer"></div>
//             </div>
//         );
//     }
// }
// export default Bisection;
import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";


const Bisection =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));
        setValueError(data.map((x)=>x.Err));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                            <th width="30%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                                <td>{element.Err}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj={};
        do
        {
            xm = (xl+xr)/2.0;
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x:xm,
            }
            fXm = evaluate(Equation, scope)

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Err : ea
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    Err : ea
                }
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    const [valueError , setValueError] = useState([]);
    const state = {
        labels: valueIter,
        datasets: [
          {
            label: 'Xl',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: valueXl
          },
          {
            label: 'Xm',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 2,
            data: valueXm
          },
          {
            label: 'Xr',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'blue',
            borderWidth: 2,
            data: valueXr
          },
          {
            label: 'Error',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 2,
            data: valueError
          }
        ]
    }
   
   
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("13-(x^4)")
    const [X,setX] = useState(0)
    const [show,setShow] = useState(false)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        //console.log(xlnum);
        //console.log(xrnum);
        Calbisection(xlnum,xrnum);
        //setData((Data)=>[...Data,data])
        //console.log(data);
        //console.log(Data);
        setShow(true);
        setHtml(print());
       
        //setState();
        console.log(valueIter)
        console.log(valueXl)
    }

    return (
            <Container>
                <Form >
                    <h1 style={{color: 'Black',fontWeight : 'bold'}}>Bisection Method</h1>
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation"  value={Equation} placeholder="Equation" onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XL</Form.Label>
                        <input type="number" id="XL" onChange={inputXL} placeholder="XL" style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XR</Form.Label>
                        <input type="number" id="XR" onChange={inputXR} placeholder="XR" style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button color="#61dafb" style={{color: 'White',fontWeight : 'bold'}} onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                {show&&<h5>Answer = {X.toFixed(18)}</h5>}
                {show&&<Container>
                {html}
                <Line
                data={state}
                options={{
                title:{
                    display:true,
                    text:'Bisection Method',
                    fontSize:20
                    },
                legend:{
                display:true,
                position:'right'
                }
                }}
                />
                </Container>
                }
            </Container>
           
    )
}

export default Bisection;