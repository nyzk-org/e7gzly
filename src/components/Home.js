import React, { Component } from "react";
import { unAuthAxios } from "./AxiosConfig";
import MatchCard from "./MatchCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

class Home extends Component {
  state = {
    pageNumber: 1,
    resultsPerPage: 10,
    hasMore: true,
    matches: [],
  };

  fetchData = () => {
    unAuthAxios
      .get("/matches/", {
        params: {
          matches_per_page: this.state.resultsPerPage,
          page_number: this.state.pageNumber,
        },
      })
      .then(response => {
        var matchesArray = JSON.parse(JSON.stringify(response.data));
        if (matchesArray.length < this.state.resultsPerPage) {
          this.setState({ hasMore: false });
        }
        var matches = [];
        for (var i = 0; i < matchesArray.length; i++) {
          var date = matchesArray[i].date.replace('Z','')
          date = date.replace('T',' ')
          var match = {
            id: matchesArray[i].match_id,
            time: date,
            home: matchesArray[i].home_team,
            away: matchesArray[i].away_team,
            stadium: matchesArray[i].match_venue,
            referee: matchesArray[i].referee,
            lineman1: matchesArray[i].linesmen[0],
            lineman2: matchesArray[i].linesmen[1]
          };
          matches.push(match);
        }
        var nextPageNumber = this.state.pageNumber + 1
        this.setState({
          matches: this.state.matches.concat(matches),
          pageNumber: nextPageNumber
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <InfiniteScroll
        className="home-page"
        dataLength={this.state.matches.length} //This is important field to render the next data
        next={this.fetchData}
        hasMore={this.state.hasMore}
        loader={<FontAwesomeIcon id="loading-icon" icon={faSpinner} spin />}
        endMessage={
          <h3 id="no-more-matches" style={{ marginTop: "25px" }}>
            {" "}
            No more matches posted yet !!!
          </h3>
        }
      >
        {this.state.matches.map(match => {
          return <MatchCard key={match.id} match={match} />;
        })}
      </InfiniteScroll>
    );
  }
}

export default Home;
