import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import BASE_URL from '../Utils/baseURL'
export default function Home(){
    const [cardData, setCardData]= useState([])
    const navigate = useNavigate()

    const getCardData = () => {
        axios.get(BASE_URL + 'users/getAllUsers/')
        .then(response =>{
            setCardData(response.data.body.users)
        })
    } 

    useEffect(()=>{
        getCardData()
    },[])
    return <> 
        <div className="allUsersCard">
            <div className="cards">
                    {
                        cardData.map((user) => {
                            return(
                                <div className="cardDesign" key= {user._id} onClick={() => navigate('/dashboard/'+user._id)}>
                                    <p> { user.name } {user.places.length}</p>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    </>
}