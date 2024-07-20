import React from 'react'
import { BsFillPersonDashFill } from "react-icons/bs";
import Swal from 'sweetalert2'
import { authAxios } from "./AxiosConfig";
function ExistingUser({ users }) {

    const [usersToShow, setUsers] = React.useState(users);

    React.useEffect(() => {
        setUsers(users);
    }, [users])

    function handleRemove(id, name) {
        Swal.fire({
            title: 'Are you sure you want to remove ' + name + '?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                authAxios
                    .delete("/users/", {
                        params: {
                            user: id
                        },
                    })
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            name + ' has been removed.',
                            'success'
                        )
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
            <div className='admindashboard-existing-user-container' onClick={() => handleRemove(user.id, user.name)}>
                <div className='admindashboard-user'>
                    <div className='admindashboard-username'>{user.name}</div>
                    <div className='admindashboard-authority'>{user.Authority}</div>
                </div>
                <BsFillPersonDashFill className='delete-icon'></BsFillPersonDashFill>
            </div>
        </li>);


    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default ExistingUser
