import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./MatchCard.css";
import {authAxios} from "./AxiosConfig";
import Swal from 'sweetalert2';
import "./MatchReservation.css";

class NewStadium extends Component {


    state = {
        name:"",
        Capacity:"",
        vip_seats_per_row:"",
        vip_rows:0
    };

    handleChangeName=({ target }) => {
        this.setState({
            name: target.value,
            
        });
    }

    handleChangeCapacity=({ target }) => {
        this.setState({
            Capacity: target.value,
            
        });
    }
    handleChangevip_seats_per_row=({ target }) => {
        this.setState({
            vip_seats_per_row: target.value,
            
        });
    }
    handleChangevip_rows=({ target }) => {
        this.setState({
            vip_rows: target.value,
            
        });
    }
    createStadium=(e)=>{
        e.preventDefault();
        if(
            this.state.name=== "" ||
            this.state.Capacity==="" ||
            this.state.vip_seats_per_row >=10 ||
            this.state.vip_rows<=3  
            )
            {
                Swal.fire("please choose and enter valid data")
                return
            }
        Swal.fire({
            title: 'Do you want to create this Stadium?',
            showDenyButton: true,
            confirmButtonText: `Create`,
            denyButtonText: `Cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
              
              authAxios.post("/stadiums/", {   
                name: this.state.name,
                capacity: this.state.Capacity,
                vip_seats_per_row: this.state.vip_seats_per_row,
                vip_rows: this.state.vip_rows
            })
            .then(response => {    
             console.log(response) 
             Swal.fire("Stadium created successfully ", '', 'success')
            
            }).catch(error=>{
                Swal.fire('Error happened please try again!',"",
                'error'
              )
              });
            } else if (result.isDenied) {
              Swal.fire("The match hasn't been created", '', 'info')
            }
          })
     
    
    }
 
  render() {    
    return (
        <>
            <div className='bg-dim full-bg-size'>
                <div className="container match-card ">
                    <div className="row justify-content-md-center match-card-row">
                        <form onSubmit={this.createStadium} id="form">
                            <h1 className="col-md">Please enter the new Stadium Data</h1>
                            <h5 for="one">Name:</h5>
                            <input type="text" name="one" value={this.state.name} onChange={this.handleChangeName}></input>
                            <br/>
                            <h5 for="two">Capacity:</h5>
                            <input type="number" name="two" value={this.state.Capacity} onChange={this.handleChangeCapacity} ></input>
                            <br/>
                            <h5 for="three">vip_seats_per_row:</h5>
                            <input type="number" name="three" value={this.state.vip_seats_per_row} onChange={this.handleChangevip_seats_per_row} ></input>
                            <br/>
                            <h5 for="four">vip_rows:</h5>
                            <input type="number" name="four" value={this.state.vip_rows} onChange={this.handleChangevip_rows}></input>
                            <br/>
                            <br/>
                            <input type="submit" className=" btn-primary btn-sm" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
  }
}

export default NewStadium;
