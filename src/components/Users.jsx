import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/userSlice';

const Users = () => {

    const bg_background = {
        background: 'linear-gradient(to right, #8A2BE0, #801C00)',
      };

    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    console.log(users);

    const handleDelete = (id)=>{
        axios.delete(`http://localhost:5000/deleteUser/${id}`).then(res =>{
            console.log(res)
            dispatch(deleteUser({id}))
        }).catch(err=>{
            console.log(err);
        })
    }
 
    return (
        <div style={bg_background} className='d-flex vh-100 justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success btn-md'>
                    Add +
                </Link>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                               return <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>
                                        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-success me-2'>Update</Link>
                                        <Link to={`/view/${user.id}`} className='btn btn-sm btn-success me-2'>View</Link>
                                        <button onClick={()=>handleDelete(user.id)} className='btn btn-sm btn-danger'>Delete</button>
                                    </td>

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;