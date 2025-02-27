import React from 'react'
import SignIn from '../Components/SignIn/SignIn'


const Admin = () => {
    const [selectedComponent, setSelectedComponent] = useState("new-listings"); 
    return (
        <>
            <SignIn/>
        </>
    )
}

export default Admin