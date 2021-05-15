import { configureStore } from '@reduxjs/toolkit';
import SidebarSlice from './SidebarSlice';
import userSlice from './userSlice';


const store = configureStore({
    reducer: {userData : userSlice.reducer , sidebar : SidebarSlice.reducer}
})

export default store