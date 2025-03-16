import React, { useState } from "react"
class User extends React.Component{

    constructor(props){
        super(props);
        console.log("in user constructor ");
        this.state = {userInfo:{
            Name:"manas",
            Location:"default"
        }};
    }
    async componentDidMount(){
        const data = await fetch("https://api.github.com/users/ManasaNagaram");
        const json = await data.json();
        this.setState({userInfo:json});
        console.log(json);
   }
 
    render(){
        console.log("in render of user");
        
        return <div className="user-card">
            
        <h2>Name: {this.props.name}</h2>
        <h3>Location: Hyderabad</h3>
        <h4>Contact : </h4>
       
       
        </div>
    }

}
export default User