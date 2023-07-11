import React, { useEffect } from 'react';
import './App.css'
import CreateUser from './components/CreateUser'
import Users from './components/Users'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/userSlice';
import ViewUser from './components/ViewUser';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        dispatch(getUser(res.data));
        console.log(res)
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchUsers();
  }, [])

  return (
    <>
      {/* HEADER */}
      <header className="bg-dark text-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Logo</h1>
            </div>
            <div className="col-md-6 text-md-right">
              <nav>
                <ul className="list-inline">
                  <li className="list-inline-item" ><a className="text-light text-decoration-none" href="/">Home</a></li>
                  <li className="list-inline-item"><a className="text-light text-decoration-none" target='_blank' href="https://drive.google.com/file/d/1CmBVGO7HIMHE-SnbTqNJr6aYrKmNshC9/view?usp=sharing">Resume</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users></Users>}></Route>
          <Route path='/create' element={<CreateUser></CreateUser>}></Route>
          <Route path='/edit/:id' element={<CreateUser></CreateUser>}></Route>
          <Route path='/view/:id' element={<ViewUser></ViewUser>}></Route>
        </Routes>
      </BrowserRouter>
   {/* FOOTER */}
      <footer className="bg-dark text-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-right">
              <ul className="list-inline">
                <li className="list-inline-item "><a className="text-light text-decoration-none" href="#">Email: hmdabdulla121@gmail.com</a></li>
                <li className="list-inline-item"><a target='_blank' className="text-light text-decoration-none" href="https://www.linkedin.com/in/abdulla-al-mamun-bb4aaa148/">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>

  )
}

export default App
