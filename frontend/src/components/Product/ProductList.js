import React from "react";
import { Container, Row } from "shards-react";

import Product from "./Product";

export default class ProductList extends React.Component {
    render() {
        if (!this.props.products) {
            return <div>Loading...</div>;
        }
        
        const productList = this.props.products.map(product => (
            <Product
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.currentDonation}
            />
        ));

        // make a responsive grid
        return (
            <Container>
                <Row style={{marginTop: "10px"}}>
                    {productList}
                </Row>
            </Container>


        );
    }
}