import EntryForm from './infoForm'
import { useEffect, useState } from 'react';

const AdminPage = () => {  
    const [isAdmin, setIsAdmin] = useState(false)

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

    if(!isAdmin) {
        return (
            <div className="tempPage">
                <h1>Sorry, not allowed!</h1>
            </div>
        )
    }

    return (
        <div className="tempPage">
            <EntryForm />
        </div>
    )
 }

export default AdminPage;