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
      userWallet: null,
    };

    console.log('Fetching...')

    // GET request to localhost:3000/products
    fetch('http://localhost:3000/products')
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

    fetch('http://localhost:3000/user_wallet')
      .then(res => {
        return res.json()
      }).then(res => {
        console.log(res)
        this.setState({
          userWallet: res.classicAddress,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="App" >
        <Welcome userWallet={this.state.userWallet} />
        <ProductList products={this.state.products} />
      </div>
    );
  }
}

export default App;
