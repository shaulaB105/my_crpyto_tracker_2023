const BASEURL = "https://api.coinpaprika.com/v1";

export function getCoins(){
    return fetch(`${BASEURL}/coins`).then(res=>res.json());
}

export function getCoinInfo(coinId:string) {
    return fetch(`${BASEURL}/coins/${coinId}`).then(res=>res.json());
}
export function getCoinPrice(coinId:string) {
    return fetch(`${BASEURL}/tickers/${coinId}`).then(res=>res.json());
}