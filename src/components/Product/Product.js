import React from "react";
import { Button, Card, CardBody, CardImg, CardTitle } from "shards-react";

export default class Product extends React.Component {
    format(price) {
        return "$" + price.toFixed(2);
    }

    render() {
        return (
            <Card style={{ maxWidth: "300px", margin: "20px" }}>
                <CardImg src={this.props.image} />
                <CardBody style={{ height: "200px", textAlign: "left" }}>
                    <CardTitle>{this.props.name}</CardTitle>
                    <p>{this.props.description}</p>
                </CardBody>
                <CardBody>
                    <p>Already raised:  {this.format(this.props.price)}</p>
                    <Button theme="primary">Donate</Button>
                </CardBody>
            </Card>
        );
    }
}