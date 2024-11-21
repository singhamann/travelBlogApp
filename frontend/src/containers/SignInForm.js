import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../store/actions'
import axios from 'axios'
import BASE_URL from '../Utils/baseURL'

export default function FormPractice() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handleInputBox = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const SignIn = () => {
        axios.get(BASE_URL + 'users/signIn/' + formData.email + '/' + formData.password)
            .then((response) => {
                dispatch(setUserDetails({ token: response.data.token, userId: response.data.id }))
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id)
                navigate('/home')
            });
    }

    return (<>
        <label>
            Email : <input type='email' name="email" onChange={handleInputBox} value={formData.email} />
            <br />
        </label>
        <label>
            Password: <input type='password' name="password" onChange={handleInputBox} value={formData.password} />
            <br />
        </label>
        <button onClick={() => SignIn()}> Login </button>
        <button onClick={() => navigate('/signup/')}> New User? Sign Up</button>
        <br />
    </>)
}