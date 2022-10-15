import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'


function Edit() {


    const { id } = useParams();
    const url = `http://localhost:3001/`
    const [data, setData] = useState([])
    const [userName, setUserName] = useState('')
    const [userOrientation, setUserOrientation] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        getData(); 
        console.log(data)
     }, [data[0]?._id])
 
    const getData = () => {
        fetch(url + `users/${id}`)
        .then((response) => response.json())
        .then((data) => 
            setData(data),
            setUserName(data[0]?.userName),
            setUserOrientation(data[0]?.userOrientation)
        )
    }

    const updateData = (id) => {
        fetch(url + 'update', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: id,
                userName: userName,
                userOrientation: userOrientation
            })
        })
        .then(navigate('/'))
    }

    return (
        <div className="edit">
            <h1>Edit</h1>
            <div className="form">
                <label htmlFor="">Username</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/><br />
                <label htmlFor="">Orient</label>
                <input type="text" value={userOrientation} onChange={(e) => setUserOrientation(e.target.value)}/>
            </div>
            <button onClick={() => updateData(id)}>UPDATE</button>
        </div>
    )
}

export default Edit;