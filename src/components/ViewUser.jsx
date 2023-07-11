import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ViewUser = () => {

    const bg_background = {
        background: 'linear-gradient(to right, #8A2BE0, #801C00)',
      };
    

    const { id } = useParams();
    const users = useSelector(state => state.users.users);
    const user = users.find(u => u.id === id);

    return (
        <div className="text-center">
            <div style={bg_background } className="vh-100  mx-auto pt-5">
                
                <div className="w-50 bg-white rounded p-3 mb-4 mx-auto">
                    {/* Card for single user */}
                    <div className="card">
                        <div className="card-header">{user ? user.name:''} Details Information</div>
                        <div className="card-body">
                            <h5 className="card-title">ID: {user ? user.id: ''}</h5>
                            <p className="card-text">Name: {user ? user.name:''}</p>
                            <p className="card-text">Email: {user ? user.email:''}</p>
                            <p className="card-text">Phone: {user ? user.phone : ''}</p>
                        </div>
                    </div>
                    {/* End of single user card */}
                </div>

                <div className="w-50 bg-white rounded p-3 mx-auto">
                    <h3 className="mb-4">Rest of the Users</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/" className="btn btn-success btn-md">
                        User Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;
