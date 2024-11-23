import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
    },
    reducers: {
        addUsers: (state, action) => {
            // state.users.push(action.payload);
            state.users = action.payload;
        },
        removeUser: (state, action) => {
            console.log("User is being removed");
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        } /* 
        fetchSingleUserWithId:(state,action)=>{
            state.users = state.users.map((user) => { */,

        // editUser: (state, action) => {
        /* const { id, name, email, phone } = action.payload;
            const existingUser = state.users.find((user) => user.id === id);
            existingUser.name = name;
            existingUser.email = email;
            existingUser.phone = phone;
            const { id, userDetail } = action.payload;
            const userIndex = state.users.findIndex((user) => user.id === id);
            console.log("UserDetail Spreaded" , userDetail);
            if (userIndex !== -1) {
                state.users[userIndex] = {
                    ...state.users[userIndex],
                    userDetail,
                    
                    address: {
                        ...state.users[userIndex].address,
                        userDetail?.address,
                    },
                    company: {
                        ...state.users[userIndex].company,
                        userDetail.company,
                    },
                };
            }
        }, */
        editUser: (state, action) => {
            const { id, userDetail } = action.payload;
            console.log("Action Payload", action);
            const userIndex = state.users.findIndex((user) => user.id === id);
            console.log("UserDetail Spreaded", userDetail);
            if (userIndex !== -1) {
                state.users[userIndex] = {
                    ...state.users[userIndex],
                    ...userDetail, // Spread userDetail into the user object
                    address: {
                        ...state.users[userIndex].address,
                        ...(userDetail.address || {}), // Merge address if provided
                    },
                    company: {
                        ...state.users[userIndex].company,
                        ...(userDetail.company || {}), // Merge company if provided
                    },
                };
            }
        },
    },
});

export const { editUser, removeUser, addUsers } = userSlice.actions;
export default userSlice.reducer;
