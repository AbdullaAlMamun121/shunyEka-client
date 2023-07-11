import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addUser,updateUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CreateUser = () => {

    const bg_background = {
        background: 'linear-gradient(to right, #8A2BE0, #801C00)',
      };

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.users.users);
    const user = users.find(u => u.id === id);

    const [name, setUserName] = useState(user ? user.name : '');
    const [email, setUserEmail] = useState(user ? user.email : '');
    const [phone, setUserPhone] = useState(user ? user.phone : '');

    useEffect(() => {
        if (user) {
            setUserName(user.name)
            setUserEmail(user.email)
            setUserPhone(user.phone)
        }
    }, [user])


    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name,
            email,
            phone
        };
        if (user) {
            axios.put(`https://shuny-eka-server-eight.vercel.app/updateUser/${id}`, userData).then( res =>{
                dispatch(updateUser({id,name,email,phone}));
                navigate('/');
            }).catch(err => console.error(err));
        } else {
            axios.post('https://shuny-eka-server-eight.vercel.app/addUser', userData).then(res => {
                dispatch(addUser(res.data));
                navigate('/');
            }).catch(err => console.error(err));
        }

    }

    return (
        <div style={bg_background} className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-black mb-4 text-center">{user ? 'Update User': 'Add Your User Here'}</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput2"
                            placeholder="Enter Your Email Address"
                            value={email}
                            onChange={(event) => setUserEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput3">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="exampleFormControlInput3"
                            placeholder="Enter Your Number"
                            value={phone}
                            onChange={(event) => setUserPhone(event.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>{user ? 'Update User': 'Create User'}</button>
                </form>
            </div>
        </div>

    );
};

export default CreateUser;