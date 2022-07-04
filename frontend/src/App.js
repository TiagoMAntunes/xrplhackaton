import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Welcome from './components/Welcome';
import ProductList from './components/Product/ProductList';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    // API request to server to get products
    this.state = {
      products: [],
    };

    console.log('Fetching...')

    // GET request to localhost:3000/products
    fetch('http://localhost:3000/products',
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        return res.json()
      }).then(res => {
        console.log(res)
        this.setState({
          products: res,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="App">
        <Welcome />
        <ProductList products={this.state.products} />
      </div>
    );
  }
}

export default App;
