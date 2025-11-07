import React from 'react';
export default function ProductGrid({products, onAdd}){
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16}}>
      {products.map(p => (
        <div key={p.id} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <b>₹{p.price.toFixed(2)}</b>
          <div style={{marginTop:8}}>
            <button onClick={()=>onAdd(p.id)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
