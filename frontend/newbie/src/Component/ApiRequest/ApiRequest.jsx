import './apiRequest.css'

function ApiRequest(){

    async function getUsers(){
        try{
            const response = await fetch('https://newbie-7.onrender.com/users')
            if(!response.ok) throw new Error('Ошибка сети');
            const data = await response.json();
            console.log(data);
        }catch(error){
            console.error(error);
        }
    }

    async function postUsers(){
        const response = await fetch('https://newbie-7.onrender.com/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: 'Danil', password: '1234', email: 'Newbie@gmail.com'})
        })
        const data = await response.json();
        console.log(data)
    }

    function handleChange(e){
        console.log(e.target.value);
    }

    return(
        <div className="main-block">
            <div className='form-block'>
                <input className='email-form' 
                onChange={handleChange}/>
                <input className='password-form' 
                onChange={handleChange}/>
                <button 
                className="click-request"
                onClick={getUsers}
                >Click Get
                </button>
                <button 
                className="click-request"
                onClick={postUsers}
                >Click Post
                </button>
            </div>
        </div>
    )
}

export default ApiRequest;