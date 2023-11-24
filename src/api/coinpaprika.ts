const BASEURL = "https://api.coinpaprika.com/v1";

export function getCoins(){
    return fetch(`${BASEURL}/coins`).then(res=>res.json());
}

export function getCoinInfo(coinId:string) {
    return fetch(`${BASEURL}/coins/${coinId}`).then(res=>{
        console.log(`getCoinInfo`);
        return res.json()
    });
}
export function getCoinPrice(coinId:string) {
    return fetch(`${BASEURL}/tickers/${coinId}`).then(res=>{
        console.log(`getCoinPrice`);
        return res.json();
    });
}

export function getNicoEx(coinId:string){
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(res=>res.json());
}