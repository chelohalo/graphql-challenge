import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import styled from 'styled-components';
import { ADD_ITEM_TO_ORDER_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const Test = styled.header`
  & {
    position: sticky;
    top: 0;
    background: #b81414;
    opacity: 1;
    padding: 10px;
    z-index: 100;
  }
`;

const Precio = styled.div`
  & {
    color: white;
    font-size: 1.1rem;
    padding: 7px 7px 7px 7px;
  }
`;

function SubmitOrder(props:any) {
  const [addItemToOrder, { data, loading, error }] = useMutation(
    ADD_ITEM_TO_ORDER_MUTATION
  );
  const [orders, setOrders] = useState([]);

  const handleClick = () => {
    if (JSON.parse(localStorage.getItem('orders'))) {
      setOrders(JSON.parse(localStorage.getItem('orders')));
      orders.forEach((order: any) => {
        addItemToOrder({ variables: { ID: order.variantID, quantity: 1 } });
      });
    } else {
      setOrders([]);
    }
    localStorage.removeItem('orders');
    props.updateContext([]);
    
  };

  // localStorage.removeItem('orders');

  if (loading) return <p>Submitting...</p>;
  if (error) return <p> Submission error: ${error.message}</p>;
  console.log('mutation data:', data);

  console.log('orders:', orders);
  

  return (
    <>
      {localStorage.getItem('orders') ? (
        <button onClick={handleClick}>submit order</button>
      ) : (
        <p>no orders</p>
      )}
    </>
  );
}




export function Header() {
  const [subtotal, setSubTotal] = useState<string>('');
  const context = useContext(DataContext);

  useEffect(() => {
    if (context[0]) {
      let sum = 0;
      context[0].forEach((order) => (sum += order.price)); // [{}, {}]
      setSubTotal(sum.toString());
    } else {
      setSubTotal('0');
    }
  }, [context[0]]);

  useEffect(() => {
    let orders = JSON.parse(localStorage.getItem('orders'));
    let sum = 0;
    if (!orders) {
      setSubTotal('0');
    } else {
      orders.forEach((order: any) => (sum += order.price));
      setSubTotal(sum.toString());
    }
  }, []);

  const handleClick = () => {
    setSubTotal('0');
    localStorage.removeItem('orders');
  };

  return (
    <Test>
      <header>
        <img
          src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
          alt="logo"
        />
        <Precio>subtotal: $ {subtotal} </Precio>
        <button onClick={handleClick}>Cancel purchase</button>
        <SubmitOrder updateContext={context[1]} />
      </header>
    </Test>
  );
}
