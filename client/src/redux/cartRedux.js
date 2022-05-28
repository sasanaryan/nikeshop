import {createSlice} from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct : (state,action) => {
         const existingItem = state.products.find((i) => i._id === action.payload._id && i.size === action.payload.size ); 
         if(existingItem){
            existingItem.quantity +=action.payload.quantity;
            state.total += action.payload.price*action.payload.quantity;
         }else{
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price*action.payload.quantity;

         }
           
        },
        removeItemFromCart: (state, action) => {
            const removedProduct = state.products.find((i,index) => i._id === action.payload.id && index ===action.payload.index );

            state.total -= removedProduct.price*removedProduct.quantity;
            state.products = state.products.filter((i,index) => i._id !== action.payload &&index !==action.payload.index);
            state.quantity -= 1;
            
         },
         addQuantityToItem: (state, action) => {
            const existingItem = state.products.find((i,index) => i._id === action.payload && index === action.payload.index ); 

            state.products.forEach((item,index) => {
               if (item._id === action.payload.id && index === action.payload.index ) {
                existingItem.quantity += 1;
                  state.total += item.price;
               }
            });
         },
         subtractQuantityFromItem: (state, action) => {
            const existingItem = state.products.find((i,index) => i._id === action.payload.id && index === action.payload.index ); 

            state.products.forEach((item,index) => {
               if (item._id === action.payload.id && index === action.payload.index ) {
                existingItem.quantity -= 1;
                  state.total -= item.price;
               }
            });
         },
    },
});

export const {addProduct,removeItemFromCart,addQuantityToItem ,subtractQuantityFromItem} = cartSlice.actions;
export default cartSlice.reducer;