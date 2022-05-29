import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import setToken  from '../store/actions';
import { setUserId } from '../store/actions';
import BASE_URL from '../Utils/baseURL';

export default function FormPractice(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        name:'',
        password: ''
    })

    const handleInputBox = (event) =>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    // const [data, setData] = useState([])
    const SignUp = () => {
        const payload = new URLSearchParams();
        payload.append('name', formData.name)
        payload.append('email', formData.email)
        payload.append('password', formData.password)
        axios.post(BASE_URL + 'users/signup', payload).then( (response)=>{
            // setData(response.data.body.token)
            dispatch(setToken(response.data.body.token));
            dispatch(setUserId(response.data.body._id));
            localStorage.setItem('token', response.data.body.token);
            localStorage.setItem('userId', response.data.body._id)
            navigate('/home')
        });
    }
    
    return(<>
        <label>
            Email : <input type='email' name="email" onChange={handleInputBox} value={formData.email} />
            <br/>
        </label>
        <label>
            Name : <input type='text' name="name" onChange={handleInputBox} value={formData.name} />
            <br/>
        </label>
        <label>
            Password: <input type='password' name="password" onChange={handleInputBox} value={formData.password} />
            <br/>
        </label>
        <button onClick={() => SignUp()}> Sign Up </button> 
        <button onClick={() => navigate('/signin')}> Existing User? Login</button> 
        <br/>
    </>)
}