import React, { useContext } from 'react';
import { UserContext } from '../../App';


export default () => {

const{user} = useContext(UserContext)

    return(
    <div className="profileButton">
    <div className="profileBase">
        <h2>User firstname: {user.name}</h2>
        <h2>User lastname: {user.lastName}</h2>
    </div>
    </div>
    )
}