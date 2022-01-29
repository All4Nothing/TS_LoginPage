import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Main from './Main';
import Cookies from 'js-cookie';

export interface UserInfo {
    email: string;
    username: string;
}

function App(): JSX.Element {

        var defaultValue: UserInfo = {
        email: '',
        username: '',
    }
    
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [user, setUser] = useState<UserInfo>(defaultValue)



    useEffect(() => {
        const setAxiosInstance = () => {
            try {
                const token = Cookies.get('csrftoken');
                if (typeof token === 'string') {
                    axios.defaults.headers.common['X-CSRFToken']= token;
                } else {
                    axios.defaults.headers.common['X-CSRFToken'] = 'undefined'
                }
                axios.defaults.withCredentials = true
                } catch (err) {
                console.dir(err);
                }
          }
        setAxiosInstance()

        const checkLogin = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/auth/me/', {
                    withCredentials: true
                })
            
                if (response.status === 200) {
                    setIsLogin(true)
                    console.log('is Login ?? || ', isLogin)
                    console.log(response)
                    setUser(response.data)
                }
            
            } catch (error) {
                console.dir(error)   
            }
        }
        checkLogin()
        
    }, [])
    
    return (
        <div>
            {isLogin ?
                <Main user={user} isLogin={isLogin} /> :
                <Login />
            }
        </div>
    )
}

export default App;