import React, {useState} from 'react';
export default function CheckoutModal({cart, onClose, onConfirm}){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'#fff', padding:20, borderRadius:8, width:400}}>
        <h3>Checkout</h3>
        <div>
          <label>Name</label><br/>
          <input value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div style={{marginTop:12}}>
          <button onClick={()=>onConfirm({name,email})}>Confirm</button>
          <button onClick={onClose} style={{marginLeft:8}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
