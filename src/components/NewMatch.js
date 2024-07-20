import React, {Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered, faMale} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import DateTimePicker from 'react-datetime-picker';
import {authAxios, apiUrl} from "./AxiosConfig";
import Swal from 'sweetalert2';
import "./NewMatch.css";
const TEAMS = {
  "": require("../assets/teams/void.png").default,
  "al ahly sc": require("../assets/teams/al ahly sc.png").default,
  "zamalek sc": require("../assets/teams/zamalek sc.png").default,
  "el gouna fc": require("../assets/teams/el gouna fc.png").default,
  "al masry sc": require("../assets/teams/al masry sc.png").default,
  "pyramids fc": require("../assets/teams/pyramids fc.png").default,
  "enppi sc": require("../assets/teams/enppi sc.png").default,
  "misr lel makkasa sc": require("../assets/teams/misr lel makkasa sc.png")
    .default,
  "ceramica cleopatra fc": require("../assets/teams/ceramica cleopatra fc.png")
    .default,
  "smouha sc": require("../assets/teams/smouha sc.png").default,
  "national bank of egypt sc": require("../assets/teams/national bank of egypt sc.png")
    .default,
  "ghazl el mahalla sc": require("../assets/teams/ghazl el mahalla sc.png")
    .default,
  "al ittihad alexandria club": require("../assets/teams/al ittihad alexandria club.png")
    .default,
  "aswan sc": require("../assets/teams/aswan sc.png").default,
  "tala'ea el gaish sc": require("../assets/teams/tala'ea el gaish sc.png")
    .default,
  "ismaily sc": require("../assets/teams/ismaily sc.png").default,
  "al mokawloon al arab sc": require("../assets/teams/al mokawloon al arab sc.png")
    .default,
  "wadi degla sc": require("../assets/teams/wadi degla sc.png").default,
  "el entag el harby sc": require("../assets/teams/el entag el harby sc.png")
    .default,
};
const options = [
    { value: 'al ahly sc' },
    { value: 'zamalek sc'},
    { value: 'el gouna fc'},
    { value: 'al masry sc' },
    { value: 'pyramids fc'},
    { value: 'enppi sc'},
    { value: 'misr lel makkasa sc' },
    { value: 'ceramica cleopatra fc'},
    { value: 'smouha sc'},
    { value: 'national bank of egypt sc' },
    { value: 'ghazl el mahalla sc'},
    { value: 'al ittihad alexandria club'},
    { value: 'aswan sc' },
    { value: "tala'ea el gaish sc"},
    { value: 'ismaily sc'},
    { value: 'al mokawloon al arab sc'},
    { value: 'wadi degla sc'},
    { value: 'el entag el harby sc' },

];

class NewMatch extends Component {
    state = {
        selectedOptionHome: "",
        selectedOptionAway: "",
        homeTeam :TEAMS[""],
        awayTeam: TEAMS[""],
        selectedOptionStadium:"",
        timevalue:new Date(),
        referee:'',
        line1:'',
        line2:'',
        stadiums:[],
        match_id:""
    };
 handleChangeHome = ({ target }) => {
    this.setState({
        selectedOptionHome: target.value,
        homeTeam:TEAMS[target.value],
    });
}
handleChangeAway = ({ target }) => {
    this.setState({
        
        selectedOptionAway: target.value,
        awayTeam:TEAMS[target.value],
    });
}
handleChangeStadium=({ target }) => {
    this.setState({
        selectedOptionStadium: target.value,
        
    });
}
TimeChange = (target) => {
    this.setState({
        timevalue:target
    });
}
handleChangereferee=({ target }) => {
    this.setState({
        referee: target.value,
        
    });
}
handleChangeline1=({ target }) => {
    this.setState({
        line1: target.value,
        
    });
}
handleChangeline2=({ target }) => {
    this.setState({
        line2: target.value,
        
    });
}
fetchStadiums=()=>{
  authAxios
  .get("stadiums/")
  .then(response => {
   for(var i=0;i<response.data.length;i++){
    var stadium= {
        id:response.data[i].stadium_id,
        name:response.data[i].name
    }
    this.setState({
        stadiums:this.state.stadiums.concat(stadium)
    });
   }    
  }).catch(error=>{
    Swal.fire('Error happened please try again!',"",
    'error'
  )
  });
}
fetchData = () => {

  
  var thePath = window.location.href
  const match_id = thePath.substring(thePath.lastIndexOf(':') + 1)
  const urlWithoutHttp = apiUrl.substring(thePath.indexOf('/') + 2)
  if (!this.client) {
    this.client = new WebSocket('ws://' + urlWithoutHttp + 'match/reservations/' + match_id);
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
  }
  this.setState({
    match_id:match_id
  })
  if(match_id==="0"){}
  else{
    
  authAxios
    .get("/match/", {
      params: {
        id: match_id
      },
    })
    .then(response => {
      var matchInfo = JSON.parse(JSON.stringify(response.data));
      this.setState({
        id: matchInfo.match_id,
        timevalue: matchInfo.date,
        selectedOptionHome: matchInfo.home_team,
        selectedOptionAway: matchInfo.away_team,
        selectedOptionStadium : matchInfo.match_venue.stadium_id,
        referee: matchInfo.referee,
        line1: matchInfo.linesmen[0],
        line2: matchInfo.linesmen[1],
        homeTeam :TEAMS[matchInfo.home_team],
        awayTeam: TEAMS[matchInfo.away_team],
      });

    }).catch(error => {
      var errorMsg = error.response;
      Swal.fire(
        'Failed Loading Data From BackEnd!',
        errorMsg,
        'error'
      )
    });
  }
    

}


  componentDidMount() {
    this.fetchStadiums();
    this.fetchData();
}
createMatch=(e)=>{
    e.preventDefault();
    var now = new Date()
    if(
        this.state.selectedOptionHome=== "" ||
        this.state.selectedOptionAway==="" ||
        this.state.selectedOptionStadium==="" ||
        this.state.timevalue<=now ||
        this.state.referee==='' ||
        this.state.line1==='' ||
        this.state.line2==='' 
        )
        {
            Swal.fire("please choose and enter valid data")
            return
        }

    if(this.state.match_id === "0"){    
      Swal.fire({
          title: 'Do you want to create this match?',
          showDenyButton: true,
          confirmButtonText: `Create`,
          denyButtonText: `Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            
            authAxios.post("/match/", {   
              home_team: this.state.selectedOptionHome,
              away_team: this.state.selectedOptionAway,
              date: this.state.timevalue,
              referee: this.state.referee,
              linesmen: [
                this.state.line1,
                this.state.line2
              ],
              match_venue: this.state.selectedOptionStadium
      
          })
          .then(response => {    
          Swal.fire("Match created successfully ", '', 'success')
          
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
      else
      {
        Swal.fire({
          title: 'Do you want to edit this match?',
          showDenyButton: true,
          confirmButtonText: `Edit`,
          denyButtonText: `Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            
            authAxios.put("/match/", { 
              match_id:this.state.match_id,  
              home_team: this.state.selectedOptionHome,
              away_team: this.state.selectedOptionAway,
              date: this.state.timevalue,
              referee: this.state.referee,
              linesmen: [
                this.state.line1,
                this.state.line2
              ],
              match_venue: this.state.selectedOptionStadium
      
          })
          .then(response => {    
          Swal.fire("Match edited successfully ", '', 'success')
          
          }).catch(error=>{
            Swal.fire('Error happened please try again!',"",
            'error'
          )
          });
          } else if (result.isDenied) {
            Swal.fire("The match hasn't been edited", '', 'info')
          }
        })
      }

}
  render() {
    return (
        <>
        <div className="all">
          <div className="full-bg-size2">
            <form onSubmit={this.createMatch} id="form">
                <div className="container match-card" onClick={this.reserveMatch}>
                    <div className="row justify-content-md-center match-card-row">
                    <div className="col-md">
                        <h5>Home</h5>
                        <img src={this.state.homeTeam} alt="Home Team" height="70px"></img>
                        <label className="team-name"></label>

                        <select className="options" value={this.state.selectedOptionHome} onChange={this.handleChangeHome}>
                            <option className="option"></option>
                            {options.map(({ value }, index) => <option className="option" value={value}  >{value}</option>)}
                        </select>


                    </div>
                    <div className="col-md">
                        
                        <DateTimePicker className="datetime" onChange={this.TimeChange} value={this.state.timevalue} />
                  
                        
                        <br />
                        <label for="linesmen" className="small-text">choose the stadium</label>
                        <select className="options" value={this.state.selectedOptionStadium} onChange={this.handleChangeStadium}>
                            <option className="option"></option>
                            {this.state.stadiums.map(({ id,name }, index) => <option className="option" value={id} >{name}</option>)}
                        </select>

                        <br />
                        <label for="refereename" className="small-text"><FontAwesomeIcon icon={faMale} size="1x" /> Referee Name</label>
                        
                        <input className="inputfield" type="text" value={this.state.referee} onChange={this.handleChangereferee} id="refereename" name="refereename"></input>
                        
                        <label for="linesmen" className="small-text"><FontAwesomeIcon icon={faFlagCheckered} size="1x" /> Linesmen Names</label>
                     
                        <div style={{display:"flex" ,flexDirection:"row"}}>              
                          <input className="inputfield" type="text" value={this.state.line1} onChange={this.handleChangeline1} id="lineman1" name="lineman1"></input>
                          <input className="inputfield" type="text" value={this.state.line2} onChange={this.handleChangeline2} id="lineman2" name="lineman2"></input>
                        </div>
                    </div>
                    <div className="col-md">
                        <h5>Away</h5>
                        <img src={this.state.awayTeam} alt="Away Team" height="70px"></img>
                        <label className="team-name"></label>
                        <select className="options" value={this.state.selectedOptionAway} onChange={this.handleChangeAway}>
                            <option className="option"></option>
                            {options.map(({ value }, index) => <option className="option" value={value} >{value}</option>)}
                        </select>


                    </div>
                    {(this.state.match_id==="0")? 
                     <input className="btn " style={{margin:"20px"}} type="submit" value="Create" />:
                     <input className="btn " style={{margin:"20px"}} type="submit" value="Edit" />
                     }
                   
                    </div>
                </div>
              </form>
            </div>
            </div>
        </>
    );
  }
}

export default NewMatch;
