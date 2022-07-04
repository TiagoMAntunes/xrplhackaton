import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Welcome from './components/Welcome';
import ProductList from './components/Product/ProductList';
import products from './data/products.js';

function App() {
  return (
    <div className="App">
      <Welcome />
      <ProductList products={products} />
    </div>
  );
}

export default App;
