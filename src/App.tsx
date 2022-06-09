import { Header } from './components/Header';
//import { ProductList } from './components/ProductList';
import {ProductList} from './components/ProductList';
// import "./styles.css";
import styled from "styled-components";



const ContentBox = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.8);
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
`;


const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  aling-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  font-size: 15px;
  border: 1px solid blue;
  text-align: center;
  margin: 10px;
  `;
  

function App() {
  return (
    <>
      <Header />
      <div>
        <Container>
        <ProductList />
        </Container>
      </div>
    </>
  );
}

export default App;
