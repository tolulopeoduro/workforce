import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : 'userData',
    initialState : {
        isLoggedIn : false,
        data : {
            userId : '',
            token : '',
            username : ''
        }
    },
    reducers : {
        signIn : (state , data) =>  {
            return {
                isLoggedIn : true,
                data : {
                    userId : data.payload.userId,
                    token : data.payload.token,
                    username : data.payload.username
                }
            }
        },
        signOut : () =>  {
            return {
                isLoggedIn : false,
                data : {}
            }
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice;