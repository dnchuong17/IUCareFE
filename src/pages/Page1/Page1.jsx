import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Calendar from './Calendar';

const Page1 = () => {
    return (
        <Routes>
            <Route path="/" element={<Sidebar />} />
            <Route path="/" element={<Calendar />} />
        </Routes>
    );
}

export default Page1;