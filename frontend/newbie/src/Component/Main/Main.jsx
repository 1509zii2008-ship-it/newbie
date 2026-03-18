import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import './main.css'

function Main(){
    const [count, setCount] = useState(0)
    const [username, setUsername] = useState('')

    useEffect(() => {
        async function getUsersData(){
            const token = localStorage.getItem('token');
            if(!token)return

            try{
                const response = await fetch('https://newbie-9.onrender.com/me',{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                })
                if(response.ok){
                    const data = await response.json();
                    setCount(data.basket.length)
                    setUsername(data.username)
                }
            }catch(err){
                console.error(err);
                setCount(count)
                toast.error('No response from the server')
            }
        }
        getUsersData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    async function RequestCount(){
        const newCount = count + 1
        setCount(newCount)
        try{
            const response = await fetch('https://newbie-9.onrender.com/click', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({count: newCount})
            })
            const data = await response.json();
            console.log("Server updated:",data)
        }catch(err){
            setCount(count)
            console.error(err);
            toast.error('Error Click')
        }
        
    }

    return(
        <>
        <div className="main-block">
            <a className="profile-block" href="#">
                <img className="icon-profile" src="/icons/account.png" alt="profile"/>
                <p className="text-username">{username}</p>
            </a>
            <div className="click-block">
                <h1 className="top-text">Welcome {username}</h1>
                <div className="click-section">
                    <p className="point-count">{count}</p>
                    <button onClick={() => RequestCount()} className="click-button">Click</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Main