import React from "react";
import { Alert, Badge, Button, Card, CardBody, CardImg, CardTitle, Collapse, FormInput, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "shards-react";

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, amount: null, openPaymentDropdown: false, paymentText: "", progress: 0 };
        this.payment = this.payment.bind(this);
        this.inputMoney = this.inputMoney.bind(this);
        this.pay = this.pay.bind(this);
        this.defaultModal = this.defaultModal.bind(this);
    }

    format(price) {
        return "XRP " + price.toFixed(2);
    }

    payment() {
        this.defaultModal();
        this.setState({ open: !this.state.open });
    }

    inputMoney(m) {
        this.setState({ amount: m.target.value });
    }

    defaultModal() {
        this.setState({
            amount: null,
            openPaymentDropdown: false,
            paymentText: "",
            progress: 0
        });
    }

    async pay() {
        console.log(`Current amount is ${this.state.amount}`);
        this.setState({ openPaymentDropdown: true, paymentText: "Processing..." });

        (async () => {
            const rawRes = await fetch('http://localhost:3000/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    destination: this.props.wallet,
                    amount: this.state.amount,
                    id: this.props.id
                })
            });
            const content = await rawRes.json();

            if (content.result === "tesSUCCESS") {
                this.setState({ paymentText: "Donation successful ✔️ ", progress: 100 });
            } else {
                this.setState({ paymentText: `Donation failed with error: ${content.result}`, progress: 50 });
            }
        })();
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
                        <Alert theme='light'>Destination address: {this.props.wallet}</Alert>
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
                        <Button block onClick={this.pay} disabled={!this.state.amount || this.state.openPaymentDropdown}>Pay</Button>
                    </ModalFooter>

                    <Collapse open={this.state.openPaymentDropdown}>
                        <ModalBody>
                            <Progress value={this.state.progress} />
                            {this.state.paymentText}
                        </ModalBody>
                    </Collapse>
                </Modal>
            </div>
        );
    }
}