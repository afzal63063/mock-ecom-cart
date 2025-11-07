import React, { useEffect, useState } from 'react';
import API from './api';
import ProductGrid from './components/ProductGrid';
import CartView from './components/CartView';
import CheckoutModal from './components/CheckoutModal';

export default function App(){
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({items: [], total: 0});
  const [showCheckout, setShowCheckout] = useState(false);
  useEffect(()=>{ load(); }, []);
  async function load(){
    const pr = await API.getProducts();
    setProducts(pr);
    const c = await API.getCart();
    setCart(c);
  }
  async function handleAdd(productId){
    await API.addToCart(productId,1);
    const c = await API.getCart();
    setCart(c);
  }
  async function handleRemove(itemId){
    await API.removeFromCart(itemId);
    const c = await API.getCart();
    setCart(c);
  }
  async function handleQtyChange(id, qty){
    await API.updateCartItem(id, qty);
    const c = await API.getCart();
    setCart(c);
  }
  async function handleCheckout(customer){
    // prepare cartItems
    const cartItems = cart.items.map(i => ({ productId: i.productId, qty: i.qty }));
    const res = await API.checkout(cartItems, customer);
    setShowCheckout(false);
    // show receipt (in CheckoutModal we will display)
    alert('Checkout success! Receipt total: ' + res.receipt.total);
    const c = await API.getCart();
    setCart(c);
  }
  return (
    <div style={{padding:20}}>
      <h1>Vibe Cart</h1>
      <ProductGrid products={products} onAdd={handleAdd} />
      <CartView cart={cart} onRemove={handleRemove} onQtyChange={handleQtyChange} onCheckout={()=>setShowCheckout(true)} />
      {showCheckout && <CheckoutModal cart={cart} onClose={()=>setShowCheckout(false)} onConfirm={handleCheckout} />}
    </div>
  );
}
