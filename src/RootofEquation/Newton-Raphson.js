import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { derivative, evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";

const NewtonRap = () => {
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXi(data.map((x)=>x.Xi));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xi}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalNewtonRap = (xuse) => {
        var xold,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        
        do
        {
            scope = {
                x:xuse
            }
            xold = xuse
            xuse = xuse - evaluate(Equation,scope)/derivative(Equation,'x').evaluate({x:xuse})
            iter++;
            ea = error(xold,xuse)
            obj = {
                iteration:iter,
                Xi:xuse
            }
            data.push(obj)
        }while(ea>e && iter<MAX)
        setX(xuse)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXi, setValueXi] = useState([]);
    const state = {
        labels: valueIter,
        datasets: [
          {
            label: 'X',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'blue',
            borderWidth: 2,
            data: valueXi
          }
        ]
    }
   
   
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^2)-7");
    const [X,setX] = useState(0);
    const [Xi,setXi] = useState(0);
    const [show,setShow] = useState(false);

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXi = (event) =>{
        console.log(event.target.value) 
        setXi(event.target.value)
    }

    const calculateRoot = () =>{
        const xnum = parseFloat(Xi)
        //console.log(xlnum);
        //console.log(xrnum);
        CalNewtonRap(xnum);
        //setData((Data)=>[...Data,data])
        //console.log(data);
        //console.log(Data);
        setShow(true);
        setHtml(print());
       
        //setState();
        console.log(valueIter)
        // console.log(valueXl)
    }

    return (
            <Container>
                <Form >
                    <h3 style={{color: 'Black',fontWeight : 'bold'}}>Newton Raphson Method</h3>
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} placeholder="Equation" onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X</Form.Label>
                        <input type ="number" id="Xi" onChange={inputXi} placeholder="X" style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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
                    text:'Newton Method',
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


export default NewtonRap