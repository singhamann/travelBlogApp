import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import BASE_URL from "../Utils/baseURL"
import {useNavigate} from 'react-router-dom'

export default function DashboardItems(props){
    const navigate= useNavigate()
    const userId = props.userId
    const authUserId= localStorage.userId
    const [authenticated, setAuthenticated] = useState(false)
    const [data, setData] = useState([])
    
    const getPlaces = () => {
        const payload = new URLSearchParams()
        payload.append('creator', userId)
        axios.get(BASE_URL + 'places/getPlace/'+userId)
        .then(response => {
            setData(response.data.body)
        })
    }

    const deletePlace = (placeId) =>{
        const payload = new URLSearchParams()
        payload.append('placeId', placeId)
        payload.append('creator', userId)
        axios.post(BASE_URL + 'places/deletePlace',payload)
        .then(response =>{
            getPlaces()
        })
    }

    const showButtons = () => {
        if ( userId === authUserId){
            setAuthenticated(true)
        }
    }


    useEffect(()=>{
        getPlaces()
        showButtons()
    })
    return(<> 
            <div className="allUsersCard">
                <div className="cards">
                        {
                            data.map((place) => {
                                return(
                                    <div className="cardDesign" key={place._id} >
                                        <p> { place.title } - {place.description}</p>
                                        { authenticated ? 
                                         <>
                                            <button onClick={() => navigate('/editPlace/'+place._id)}>Edit </button>
                                            <button onClick={() => deletePlace(place._id)}>Delete</button>
                                         </> :
                                            <></>}
                                    </div>
                                )
                            })
                        }
                </div>
            </div>

     </>)
}