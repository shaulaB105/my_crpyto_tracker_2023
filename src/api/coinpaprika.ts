const BASEURL = "https://api.coinpaprika.com/v1";

export function getCoins(){
    return fetch(`${BASEURL}/coins`)
        .then(res=>res.json());
}