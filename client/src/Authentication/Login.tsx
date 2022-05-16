import React, { useEffect } from 'react';
import axiosInstance from '../Axios';

export const Login = () => {
    useEffect(() => {
      axiosInstance.get('user');
    }, [])
    
    return (
        <div>Login</div>
    );
}
