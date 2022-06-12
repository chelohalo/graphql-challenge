import { useQuery } from '@apollo/client';
import PRODUCTS from '../graphql/queries';
import styled from "styled-components";
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
}
&:hover {
  transform: scale(1.05);
  transition: 0.6s; 
  box-shadow: 8px 8px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  text-align: center;
  border-radius: 5%;
}
`;

export function ProductList() {
  const { loading, error, data } = useQuery(PRODUCTS);
  const context = useContext(DataContext);
  console.log("context",context);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleClick = (price: any, ctx: any ) => {
    localStorage.setItem("price", price)
    ctx[1](price)
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
          <button onClick={() => handleClick(variantList.items[0]?.price, context )}> Buy </button>
          </>
        ) }
        </GridItem> 
      </div>
    )
  );
}

// ()=>localStorage.setItem("price" , `${variantList.items[0].price}`)