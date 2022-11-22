import React, { useState } from 'react'
import {Table,Button,Form,Container} from 'react-bootstrap'
import { create,all } from 'mathjs'
import 'chart.js/auto'
import { Scatter } from 'react-chartjs-2'
const math=create(all,{})

// var eiei= []
const Matrix = () => {
    const [table1,settable1] = useState([]);
    const print= () =>{
        console.log(data)
        // setX(data.map((x)=>x.X))
        // setY(data.map((x)=>x.Y))
        return(
            <Container>
                <Table variant='dark'>
                    <thead>
                        <tr>
                            <th width='20%'>N</th>
                            <th width='40%'>X</th>
                            <th width='40%'>Y</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Num}</td>
                                <td>{element.X}</td>
                                <td>{element.Y}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
            
        )
    }

    const setTable = (a,b,c) =>{
        var obj={}
        var testt=[];
        var eiei=[]
        // var x = null
        // var y = null
        for(let i=0;i<c;i++){
            var datay = (Math.random()*b).toFixed(0)
            obj={
                Num:i+1,
                X:i+1,
                Y:datay
            }
            testt[i]=i+1;
            data.push(obj)
            eiei.push({x:i+1,y:datay});
            console.log(table1)
            //settable([...table],table[i]['x']=i+1);
            //settable([...table],table[i]['y']=(Math.random()*b).toFixed(0));
            // console.log(table);
            
        }
        console.log(eiei)
        settable1(eiei)
        console.log(table1)
        var sumx = data.reduce(((a,b)=> a+=b.X),0);
        // console.log(sumx)
        var sumx2 = data.reduce(((a,b)=> a+=Math.pow(b.X,2)),0);
        // console.log(sumx2)
        var sumy = data.reduce(((a,b)=>a+=Number(b.Y)),0);
        // console.log(sumy)
        var sumxy = data.reduce(((a,b)=> a+=b.X*b.Y),0);
        // console.log(sumxy)
        
        var rangex = [[c,sumx],[sumx,sumx2]]
        // console.log(rangex)
        var rangey = [sumy,sumxy]
        // console.log(rangey)

        var cal = math.lusolve(rangex,rangey)
        console.log(cal)

        setCal(cal)

        // console.log(ma)

    }

    const data =[]  
    const [html,setHtml] = useState(null)
    const [x,setX] = useState("")
    const [y,setY] = useState()
    const [Cal,setCal] = useState([])
    const [n,setNum] = useState(0)
    const [show,setShow] = useState(false)

    // const state ={
    //     labels:null,
    //     datasets:[{
    //         label : 'X',
    //         backgroundColor:'white',
    //         borderColor:'red',
    //         pointBackgroundColor:'black',
    //         pointBorderColor:'green',
    //         pointHoverBackgroundColor:'pink',
    //         pointHoverBorderColor:'orange',
    //         // data:[{x:dataGraph1,y:dataGraph2}],
    //         // data:[
    //         //     {x:4,y:8},
    //         //     {x:6,y:3},
    //         //     {x:3,y:2},
    //         //     {x:1,y:4},
    //         //     {x:7,y:6},
    //         //     {x:8,y:1},
    //         //     {x:6,y:3}
    //         // ],
    //         data:table1,
    //         showLine:true
    //     }]
    // }

    const inputN =(event) =>{
        console.log(event.target.value)
        setNum(event.target.value)
    }
    const inputX = (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
    }
    const inputY = (event) =>{
        console.log(event.target.value)
        setY(event.target.value)
    }
    const setValue = () =>{
        // var ccc = []
        // for(let i=0;i<n;i++){
        //     ccc[i] = {X:null,Y:null};
        // }
        // console.log(ccc)
        // settable1(ccc)
        // console.log(table1)
        setTable(x,y,n)

        setShow(true)
        setHtml(print())
        
    }
  return (
    <Container>
        <Form>
            <h3>Matrix</h3>
            <Form.Group className='Matrix'>
                <Form.Label>Input n</Form.Label>
                <input type='number' id='n' placeholder='n' className='form-control' style={{width:'20%',margin:'auto'}} onChange={inputN}></input>
                <Form.Label>Input x</Form.Label>
                <input type='number' id='x' placeholder='x' className='form-control' style={{width:'20%',margin:'auto'}} onChange={inputX}></input>
                <Form.Label>Input y</Form.Label>
                <input type='number' id='y' placeholder='y' className='form-control' style={{width:'20%',margin:'auto'}} onChange={inputY}></input>
            </Form.Group>
            <br></br>
            <Button onClick={setValue}>Set</Button>
            <br></br>
            {show&&<h5>Answer is {Cal.map((a,b)=>"A"+b+" = "+a+" ")}</h5>}
            {show&&<Container>
            {html}
            <Scatter data={{
                labels: null,
                datasets:[{
                    label:'X',
                    data: table1,
                    fill:false,
                    showLine:true,
                    borderColor:'red',
                }]
            }}/>
            </Container>}
        </Form>
    </Container>
  )
} 

export default Matrix