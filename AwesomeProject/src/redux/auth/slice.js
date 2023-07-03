// import { createSlice, isAnyOf } from '@reduxjs/toolkit';

// import {
//   createContactsThunk,
//   deleteContactsThunk,
//   getContactsThunk,
// } from './thunk';

// const handlePending = state => {
//   state.contacts.isLoading = true;
// };
// const handleFulfilledGet = (state, { payload }) => {
//   state.contacts.isLoading = false;
//   state.contacts.items = payload;
//   state.contacts.error = '';
// };
// const handleFulfilledCreate = (state, { payload }) => {
//   console.log('☎💢💙 ~ payload:', payload);

//   state.contacts.isLoading = false;
//   state.contacts.items.push(payload);
//   state.contacts.error = '';
// };
// const handleFulfilledDel = (state, { payload }) => {
//   state.contacts.isLoading = false;
//   state.contacts.items = state.contacts.items.filter(el => el.id !== payload);
//   state.contacts.error = '';
// };
// const handleRejected = (state, { payload }) => {
//   state.contacts.isLoading = false;
//   state.contacts.error = payload;
// };
// export const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     contacts: {
//       items: [],
//       isLoading: false,
//       error: null,
//     },
//   },
//   extraReducers: builder => {
//     builder

//       .addCase(getContactsThunk.fulfilled, handleFulfilledGet)

//       .addCase(createContactsThunk.fulfilled, handleFulfilledCreate)

//       .addCase(deleteContactsThunk.fulfilled, handleFulfilledDel)

//       .addMatcher(
//         isAnyOf(
//           getContactsThunk.pending,
//           createContactsThunk.pending,
//           deleteContactsThunk.pending
//         ),
//         handlePending
//       )

//       .addMatcher(
//         isAnyOf(
//           getContactsThunk.rejected,
//           createContactsThunk.rejected,
//           deleteContactsThunk.rejected
//         ),
//         handleRejected
//       );
//   },
// });
// export const contactsReducer = contactSlice.reducer;
