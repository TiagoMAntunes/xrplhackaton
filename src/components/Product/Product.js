import React from "react";
import { Badge, Button, Card, CardBody, CardImg, CardTitle, Collapse, FormInput, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader } from "shards-react";

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, amount: null, openPaymentDropdown: false, paymentText: "" };
        this.payment = this.payment.bind(this);
        this.inputMoney = this.inputMoney.bind(this);
        this.pay = this.pay.bind(this);
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

    pay() {
        console.log(`Current amount is ${this.state.amount}`);
        this.setState({ openPaymentDropdown: true, paymentText: "Processing..." });

        (new Promise(r => setTimeout(r, 2000))).then(() => {
            this.setState({ paymentText: "Payment successful ✔️" });
        });
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
                        <Button block onClick={this.pay} disabled={this.state.openPaymentDropdown}>Pay</Button>
                    </ModalFooter>

                    <Collapse open={this.state.openPaymentDropdown}>
                        <ModalBody>
                            {this.state.paymentText}
                        </ModalBody>
                    </Collapse>
                </Modal>
            </div>
        );
    }
}