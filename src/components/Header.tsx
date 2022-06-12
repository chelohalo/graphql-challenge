import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export function Header() {
  const [subtotal, setSubTotal] = useState<string>('');
  const context = useContext(DataContext);
   
  useEffect(() => {
    if (context[0]) {
      let sum = 0; 
      context[0].forEach(order => sum += order.price) // [{}, {}]
      setSubTotal(sum.toString());
    } else {
      setSubTotal('0');
    }
  }, [context[0]]); 
   useEffect(() => {
    let orders = JSON.parse(localStorage.getItem('orders'))
    let sum = 0;
    if(!orders) {
      setSubTotal('0');
    } else {
    orders.forEach((order:any) => sum += order.price)
    setSubTotal(sum.toString());
    }
  }, []); 

  return (
    <header style={{ background: 'red' }}>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <div>subtotal: { subtotal } </div>
    </header>
  );
}
