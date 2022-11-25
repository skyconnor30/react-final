import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";
import SecantCSS from "./headder.module.css";

const Secant = () => {
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.x0));
        setValueX1(data.map((x)=>x.x1));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X0</th>
                            <th width="30%">X1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.x0}</td>
                                <td>{element.x1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalSecant = (X0,X1) => {
        var X2,fx0,fx1,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        
        do
        {
            scope = {
                x:X0
            }
            fx0 = evaluate(Equation,scope)
            scope = {
                x:X1
            }
            fx1 = evaluate(Equation,scope)
            X2 = (X1-fx1*(X0-X1)/(fx0-fx1))
            X0 = X1;
            X1 = X2;
            iter++;
            ea = error(X0,X1)
            obj = {
                iteration:iter,
                x0:X0,
                x1:X1
            }
            data.push(obj)
        }while(ea>e && iter<MAX)
        setX(X2)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const state = {
        labels: valueIter,
        datasets: [
          {
            label: 'X0',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'blue',
            borderWidth: 2,
            data: valueX0
          },
          {
            label: 'X1',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: valueX1
          }
        ]
    }
   
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^2)-7")
    const [X,setX] = useState(0);
    const [x0,setX0] = useState(0);
    const [x1,setX1] = useState(0);
    const [show,setShow] = useState(false);

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value) 
        setX0(event.target.value)
    }

    const inputX1 = (event) =>{
        console.log(event.target.value) 
        setX1(event.target.value)
    }

    const calculateRoot = () =>{
        const xfirst = parseFloat(x0)
        const xsec = parseFloat(x1)
        //console.log(xlnum);
        //console.log(xrnum);
        CalSecant(xfirst,xsec);
        //setData((Data)=>[...Data,data])
        //console.log(data);
        //console.log(Data);
        setShow(true)
        setHtml(print());
       
        //setState();
        console.log(valueIter)
        // console.log(valueXl)
    }

    return (
            <Container>
                <Form >
                    <h3 className={SecantCSS.h3}>Secant Method</h3>
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} placeholder="Equation" onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X0</Form.Label>
                        <input type ="number" id="x0" onChange={inputX0} placeholder="X0" style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X1</Form.Label>
                        <input type ="number" id="x1" onChange={inputX1} placeholder="X1" style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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
                    text:'Secant Method',
                    fontSize:20
                    },
                legend:{
                display:true,
                position:'right'
                }
                }}
                />
                </Container>}
               
            </Container>
           
    )
}


export default Secant

