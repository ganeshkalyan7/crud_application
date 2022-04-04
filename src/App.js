import './App.css';
import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
import { Box, Paper } from '@mui/material'

function App() {
  const initial={
    name:"",
    email:"",
    age:"" ,
    id:""

  }
  const[value,setValue]=useState(initial)
  const [user,setUser]=useState([])

  const handleChange=(e)=>{
    
   
    setValue({...value, [e.target.name]: e.target.value})

  }


  const getdata=async()=>{
    var response=await axios.get(
      'https://623bfad68e9af5878949efc3.mockapi.io/users'
    );
   setUser(response.data);

  }


  const handleCreate = async () => {
    var response = await axios.post(
      'https://623bfad68e9af5878949efc3.mockapi.io/users',
      {
        name: value.name,
        age: value.age,
        email: value.email,
      }
    );
    var users = [...user];
    users.push(response.data);
    setUser(users);
    setValue({ 
      name: '', 
      age: '', 
      email: '' 

    })
    console.log(users)
  };


  const displayData = (id) => {
    var selectedData = user.filter((user) => user.id === id)[0];
    setValue({
      id: selectedData.id,
      name: selectedData.name,
      age: selectedData.age,
      email: selectedData.email,
    });
  };
        //UPDATE//
  const handleUpdate = async () => {
    var response = await axios.put(
      `https://623bfad68e9af5878949efc3.mockapi.io/users/${value.id}`,
      {
        name: value.name,
        age: value.age,
        email: value.email,
      }
    );
    var index = user.findIndex(
      (user) => user.id === response.data.id
    );
    var users = [...user];
    users[index] = response.data;
    setUser(users);
    setValue({
      name: '', 
      age: '', 
      email: '',
      id:''

    })
    // console.log(this.state.user);
  };


      //DELETE//
  const handleDelete = async (id) => {
    await axios.delete(
      `https://623bfad68e9af5878949efc3.mockapi.io/users/${id}`
    );
    var users= user.filter((user) => user.id !== id);
    setUser(users);

  };


 const  handleSubmit = async (e) => {
    e.preventDefault();
    if (value.id) {
      handleUpdate();
    } else {
      handleCreate();
    }
    
  };

  useEffect(()=>{
    getdata()
   },[])


  return (
    <>
    <div id="grid"> 
    <h1 className="container">CRUD APPLICATION</h1>
    <h2>users form </h2>
  <div id="form">
 <Box sx={{
          width: 500,
          height: 500,
          backgroundColor: 'primary.dark',
          Color: 'white'

        }} p={5}   className="container">
    <Paper  id="val">
      <Box p={5}>
       
          <form onSubmit={handleSubmit} className="container-lg" > 
            <div> 
             <label>name:</label>&nbsp; &nbsp;
            <input type="text" name="name" value={value.name}  onChange={handleChange}></input>
           </div> <br/>

          <div> 
            <label>age:</label>&nbsp; &nbsp;
             <input type="number" name="age"   value={value.age}  onChange={handleChange}></input>
        </div> <br/>
         <div> 
             <label>email:</label>&nbsp; &nbsp;
            <input type="email" name="email"   value={value.email}  onChange={handleChange}></input>
       </div> <br/>
        <div> 
           <button type="text" className="btn btn-success">submit</button> &nbsp; &nbsp;
           <button type="button"  className="btn btn-secondary">reset</button> 
        </div>
        <br/>
        </form>
      </Box>
    </Paper> 
  </Box>
  </div>

        <br/> <br/>
           <h1 className="container">USERS INFO</h1>
      <div>
        <table className="table table-dark  table-striped"> 
          <thead> 
            <tr>
            <td>id</td> 
              <td>name</td>
              <td>age</td>
              <td>email</td>
               <td>action</td>
            </tr>

          </thead>
          <tbody> 
            {
              user.map((data)=>{
                
                return <>
                <tr key={data.id}> 
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.age}</td>
                  <td>{data.email}</td>
                  <td> 
                    <button onClick={() => displayData(data.id)}  className="btn btn-primary">update</button>&nbsp; &nbsp;
                    <button onClick={() =>handleDelete(data.id)} className="btn btn-danger">delete</button>

                  </td>

                </tr>
                </>
             

              }) 
            
            
            }



          </tbody>


        </table>
        </div>



        </div>
    </>
   
  );
}

export default App;
