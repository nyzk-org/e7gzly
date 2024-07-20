import React from 'react'
import { BsFillPersonCheckFill } from "react-icons/bs";
import Swal from 'sweetalert2'
import { authAxios } from "./AxiosConfig";
function UserToBeApproved({ users }) {

    const [usersToShow, setUsers] = React.useState(users);

    React.useEffect(() => {
        setUsers(users);
    }, [users])

    function handleRemove(id, name, authority) {
        Swal.fire({
            title: 'Are you sure you want to approve ' + name + ' as a ' + authority + ' ?',
            showCancelButton: true,
            confirmButtonText: `Approve`,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);
                //here send a request to the backend
                authAxios
                    .patch("/account/authorization/", null, {
                        params: {
                            user: id
                        },
                    })
                    .then(response => {
                        Swal.fire(name + ' Approved!', '', 'success')
                        const removedArr = [...usersToShow].filter(user => user.id !== id);
                        setUsers(removedArr);
                    }).catch(error => {
                        var errorMsg = error.response.data;
                        Swal.fire(
                            'Failed!',
                            errorMsg,
                            'error'
                        )
                    });
            }
        })
    };
    const list = usersToShow.map(user =>
        <li key={user.id}>
            <div id='admindashboard-user-container' onClick={() => handleRemove(user.id, user.name, user.Authority)}>
                <div className='admindashboard-user'>
                    <div className='admindashboard-username'>{user.name}</div>
                    <div className='admindashboard-authority'>{user.Authority}</div>
                </div>
                <BsFillPersonCheckFill className='approve-icon'></BsFillPersonCheckFill>
            </div>
        </li>);


    return (
        <div>
            <ul>
                {
                    list
                }
            </ul>
        </div>
    )
}

export default UserToBeApproved

