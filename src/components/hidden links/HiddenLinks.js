import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

const ShowOnLoggin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn) {
        return children;
    }
    return null;
}

export const ShowOnLoggOut = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn) {
        return children;
    }
    return null;
}

export default ShowOnLoggin

