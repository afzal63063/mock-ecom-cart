import React from 'react';
export default function CartView({cart, onRemove, onQtyChange, onCheckout}){
  return (
    <div style={{marginTop:24}}>
      <h2>Cart</h2>
      {cart.items.length === 0 && <div>Cart empty</div>}
      {cart.items.map(it => (
        <div key={it.id} style={{display:'flex', gap:12, alignItems:'center', borderBottom:'1px solid #eee', padding:8}}>
          <div style={{flex:1}}>{it.product.name}</div>
          <div>₹{it.product.price.toFixed(2)}</div>
          <div>
            <input type="number" min="1" value={it.qty} onChange={e=>onQtyChange(it.id, Number(e.target.value))} style={{width:60}} />
          </div>
          <div><button onClick={()=>onRemove(it.id)}>Remove</button></div>
        </div>
      ))}
      <div style={{marginTop:12}}>
        <b>Total: ₹{cart.total?.toFixed(2) || 0}</b>
      </div>
      <div style={{marginTop:8}}>
        <button onClick={onCheckout} disabled={cart.items.length===0}>Checkout</button>
      </div>
    </div>
  );
}
