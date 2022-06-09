import { useQuery } from '@apollo/client';
import PRODUCTS from '../graphql/queries';





export function ProductList() {
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('data', data);
  console.log('price', data.products.items[0].variantList.items[0].price);
  /* 
  return (
    <div>
      <h2>Products</h2>
    </div>) */

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
        {description && variantList.items[0]?.price && featuredAsset?.source && name && (
          <>
          <h6>id: {id}</h6>
          <h5>{name}</h5>
          <img width={100} height={100} alt='No image found' src={featuredAsset.source} />
          <p>Description: {description}</p> 
          <h5> ${variantList.items[0].price} </h5>
          </>
        ) }
      </div>
      
    )
  );
}
