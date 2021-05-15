import { createSlice } from '@reduxjs/toolkit'

const SidebarSlice = createSlice({
    name : 'sidebar',
    initialState : {
        active : false
    },
    reducers : {
        active () {
            return {active : true}
        },
        inactive () {
            return {active : false}
        }
    }
})

export const sidebarActions = SidebarSlice.actions;

export default SidebarSlice;