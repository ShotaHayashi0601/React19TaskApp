// Date: 02/19/2025
//レンダリングされているコンポーネントが複数ある場合、すべてのモーダルが起動してしまうためとりやめた。
// import { createSlice } from '@reduxjs/toolkit';

// interface ModalState {
//   isOpen: boolean;
// }

// const initialState: ModalState = {
//   isOpen: false,
// };
// const modalSlice = createSlice({
//   name: 'modal',
//   initialState,
//   reducers: {
//     openModal: (state) => {
//       state.isOpen = true;
//     },
//     closeModal: (state) => {
//       state.isOpen = false;
//     },
//   },
// });
// export const { openModal, closeModal } = modalSlice.actions;
// export default modalSlice.reducer;
