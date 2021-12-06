interface Price {
    name: string;
    price: number;
}

function createPrice(): Price {
    return {
        name: 'BTC',
        price: 53077.29
    }
}

export function getPrices() {
    return fetch('https://api.nomics.com/v1/currencies/ticker?key=9ffa89fcb1139a548df4745aaaa7d3723c08cbdb&ids=BTC,ETH,XRP&interval=1d,30d')
        .then((response) => response.json())
        .then((json) => {
            let priceList: Price[] = [];
            // for (let price in json) {
            //     price
            // }
            for (let i = 0; i < 3; i++) {
                priceList.push(createPrice());
            }
            
            return priceList;
        })
        .catch((error) => {
            console.error(error);
        });
}