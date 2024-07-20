import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./MatchCard.css";
import "./UserProfile.css"
import {authAxios} from "./AxiosConfig";
import MatchCard from "./MatchCard";
import Swal from 'sweetalert2';
import ChangePass from "./ChangePass";
const CITIES = [
    { key: "cairo", value: "Cairo" },
    { key: "alexandria", value: "Alexandria" },
    { key: "giza", value: "Giza" },
    { key: "shubra el-kheima", value: "Shubra El-Kheima" },
    { key: "port said", value: "Port Said" },
    { key: "suez", value: "Suez" },
    { key: "luxor", value: "Luxor" },
    { key: "al-mansura", value: "Al-Mansura" },
    { key: "el-mahalla el-kubra", value: "El-Mahalla El-Kubra" },
    { key: "tanta", value: "Tanta" },
    { key: "asyut", value: "Asyut" },
    { key: "ismailia", value: "Ismailia" },
    { key: "fayyum", value: "Fayyum" },
    { key: "zagazig", value: "Zagazig" },
    { key: "aswan", value: "Aswan" },
    { key: "damietta", value: "Damietta" },
    { key: "damanhur", value: "Damanhur" },
    { key: "al-minya", value: "Al-Minya" },
    { key: "beni suef", value: "Beni Suef" },
    { key: "qena", value: "Qena" },
    { key: "sohag", value: "Sohag" },
    { key: "hurghada", value: "Hurghada" },
    { key: "6th of october city", value: "6th of October City" },
    { key: "shibin el kom", value: "Shibin El Kom" },
    { key: "banha", value: "Banha" },
    { key: "kafr el-sheikh", value: "Kafr el-Sheikh" },
    { key: "arish", value: "Arish" },
    { key: "mallawi", value: "Mallawi" },
    { key: "10th of ramadan city", value: "10th of Ramadan City" },
    { key: "bilbais", value: "Bilbais" },
    { key: "marsa matruh", value: "Marsa Matruh" },
    { key: "idfu", value: "Idfu" },
    { key: "mit ghamr", value: "Mit Ghamr" },
    { key: "al-hamidiyya", value: "Al-Hamidiyya" },
    { key: "desouk", value: "Desouk" },
    { key: "qalyub", value: "Qalyub" },
    { key: "abu kabir", value: "Abu Kabir" },
    { key: "kafr el-dawwar", value: "Kafr el-Dawwar" },
    { key: "girga", value: "Girga" },
    { key: "akhmim", value: "Akhmim" },
    { key: "matareya", value: "Matareya" },
  ];
const USERNAME_MAX_LENGTH = 50;
class UserProfile extends Component {
    state = {
        
        changepassword: false, // Open changepassword modal
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthdate: "",
        gender: "",
        city: "",
        address: "",
        role: "",
        authorized: false,
        tickets:[]
    };
    fetchUserData = () => {      
        authAxios
          .get("user/")
          .then(response => {
          this.setState({
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            birthdate: response.data.birthdate,
            gender: response.data.gender,
            city: response.data.city,
            address: response.data.address,
            role: response.data.role,
            authorized: response.data.authorized
          });
          }).catch(error=>{
            Swal.fire('Error happened please try again!',"",
            'error'
          )
          });
      };
      fetchReservationsData = () => {

        this.setState({                 
            tickets:[]
        });
        authAxios
          .get("reservations/")
          .then(response => {
            for(var i=0;i<response.data.length;i++){
                var date = response.data[i].match.date.replace('Z','')
                date = date.replace('T',' ')
                var ticket= {
                    ticket_id:response.data[i].ticket_id,
                    seat_id:response.data[i].seat_id,
                    match: {
                        id: response.data[i].match.match_id,
                        time: date,
                        home: response.data[i].match.home_team,
                        away: response.data[i].match.away_team,
                        stadium: response.data[i].match.match_venue,
                        referee: response.data[i].match.referee,
                        lineman1: response.data[i].match.linesmen[0],
                        lineman2: response.data[i].match.linesmen[1]                      
                    }
                }
                console.log(ticket)
                this.setState({
                    
                    tickets:this.state.tickets.concat(ticket)
                });
               }  
          })
          .catch(error=>{
            Swal.fire('Error happened please try again!',"",
            'error'
          )
          });
      };
    componentDidMount() {
        this.fetchUserData();
        this.fetchReservationsData();
    }   
    handleChangeusername=({ target }) => {
        this.setState({
            username: target.value,          
        });
    }
    handleChangeemail=({ target }) => {
        this.setState({
            email: target.value,     
        });
    }
    handleChangefirst_name=({ target }) => {
        this.setState({
            first_name: target.value,      
        });
    }
    handleChangelast_name=({ target }) => {
        this.setState({
            last_name: target.value,           
        });
    }
    handleChangebirthdate=({ target }) => {
        this.setState({
            birthdate: target.value,            
        });
    }
    handleChangegender=({ target }) => {
        
        this.setState({
            gender: target.value,            
        });
    }
    handleChangecity=({ target }) => {
        this.setState({
            city: target.value,           
        });
    }
    handleChangeaddress=({ target }) => {
        this.setState({
            address: target.value,           
        });
    }
    openchangepasswordModal = () => {
        this.setState({ changepassword: true });
      };
      
    colsechangepasswordModal = () => {
        this.setState({ changepassword: false });
      };
    changUserData=(e)=>{
        e.preventDefault();
        if(
            this.state.first_name=== "" ||
            this.state.last_name==="" ||
            this.state.birthdate==="" ||
            this.state.gender===""||
            this.state.city===""||
            this.state.address==="" 
            )
            {
                Swal.fire("please choose and enter valid data")
                return
            }
        Swal.fire({
            title: 'Do you want to edit your profile data?',
            showDenyButton: true,
            confirmButtonText: `Edit`,
            denyButtonText: `Cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
              
              authAxios.put("user/", {   
                first_name:this.state.first_name,
                last_name:this.state.last_name,
                birthdate:this.state.birthdate,
                gender:this.state.gender,
                city:this.state.city,
                address:this.state.address
            })
            .then(response => {    
             console.log(response) 
             Swal.fire("Profile edited successfully ", '', 'success')
             this.fetchUserData()
            }).catch(error=>{
                Swal.fire('Error happened please try again!',"",
                'error'
              )
              });
            } else if (result.isDenied) {
              Swal.fire("no edit done", '', 'info')
            }
          })
     
    
    }
 
  render() {    
    return (
    <>
        <div className="allprofile ">
            <div className=" photo">
                <div className='  justify-content-md-center match-card-row container-fluid'>
                    <div className="react-tabs ">
                        <form onSubmit={this.changUserData} id="form">
                            <h2>UserProfile</h2>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                  <label for="username">username:</label>
                                </div>
                                <div className="d-inline col  d-flex justify-content-start"> 
                                   <h4>{this.state.username}</h4>                         
                                </div>
                                <div className="d-inline col"></div>
                            </div>
                            <br/>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                    <label for="email">email:</label>
                                </div>
                                <div className="d-inline col  d-flex justify-content-start">                                   
                                    <h4>{this.state.email}</h4>                             
                                </div>
                                <div className="d-inline col"></div>
                            </div>
                            <br/>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                      <label for="first_name">first_name:</label>
                                </div>
                                <div className="d-inline col  d-flex justify-content-start form-group"> 
                                    <input className="form-input" id="username-sign" type="text" name="first_name" value={this.state.first_name} onChange={this.handleChangefirst_name} />
                                </div>
                                <div className="d-inline col"></div>
                            </div>                                        
                            <br/>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end ">
                                <label for="last_name">last_name:</label> 
                                </div>
                                <div className="d-inline col  d-flex justify-content-start form-group"> 
                                  <input className="form-input" id="username-sign" type="text" name="last_name" value={this.state.last_name} onChange={this.handleChangelast_name} />
                                </div>
                                <div className="d-inline col"></div>
                            </div>     
                            
                           
                            <br/>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                <label for="birthdate">birthdate:</label>
                                </div>
                                <div className="d-inline col  d-flex justify-content-start"> 
                                <div className="form-group">
                                <input className="form-input" type="date" id="date-input" name="birthDate" value={this.state.birthdate} onChange={this.handleChangebirthdate} required={true} min="1900-01-01"></input>
                                </div>     
                                </div>
                                <div className="d-inline col"></div>
                            </div>      

                            <br/>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                    <label for="gender">gender:</label>
                                </div>
                                <div className="d-inline col  d-flex justify-content-start">             
                                    <div  onChange={this.handleChangegender} id="htmlFor" className="form-check form-check-inline">
                                        <input checked={this.state.gender === "male"} className="form-check-input"id="male-radio" type="radio" name="gender" value="male" />
                                        <label className="form-check-label" htmlFor="male-radio">Male</label>
                                        <input checked={this.state.gender === "female"} className="form-check-input" id="female-radio" type="radio" name="gender" value="female" />
                                        <label className="form-check-label" htmlFor="female-radio">Female</label>
                                        <input checked={this.state.gender === "other"} className="form-check-input" id="other-radio" type="radio" name="gender" value="other" />
                                        <label className="form-check-label" htmlFor="other-radio">Other</label>
                                    </div>
                                </div>
                                <div className="d-inline col"></div>
                            </div>  
                          
                           
                            <br/>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                    <label for="city">city:</label>
                                </div>
                                <div className="d-inline col  d-flex justify-content-start"> 
                                    <div className="form-group">
                                    <select value={this.state.city} onChange={this.handleChangecity} name="city" id="city" className="form-input">{CITIES.map(city => (
                                        <option key={city.key} value={city.key}>{city.value}</option>
                                        ))};
                                    </select>
                                    </div>
                                </div>
                                <div className="d-inline col"></div>
                            </div>  
                          
                            
                            <br/>
                            <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                <label for="address">address:</label>
                                </div>
                               
                                <div className="d-inline col  d-flex justify-content-start form-group"> 
                                    <input className="form-input" id="username-sign" type="text" name="address" value={this.state.address} onChange={this.handleChangeaddress} />
                                </div>
                                <div className="d-inline col"></div>
                            </div>  
                           
                          
                            <br/>
                            <input  className="btn-primary btn-sm" type="submit" value="Change Your Data" />    
                        </form>
                        <br/>
                        <div>
                             <div className="row" >
                                <div className="d-inline col"></div>
                                <div className="d-inline col d-flex justify-content-end">
                                     <h4>To change your password click here</h4>
                                </div>
                                <div className="d-inline col  d-flex justify-content-start"> 
                                      <button type="button" class=" btn-primary btn-sm" onClick={this.openchangepasswordModal}>Change Password</button>
                                </div>
                                <div className="d-inline col"></div>
                            </div>                                                      
                        </div>
                        <br/>
                        <ChangePass openchangepasswordModal={this.state.changepassword} colsechangepasswordModal={this.colsechangepasswordModal} usernameMaxLength={USERNAME_MAX_LENGTH}/>
                    </div>
                    <div className="react-tabs ">
                        <h2>Your Reserved Tickets</h2>
                        {this.state.tickets.map(ticket => {
                                return <MatchCard key={ticket.match.match_id} seat_id={ticket.seat_id} ticket_id={ticket.ticket_id}
                                match={ticket.match} fetchReservationsData={this.fetchReservationsData} />;
                            })}
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        </div>
        </>
    );
  }
}

export default UserProfile;
