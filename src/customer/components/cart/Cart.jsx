import React, { useEffect, useState } from 'react'
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
import AuthModel from '../../auth/AuthModel';
import { ToastContainer, toast } from 'react-toastify';
export default function Cart() {
  const {cart,loading} = useSelector(store => store.cart);
  const {user} = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localcart,setLocalcart] =useState()
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  useEffect(() => {
    dispatch(getCart());
   const localcarts = JSON.parse(localStorage.getItem('cart'));
   if (localcarts) {
    // Calculate total price and discounted price
    const totalPriceSum = localcarts.reduce((acc, item) => acc + item.price, 0);
    const totalDiscountedPriceSum = localcarts.reduce((acc, item) => acc + item.discountedPrice, 0);

    // Update state with the total values
    setTotalPrice(totalPriceSum);
    setTotalDiscountedPrice(totalDiscountedPriceSum);
}
   setLocalcart(localcarts)
   console.log(localcart);
  }, []);
  const [handleOpenAuth,setHandleOpeneAuth]= useState(false);
  
  const handleClose = ()=>{
    setHandleOpeneAuth(false)
    navigate("/")
  }
  const handlecheckout =()=>{
    if(user.role == "GUEST"){
      setHandleOpeneAuth(true)
      navigate('/Guest')

    }else{
         navigate("/checkout?step=2")
    }
 
  }
  return (
    !loading? 
    
      user?
      
       <div>
         <ToastContainer/>
         <AuthModel  handleClose={handleClose} open={handleOpenAuth}/>
    <div className='mt-20  sm:mt-0'>
      </div>
    <div className='lg:grid grid-cols-3 relative space-x-3  '>
      
       <div className='col-span-2'>
       {cart?.cartItems.length > 0 || localcart ? <Cartitem/> :<h1 className='m-4'>Your cart is Empty</h1>}
       </div>
       <Grid className='sticky top-5 space-y-3 mt-1 '>
        <div className='border '>
          
          <h1 className=' flex  align-center font-bold p-4'>How you'll pay</h1>
          <div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:'10px',paddingLeft:'1rem'}}>
      <img src={visa} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={master} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={american} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={diners} alt="card" style={{width:'3rem',height:'2rem'}} />
          </div>
         <div className=' flex  w-full justify-between p-4 pt-3'>
          <span>Item(s) total</span>
          <span>£{cart?.totalPrice}</span>
        </div> 
          <div className=' flex  w-full justify-between p-4  pt-3'>
          <span>Total discount</span>
          <span >£{cart?.discounte}</span>
        </div> 
          <div className=' flex  w-full justify-between p-4   pt-3'>
          <span>Shipping Charges</span>
          <span className='text-green-500'>FREE</span>
        </div>
          <div className=' flex justify-between p-4 w-full  font-bold pt-3 ' style={{borderTop:'1px solid gray'}}>
          <span>Total ({cart.cartItems.length} item)</span>
          <span >£{cart?.totalDiscountedPrice}</span>
        </div>
        </div>
        <Button 
        onClick={handlecheckout}
                variant="container" className="w-full font-bold " sx={{bgcolor:"black",color:"#fff",borderRadius:'20px'}}
              >
            Proceed to   Checkout
              </Button>
       </Grid>
       
    </div></div>
      :
      <div> 
        <div className='mt-20  sm:mt-0'>
      </div>
    <div className='lg:grid grid-cols-3 relative space-x-3  '>
      
       <div className='col-span-2'>
       {cart?.cartItems.length > 0 || localcart ? <Cartitem/> :<h1 className='m-4'>Your cart is Empty</h1>}
       </div>
       <Grid className='sticky top-5 space-y-3 mt-7 '>
        <div className='border flex justify-center align-center'>
          
          <h1 className=' flex p-4 align-center font-bold'>How you'll pay</h1>
          <div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:'10px',paddingLeft:'1rem'}}>
      <img src={visa} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={master} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={american} alt="card" style={{width:'3rem',height:'2rem'}} />
      <img src={diners} alt="card" style={{width:'3rem',height:'2rem'}} />
          </div>
         <div className=' flex justify-between p-4 w-full   pt-3'>
          <span>Item(s) total</span>
          <span>£{totalPrice}</span>
        </div> 
          <div className=' flex justify-between p-4w-full   pt-3 '>
          <span>Total discount</span>
          <span >£{totalPrice-totalDiscountedPrice}</span>
        </div> 
          <div className=' flex justify-between p-4 w-full   pt-3 justify-center align-center '>
          <span>Shipping Charges</span>
          <span className='text-green-500'>FREE</span>
        </div>
          <div className=' flex justify-between p-4w-full  font-bold pt-3  ' style={{borderTop:'1px solid gray'}}>
          <span>Total ({cart.cartItems.length} item)</span>
          <span >£{cart?.totalDiscountedPrice}</span>
        </div>
        </div>
        <Button 
        onClick={handlecheckout}
                variant="container" className="w-full font-bold " sx={{bgcolor:"black",color:"#fff",borderRadius:'20px'}}
              >
            Proceed to   Checkout
              </Button>
       </Grid>
       
    </div>
    </div>
      
     :<Loader/>
  )
}