import React from 'react';
import {Navbar,Container,Nav,Dropdown} from 'react-bootstrap';
import SecantCSS from "./RootofEquation/headder.module.css"

// var Brandstyle ={
//     color: '#61dafb',
//     fontSize: '120%',
//     fontFamily: 'Bakbak One',
// };
// var Homebar ={
//     color: 'White',
// };
export const NavBar = () =>{
    return(
        <Navbar bg = "dark" variant='dark' sticky='top' expand = "md" href="/">
            <Container>
                <Navbar.Brand>
                    <img src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" height="20"></img>
                <babel  className={SecantCSS.Brandstyle}> Kornmongkhon Ruesingpisch Project</babel>
                </Navbar.Brand>
                    <Nav className='home'>
                        <Nav.Link href="/Home" className={SecantCSS.Homebar}>Home</Nav.Link>

                    <Dropdown className="RootofEquation">
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Root of Equation
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href = "/Bisection">Bisection</Dropdown.Item>
                            <Dropdown.Item href = "/False-Position">False-Position</Dropdown.Item>
                            <Dropdown.Item href = "/One-Point">One-Point</Dropdown.Item>
                            <Dropdown.Item href = "/Newton-Raphson">Newton-Raphson</Dropdown.Item>
                            <Dropdown.Item href = "/Secant">Secant</Dropdown.Item>
                            <Dropdown.Item href = '/Matrix'>Matrix</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='LinearAlgebraic'>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Linear Algebraic Equation
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href = "/Cramer's-Rule">Cramer's Rule</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='Interpolation'>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Interpolation And Extrapolation
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href = "/test">Cramer's Rule</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Nav>
            </Container>
        </Navbar>
    )
}