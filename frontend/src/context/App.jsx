import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", backendUrl);   
    const [doctors, setDoctors] = useState([]);

    const getAllDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            console.log(data);
            if (data.success) {
                setDoctors(data.doctors);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            if (err.response) {
                toast.error(err.response.data.message || "An error occurred");
            } else {
                toast.error(err.message);
            }
        }
    };

    useEffect(() => {
        getAllDoctorsData();
    }, []); // Run only once on mount

    const value = {
        doctors,
        currencySymbol,
        
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
