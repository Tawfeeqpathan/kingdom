import React, { useEffect } from 'react'
import Cartitem from './Cartitem'
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader';
import { getCart, updateItemInCart } from '../../state/cart/cartSlice';
import visa from '../../../../public/visa.png'
import american from '../../../../public/amarican.png'
import master from '../../../../public/master.png'
import diners from '../../../../public/diners.jpg'
import { data } from 'autoprefixer';
export default function Cart() {
  const {cart,loading} = useSelector(store => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
   
  }, []);
  const sizesValue = localStorage.getItem('value');
  useEffect(()=>{
    if(cart?.cartItems.length > 0){
      
      let findId = cart?.cartItems.length -1;
      const gotid =cart?.cartItems[findId]._id;
      if(cart?.cartItems[findId].sizes.length < 1){
      let sizes = []
      sizes.push( sizesValue)
      const data = {id:gotid,sizes:sizes,quantity:1}
      dispatch(updateItemInCart(data))}else{
      }
    }
  },[cart])
  // console.log(cart);
  const handlecheckout =()=>{
    navigate("/checkout?step=2")
  }
  return (
    !loading? <div className='lg:grid grid-cols-3 relative space-x-3  '>

       <div className='col-span-2'>
       {cart?.cartItems.map((i)=><Cartitem data={i}/>)}
       </div>
       <Grid className='sticky top-5 space-y-3 mt-7 '>
        <div className='border '>
          
          <h1 className=' flex justify-center align-center font-bold'>How you'll pay</h1>
          <div style={{display:'flex',alignItems:'center',flexWrap:'wrap',justifyContent:'center',gap:'10px'}}>
      <img src={visa} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={master} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={american} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={diners} alt="card" style={{width:'3rem',height:'2rem'}} />
          </div>
         <div className=' flex justify-around w-full  font-bold pt-3'>
          <span>Item(s) total</span>
          <span>£{cart?.totalPrice}</span>
        </div> 
          <div className=' flex justify-around w-full   pt-3'>
          <span>discount</span>
          <span className='text-green-500'>-£{cart?.discounte}</span>
        </div> 
          <div className=' flex justify-around w-full   pt-3'>
          <span>delivery charges</span>
          <span >Free</span>
        </div>
          <div className=' flex justify-around w-full  font-bold pt-3 ' style={{borderTop:'1px solid gray'}}>
          <span>total amount</span>
          <span >£{cart?.totalDiscountedPrice}</span>
        </div>
        </div>
        <Button 
        onClick={handlecheckout}
                variant="container" className="w-full font-bold " sx={{bgcolor:"black",color:"#fff",borderRadius:'20px'}}
              >
            Proceed to   Chectout
              </Button>
       </Grid>
       
    </div>:<Loader/>
  )
}
