import EntryForm from './infoForm'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {  
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const userInfo = JSON.parse(localStorage.getItem('user'));
            if (!userInfo) {
                setIsAdmin(false)
            } else if (userInfo || userInfo.privileges === 'all') {
                setIsAdmin(true)
            } 
            
        }

        checkAuth();
    }, []);

    const handleLoginClick = () => {
        navigate('./login')
    }

    if(!isAdmin) {
        return (
            <div className="tempPage" style={{minHeight: '100vh'}}>
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
            >Login/Out</button> 
            <EntryForm />
        </div>
    )
 }

export default AdminPage;