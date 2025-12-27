
import {  Router, Routes, Route } from 'react-router-dom';
import ChooseRegister from '../pages/auth/ChooseRegister.jsx';
import UserRegister from '../pages/auth/UserRegister.jsx';
import UserLogin from '../pages/auth/UserLogin.jsx';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister.jsx';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin.jsx';
import CreateFood from '../pages/food-partner/CreateFood.jsx';
import Reels from '../pages/general/Reels.jsx';
import PartnerProfile from '../pages/Profile/PartnerProfile.jsx';
import FoodPartnerSearch from '../pages/general/FoodPartnerSearch.jsx';

const AppRoutes = () => {
    return (
           
            <Routes>
                <Route path="/reels" element={<Reels />} />
                <Route path="/home" element={<FoodPartnerSearch/>} />
                <Route path="/profile/:id" element={<PartnerProfile />} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                
            </Routes>
        
            
    )
}

    

export default AppRoutes