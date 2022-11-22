import React, { useSyncExternalStore } from 'react'
import { useState } from 'react'
import { Button, Container, Table, Form } from 'react-bootstrap'
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'


const test = () => {
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.Iteration))
        setValueXL(data.map((x)=>x.Xl))
        setValueXM(data.map((x)=>x.Xm))
        setValueXR(data.map((x)=>x.Xr))
        return(
            <Container>
                <Table bordered variant='dark'>
                    <thead>
                        <tr>
                            <th width = '10%'>Iteration</th>
                            <th  width = '30%'> XL</th>
                            <th width = '30%'>XM</th>
                            <th width = '30%'>XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) =>{
                            return (
                                <tr key = {index}>
                                    <td>{element.Iteration}</td>
                                    <td>{element.Xl}</td>
                                    <td>{element.Xm}</td>
                                    <td>{element.Xr}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        )
        
    }

    const error = (xold,xnew) => Math.abs((xnew-xold)/xnew)*100

    const Calbisection = (xl,xr) =>{
        var xm, fXm, fXr, scope, ea
        var iter = 0
        var Max = 50
        const e = 0.000001
        var obj={}

        do{
            xm = (xl+xr)/2.0
            scope = {
                x:xr
            }
            fXr = evaluate(Equation,scope)

            scope = {
                x:xm
            }
            fXm = evaluate(Equation,scope)

            iter++
            if(fXm * fXr > 0){
                ea = error(xr,xm)
                obj ={
                    Iteration : iter,
                    Xl : xl,
                    Xm : xm,
                    Xr : xr
                }
                data.push(obj)
                xr = xm
            }else if( fXm * fXr < 0){
                ea = error(xl,xm)
                obj = {
                    Iteration : iter,
                    Xl : xl,
                    Xm : xm,
                    Xr : xr
                }
                data.push(obj)
                xl = xm
            }
        }while(ea > e && iter < Max)
        setX(xm)

    }

    const data=[]
    const [valueIer,setValueIter] = useState([])
    const [valueXL , setValueXL] = useState([])
    const [valueXm , setValueXM] = useState([])
    const [valueXR, setValueXR] = useState([])
    const state={
        labels : valueIer,
        datasets : [
            {
                label :'Xl',
                fill : false,
                lineTension : 0.5,
                backgroundColor : 'white',
                borderColor : 'red',
                borderWidth : 2,
                data : valueXL
            },
            {
                label : 'XR',
                fill : false,
                lineTension : 0.5,
                backgroundColor : 'white',
                borderColor : 'blue',
                borderWidth : 2,
                data : valueXR
            }
        ]
    }

    const [html,setHtml] = useState(null)
    const [Equation, setEquation] = useState('(x^2)-4')
    const [X,setX] = useState(0)
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

        const CalRoot = () =>{
            const xlnum = parseFloat(XL)
            const xrnum = parseFloat(XR)

            Calbisection(xlnum,xrnum)

            setHtml(print())
        }
  return (
    <Container>
        <Form>
            <Form.Group>
                <Form.Label>Equation</Form.Label>
                <input type ='text' id ='equation' value ={Equation} onChange={inputEquation} className='form-control'></input>
                <Form.Label>XL</Form.Label>
                <input type ='number' id='xl' onChange={inputXL} className='form-control'></input>
                <Form.Label>XR</Form.Label>
                <input type ='number' id='xr' onChange={inputXR} className='forn-control'></input>
            </Form.Group>
            <Button onClick={CalRoot}>Calculate</Button>
        </Form>
        <br></br>
        <h4>Answer = {X.toFixed(5)}</h4>
        <Container>
            {html}
            <Line 
            data = {state}
            option = {{
                title :{
                    diplay : true,
                    text : 'Bisection',
                    fontSize : 20
                },
                legenend :{
                    display : true,
                    position : 'right'
                }
            }}/>
        </Container>

    </Container>
  )
}

export default test