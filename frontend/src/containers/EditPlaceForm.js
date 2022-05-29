import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BASE_URL from "../Utils/baseURL"

export default function EditPlaceForm(props){
    const placeId = props.placeId
    const userId = <localStorage className="userId"></localStorage>

    const getPlace = () => {
        axios.get(BASE_URL + 'places/getPlaceById/'+placeId)
        .then(response => {
            setFormData(response.data.body)
        })
    }

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description:'' ,
        address: '',
        image: ''
    })
    const handleInputBox = (event) =>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const editPlace = () =>{
        const payload = new URLSearchParams()
        payload.append('placeID',placeId)
        payload.append('creator',userId)
        payload.append('title',formData.title)
        payload.append('description',formData.description)
        payload.append('address',formData.address)
        payload.append('image',formData.image)
        axios.post(BASE_URL+'places/updatePlace',payload)
        .then(response =>{
            navigate('/dashboard/'+userId)
        })
    }


    useEffect(() => {
      getPlace()
    },[])

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
        <button onClick={() => editPlace()}> Edit </button> 
        <button onClick={() => navigate('/dashboard/'+ userId)}> Cancel </button> 
        <br/>
    </>)
}