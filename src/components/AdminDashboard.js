import React, { Component } from 'react'
import ExistingUser from './ExistingUser'
import UserToBeApproved from './UserToBeApproved'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css"; // import css
// import 'react-tabs/style/react-tabs.css';
import "./AdminDashboard.css";
import { authAxios } from "./AxiosConfig";
class AdminDashboard extends Component {
    fetchData = () => {
        //users to be approved
        if (this.state.activeTab === 0) {
            authAxios
                .get("/users/", {
                    params: {
                        users_per_page: this.state.resultsPerPage,
                        page_number: this.state.currentPage,
                        unauthorized: true
                    },
                })
                .then(response => {
                    var count = JSON.parse(JSON.stringify(response.data.count))
                    var usersArray = JSON.parse(JSON.stringify(response.data.users));
                    console.log(response)
                    var users = [];
                    for (var i = 0; i < usersArray.length; i++) {
                        var user = {
                            id: usersArray[i].username,
                            name: usersArray[i].first_name + ' ' + usersArray[i].last_name,
                            Authority: usersArray[i].role,
                        };
                        users.push(user);
                    }
                    // console.log(usersArray);
                    this.setState({
                        usersToBeApproved: users,
                        usersToBeApprovedTotalSize:count
                    });
                });
        }
        //All existing users
        else {
            authAxios
                .get("/users/", {
                    params: {
                        users_per_page: this.state.resultsPerPage,
                        page_number: this.state.currentPage,
                        unauthorized: false
                    },
                })
                .then(response => {
                    var count = JSON.parse(JSON.stringify(response.data.count))
                    var existingUsersArray = JSON.parse(JSON.stringify(response.data.users));
                    console.log(response)
                    var existingUsers = [];
                    for (var i = 0; i < existingUsersArray.length; i++) {
                        var user = {
                            id: existingUsersArray[i].username,
                            name: existingUsersArray[i].first_name + ' ' + existingUsersArray[i].last_name,
                            Authority: existingUsersArray[i].role,
                        };
                        existingUsers.push(user);
                    }
                    // console.log(existingUsersArray);
                    this.setState({
                        existingUsers: existingUsers,
                        existingUsersTotalSize: count
                    });
                });
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            resultsPerPage: 5,
            usersToBeApproved: [],
            existingUsers: [],
            activeTab: 0,
            usersToBeApprovedTotalSize: 10,
            existingUsersTotalSize: 10
        }
    }
    changeCurrentPage = numPage => {
        this.setState(
            {
                currentPage: numPage
            }, () => this.fetchData());
    };
    render() {
        return (
            <div className='AdminDashboard'>
                <div className='wrapper'>
                    <Tabs onSelect={(index) => this.setState({
                        activeTab: index,
                        currentPage: 1
                    }, () => this.fetchData())}>
                        <TabList>
                            <Tab>Users Requests</Tab>
                            <Tab>Users</Tab>
                        </TabList>
                        <TabPanel>
                            <div className='admindashboard-title' >
                                <UserToBeApproved users={this.state.usersToBeApproved}  ></UserToBeApproved>
                                <Pagination
                                    currentPage={this.state.currentPage}
                                    totalSize={this.state.usersToBeApprovedTotalSize}
                                    sizePerPage={this.state.resultsPerPage}
                                    changeCurrentPage={this.changeCurrentPage}
                                    theme="bootstrap"
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='admindashboard-title'>
                                <ExistingUser users={this.state.existingUsers} ></ExistingUser>
                                <Pagination
                                    currentPage={this.state.currentPage}
                                    totalSize={this.state.existingUsersTotalSize}
                                    sizePerPage={this.state.resultsPerPage}
                                    changeCurrentPage={this.changeCurrentPage}
                                    theme="bootstrap"
                                />
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default AdminDashboard
