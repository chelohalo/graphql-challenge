import { useQuery } from '@apollo/client';
import PRODUCTS from '../graphql/queries';
import styled, { keyframes } from "styled-components";
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';


const Button = styled.button`
& {
     background-color: hsla(40, 72%, 50%, 1);
     padding: 3px; 
     width: 80px;
     border: 1px solid grey;
     border-radius: 15px;  
     color: white;
}
   &:hover {
    background-color: green;
    transition: 0.7s; 
    }
 `;


const GridItem = styled.div`
& {
  box-shadow: 8px 8px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  text-align: center;
  border-radius: 5%;
  background: #e4dede;
}
&:hover {
  transform: scale(1.04);
  transition: 0.6s; 
  box-shadow: 8px 8px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  text-align: center;
  border-radius: 5%;
  position: inherit;
}
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #a795c4;
`;




export function ProductList() {
  const { loading, error, data } = useQuery(PRODUCTS);
  const context = useContext(DataContext);
  console.log("context",context);

  if (loading) return <Spinner></Spinner>;
  if (error) return <p>Error :(</p>;

  const handleClick = (name: string, price: number, ctx: any ) => {
    const ordersInLocalStorage = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      name,
      price,
    }
    const newOrders = [...ordersInLocalStorage, newOrder];
    localStorage.setItem("orders", JSON.stringify(newOrders))
    ctx[1](newOrders);
  }

  return   data.products.items.map((
      {
        description,
        featuredAsset,
        variantList,
        name
      }: { id: any; description: string; featuredAsset: any; variantList: any; name: string },
      id: any
    ) => (
      
      <div key={id}>
        <GridItem>
        {description && variantList.items[0]?.price && featuredAsset?.source && name && (
          <>
          <h5>{name}</h5>
          <img width={100} height={100} alt='No image found' src={featuredAsset.source} />
          <p>{description}</p> 
          <h5> ${variantList.items[0].price} </h5>
          <Button onClick={() => handleClick(name, variantList.items[0]?.price, context )}> Buy </Button>
          </>
        ) }
        </GridItem> 
      </div>
    )
  );
}

// ()=>localStorage.setItem("price" , `${variantList.items[0].price}`)