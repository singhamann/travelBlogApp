import { useState } from "react"
import axios from 'axios'
// import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BASE_URL from "../Utils/baseURL"

export default function AddPlace(){
    // const userId= useSelector(state => state.userId)
    const userId= localStorage.userId
    console.log("userId is", userId)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        image: ''
    })
    const handleInputBox = (event) =>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const reset = () => {
        setFormData({
            title: '',
            description: '',
            address: '',
            image: ''
        })
    }
    const addPlace = () => {
        console.log("addPlace function called")
        const payload = new URLSearchParams();
        payload.append('title', formData.title)
        payload.append('description', formData.description)
        payload.append('address', formData.address)
        payload.append('image', formData.image)
        payload.append('creator', userId )
        console.log("payload is", payload.toString())

        axios.post(BASE_URL + 'places/createPlace', payload)
        .then((response) => {
            console.log("Success:", response.data)
            navigate('/dashboard/'+ userId)
        })
        .catch((error) => {
            console.error("Error adding place:", error)
        })
    }
    return(<>
        <label>
            Title : <input type='text' name="title" onChange={handleInputBox} value={formData.title} />
            <br/>
        </label>
        <label>
            Description : <textarea type='textarea' name="description" onChange={handleInputBox} value={formData.description} />
            <br/>
        </label>
        <label>
            Address : <textarea type='textbox' name="address" onChange={handleInputBox} value={formData.address} />
            <br/>
        </label>
        <label>
            Image URL : <input type='text' name="image" onChange={handleInputBox} value={formData.image} />
            <br/>
        </label>
        <button onClick={() => addPlace()}> Add </button>
        <button onClick={() => reset()}> Reset </button>
        <br/>
    </>)
}
