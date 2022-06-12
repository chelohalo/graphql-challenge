import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export function Header() {
  const [price, setPrice] = useState<string>('');
  const context = useContext(DataContext);

  /*   useEffect(() => {
    const orderLocalStorage = localStorage.getItem('order');
    const orderLocalStorageParsed = JSON.parse(orderLocalStorage || '[]');
    setOrder([...orderLocalStorageParsed]);
  }, []); */

  useEffect(() => {
    if (context[0]) {
      // const subTotal = context[0] + parseInt(price)
      setPrice(context[0].toString());
    } else {
      setPrice('');
    }
  }, [context[0]]);

  

  useEffect(() => {
    setPrice(localStorage.getItem('price'));
  }, []);

  return (
    <header style={{ background: 'red' }}>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <div>price: {price} </div>
    </header>
  );
}
