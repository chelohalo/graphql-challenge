import { Header } from './components/Header';
//import { ProductList } from './components/ProductList';
import {ProductList} from './components/ProductList';
// import "./styles.css";
import styled from "styled-components";
import { DataProvider } from './context/DataContext';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px;
  grid-auto-rows: minmax(100px, auto);
  margin-top: 20px;
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const AppContainer = styled.div`
  padding: 15px;
  margin: 10px;
`;





function App() {
  return (
    <>
    <DataProvider>
    <AppContainer>
      <Header />
      
        <GridContainer>
        <ProductList />
        </GridContainer>
      
      </AppContainer>
      </DataProvider>
    </>
  );
}

export default App;
