import EntryForm from './infoForm'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {  
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const cookieStr = document.cookie;
            const cookies = Object.fromEntries(cookieStr.split('; ').map(c => c.split('=')));

            console.log("Cookies:")
            console.log(cookies)

            if(cookies.userInfo) {
                console.log("in here")
                try {
                    const userInfo = JSON.parse(decodeURIComponent(cookies.userInfo))
                    console.log(userInfo)

                    if (userInfo.privileges === 'all') {
                        setIsAdmin(true)
                    } 
    
                } catch (e) {
                    throw new Error("Can't parse cookie")
                }
            }
        }

        checkAuth();
    }, []);

    const handleLoginClick = () => {
        navigate('../login')
    }

    if(!isAdmin) {
        return (
            <div className="tempPage" 
                 style={{minHeight: '100vh'}}
                >
                <h1>Sorry, not allowed!</h1>
                <button
                    onClick={() => handleLoginClick()}
                >Login</button>
            </div>
        )
    }

    return (
        <div className="tempPage">
            <button
                onClick={() => handleLoginClick()}
            >Login</button> 
            <EntryForm />
        </div>
    )
 }

export default AdminPage;