import {React,Component} from "react";

class Contact extends Component{
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
                    This is Contact
                </h3>
            </div>
        );
    }
}
export default Contact;