import styled from "styled-components";
import {useQuery} from "react-query";
import {getCoins} from "../api/coinpaprika";
import Coin from "./Coin";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 480px;
`;
const Header = styled.header`
  height: 10vh;
  margin: 2vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color : ${props=>props.theme.accent};
  font-weight: 800;
  font-size: 48px;
`;

const Loader = styled.span`
  display: flex;
  justify-content: center;
  margin: 5px;
  font-style: italic;
  font-weight: 600;
`;

const CoinList = styled.ul`
`;
const ListItem = styled.li`
  background-color: ${props=>props.theme.assist};
  color : ${props=>props.theme.txt};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-weight: 600;
  transition: color .2s ease-in;
  &:hover{
    background-color: ${props=>props.theme.hvrbg};
  }
  a{
    transition: color .2s ease-in;
    display: flex;
    align-items: center;
    padding : 16px;
    &:hover{
      color: ${props=>props.theme.accent};
    }
  }
`;
const ItemIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

interface ICoin {
    id : string,
    name : string,
    symbol : string,
    rank : number,
    is_new : boolean,
    is_active : boolean,
    type : string
}
function Coins () {
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", getCoins);
    return (
        <Wrapper>
            <Header>
                <Title>My Crpyto Tracker</Title>
            </Header>
            {
                isLoading ? (
                <Loader>
                    Now Loading...
                </Loader>
                ) : (
                <CoinList>{
                    data?.slice(0, 100).map(coin=>
                        <ListItem key={coin.id}>
                            <Link to={`/${coin.id}`}>
                                <ItemIcon src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                {coin.name} &rarr;
                            </Link>
                        </ListItem>
                    )}
                </CoinList>
                )
            }
        </Wrapper>
    );
}

export default Coins;