import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { DataContext } from '../context/DataContext';
import { ADD_ITEM_TO_ORDER_MUTATION } from '../graphql/mutations';

const Test = styled.header`
  position: sticky;
  top: 0;
  background: #b81414;
  opacity: 1;
  padding: 10px;
  z-index: 100;
`;

const Precio = styled.div`
  color: white;
  font-size: 1.1rem;
  padding: 7px;
`;

function SubmitOrder(props: any) {
  const [addItemToOrder, { loading, error }] = useMutation(
    ADD_ITEM_TO_ORDER_MUTATION
  );
  const [orders, setOrders] = useState([]);

  const handleClick = () => {
    if (localStorage.getItem('orders')) {
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

  if (loading) return <p>Submitting...</p>;
  if (error) return <p> Submission error: ${error.message}</p>;

  return (
    <>
      {localStorage.getItem('orders') ? (
        <button onClick={handleClick}>Submit Order</button>
      ) : (
        <p>No Orders</p>
      )}
    </>
  );
}

export function Header() {
  const [subtotal, setSubTotal] = useState<string>('0');
  const context = useContext(DataContext);

  useEffect(() => {
    if (context[0]) {
      let sum = 0;
      context[0].forEach((order) => (sum += order.price));
      setSubTotal(sum.toString());
    } else {
      setSubTotal('0');
    }
  }, [context]);

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
          src="https://cdn-icons-png.flaticon.com/512/116/116356.png?w=1060&t=st=1681228169~exp=1681228769~hmac=d36035d78beb7c17da25b1e70ba034f3cd4a97c75e60694f18e78cbaf137e2c2"
          alt="logo"
          style={{ width: '50px', height: '50px' }}
        />
        <Precio>Subtotal: $ {subtotal} </Precio>
        <button onClick={handleClick}>Cancel Purchase</button>
        <SubmitOrder updateContext={context[1]} />
      </header>
    </Test>
  );
}