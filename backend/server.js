const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
app.use(cors())

const xrpl = require('xrpl')

let products = [
    {
        id: 1,
        image: "https://thediplomat.com/wp-content/uploads/2022/03/sizes/td-story-s-1/thediplomat_2022-03-07-120913.jpg",
        name: "Stand for Ukraine",
        description: "Ukraine has recently been invaded and people have been displaced. Make sure they have something to eat and ways to reach safety.",
        currentDonation: Math.random() * 10000,
    },
    {
        id: 2,
        image: "https://borgenproject.org/wp-content/uploads/Drug-Resistant-Malaria-300x200.jpg",
        name: "Fight against Malaria in Africa",
        description: "Malaria is a disease that causes the loss of blood and other vital organs. It is a deadly disease that can kill millions of people worldwide.",
        currentDonation: Math.random() * 10000,
    },
    {
        id: 3,
        image: "https://divineinitiative.co.uk/wp-content/uploads/2022/03/Water-Supply-in-Uganda-300x200.jpg",
        name: "Help the poor in Uganda",
        description: "Uganda is a country that has been hit by a lot of disasters. The people are suffering from the disease and they need help.",
        currentDonation: Math.random() * 10000,
    },
    {
        id: 4,
        image: "https://www.entis-org.eu/wp-content/uploads/2021/04/hakan-nural-wnSEwHMhxho-unsplash-300x200.jpg",
        name: "Vaccines for those who need it the most",
        description: "COVID-19 has greatly affected the world. Many countries are still lacking vaccines to fight against it. Help them!",
        currentDonation: Math.random() * 10000,
    }, {
        id: 5,
        image: "https://greenstories.co.in/wp-content/uploads/2021/07/Global-Warming-300x200.jpg",
        name: "Fight against global warming",
        description: "Global warming is a global threat to the planet. It is a threat to the environment and to the human being. It is a threat to the natural world.",
        currentDonation: Math.random() * 10000,
    },
]

let user = {}
let xrp_client;

async function generate() {
    console.log("Generating...")

    xrp_client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await xrp_client.connect();

    let promises = []
    for (let i = 0; i < products.length; i++) {
        products[i].wallet = xrpl.Wallet.generate()
    }

    await xrp_client.fundWallet().then(res => user.wallet = res.wallet);

    xrp_client.request({
        "command": "account_info",
        "account": user.wallet.address,
        "ledger_index": "validated",
    }).then(response => console.log(response))

    console.log("Generated!")
}
generate()

// TODO payment

app.get('/products', (_, res) => {
    res.json(products,)
})

app.get('/user_wallet', (_, res) => {
    res.json(user.wallet)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})