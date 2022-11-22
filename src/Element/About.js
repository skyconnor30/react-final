import {React,Component} from "react";

class About extends Component{
    constructor(){
        super();
        console.log("constructor called");
    }
    componentDidMount(){
        console.log("componentDidMount called");
    }
    render(){
        console.log("render called")
        return(
            <div>
                <h3>
                    This is About
                </h3>
            </div>
        );
    }
}
export default About;