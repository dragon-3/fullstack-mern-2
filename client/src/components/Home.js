import React, { useEffect, useState } from 'react';
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {

    const url = 'http://localhost:3001/'
    const [data, setData] = useState([])
    const [userName, setUserName] = useState('')
    const [userOrientation, setUserOrientation] = useState('')

    useEffect(() => {
       getAllData(); 
       console.log(data)
    }, [])

    const getAllData = () => {
        fetch(url + 'users')
        .then((response) => response.json())
        .then((data) => setData(data))
    }

    const addData = () => {
        fetch(url + 'insert', {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                userName: userName,
                userOrientation: userOrientation
            })
        })
        .then(window.location.reload());
    }

    const deleteData = (id) => {
        fetch(url + `delete/${id}`, {
            method: "DELETE"
        })
        .then(window.location.reload());
    }

    return (
        <div className="home">
            <h1>Fullstack Crud App</h1>
            <div className="form">
                <table>
                    <th>User</th>
                    <th>Info</th>

                    {/* <tr>
                        <td>abc</td>
                        <td>def</td>
                    </tr> */}
                    {
                        data.map(
                            items => (
                                <tr key={items.id}>
                                    <td>{items.userName}</td>
                                    <td>{items.userOrientation}</td>
                                    <td>
                                        <Link to={`${items._id}`}><button>UPDATE</button></Link>
                                        <button onClick={() => deleteData(items._id)}>DELETE</button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </table>
            </div>
            <div className="add">
                <label htmlFor="">User: </label>
                <input type="text" onChange={(e) => setUserName(e.target.value)}/><br />
                <label htmlFor="">Orient: </label>
                <input type="text" onChange={(e) => setUserOrientation(e.target.value)}/><br />
                <button onClick={addData}>ADD</button>
            </div>
        </div>
    )
}

export default Home;