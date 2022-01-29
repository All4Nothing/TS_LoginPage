import axios from "axios";
import React from "react";
import { UserInfo } from "./App"


interface MainProps {
    user: UserInfo,
    isLogin: boolean
}

function Main({
    user,
    isLogin
}: MainProps
): JSX.Element {

    const onLogout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/logout/', {
                withCredentials: true
            })
            console.log(response)
        } catch (error) {
            console.dir(error)
        }
        document.location.href = '/'
    }
    

    return (
        <div>
            <div>
                <h2>Main 페이지</h2>
                <li>{user.username}</li>
                <li>{user.email}</li>
            </div>
            <div>
                <button type='button' onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Main;