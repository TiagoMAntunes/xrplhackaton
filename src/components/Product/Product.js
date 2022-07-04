import React from "react";
import { Badge, Button, Card, CardBody, CardImg, CardTitle, FormInput, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader } from "shards-react";

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, amount: null };
        this.payment = this.payment.bind(this);
        this.inputMoney = this.inputMoney.bind(this);
    }

    format(price) {
        return "XRP " + price.toFixed(2);
    }

    payment() {
        this.setState({ open: !this.state.open });
    }

    inputMoney(m) {
        this.setState({ amount: m.target.value });
    }

    render() {
        return (
            <div>
                <Card style={{ maxWidth: "300px", margin: "20px" }}>
                    <CardImg src={this.props.image} />
                    <CardBody style={{ height: "200px", textAlign: "left" }}>
                        <CardTitle>{this.props.name}</CardTitle>
                        <p>{this.props.description}</p>
                    </CardBody>
                    <CardBody>
                        <p>Already raised:  {this.format(this.props.price)}</p>
                        <Button theme="primary" onClick={this.payment}>Donate</Button>
                    </CardBody>
                </Card>

                <Modal open={this.state.open} toggle={this.payment} fade={true}>
                    <ModalHeader>Payment</ModalHeader>
                    <ModalBody>
                        <p>Thank you for supporting  <Badge theme='info'>{this.props.name}</Badge>!</p>
                        <InputGroup>
                            <InputGroupAddon type='prepend'>
                                <InputGroupText>I wish to donate</InputGroupText>
                            </InputGroupAddon>
                            <FormInput type="number" placeholder="Amount" onChange={this.inputMoney} />
                            <InputGroupAddon type='append'>
                                <InputGroupText>XRP</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button>Pay</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}