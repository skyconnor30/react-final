import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";

const OnePoint = () => {
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.Xi));
        setValueX1(data.map((x)=>x.Xii));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">Xi</th>
                            <th width="30%">Xi+1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xi}</td>
                                <td>{element.Xii}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalOnePoint = (xuse) => {
        var ea,scope,xold;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj={};
        do
        {
            xold = xuse
            scope = {
                x:xuse
            }
            xuse = evaluate(Equation,scope)
            ea = error(xold,xuse)
            iter ++;
            obj = {
                iteration:iter,
                Xi:xold,
                Xii:xuse,
            }
            data.push(obj)
           
        }while(ea>e && iter<MAX)
        setX(xuse)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
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
            data: valueX0
          },
          {
            label: 'Xm',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 2,
            data: valueX1
          },
        ]
    }
   
   
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13");
    const [X,setX] = useState(0);
    const [X0,setX0] = useState(0);
    const [show,setShow] = useState(false);

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }



    const calculateRoot = () =>{
        const x0 = parseFloat(X0)
        //console.log(xlnum);
        //console.log(xrnum);
        CalOnePoint(x0);
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
                    <h3 style={{color: 'Black',fontWeight : 'bold'}}>One Point Method</h3>
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X</Form.Label>
                        <input type="number" id="XL" onChange={inputX} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                {show&&<h5>Answer = {X.toPrecision(7)}</h5>}
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
                </Container>}
               
            </Container>
           
    )
}


export default OnePoint