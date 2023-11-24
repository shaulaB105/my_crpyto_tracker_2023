import {Link, Route, Switch, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {Helmet} from "react-helmet";

import CoinChart from "./tabs/CoinChart";
import Price, {IPriceProps} from "./tabs/Price";

import {useQuery} from "react-query";
import {getCoinInfo, getCoinPrice} from "../../api/coinpaprika";

import styled from "styled-components";
import HomeIcon from '@mui/icons-material/Home';

const Wrapper = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 480px;
`;
const Header = styled.header`
  height: 10vh;
  max-width: 480px;
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
const Home = styled.div`
  position: fixed;
  top: 20px;
  left:30px;
  color : ${props=>props.theme.accent};
  a{
    font-size : 28px
  }
`;

const Loader = styled.span`
  display: flex;
  justify-content: center;
  margin: 5px;
  font-style: italic;
  font-weight: 600;
  color: ${props=>props.theme.txt};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: ${props=>props.theme.tip};
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 12px;
    font-weight: 900;
    color: ${props=>props.theme.txt};
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  span:last-child {
    font-size: 18px;
    font-weight: 400;
    color: ${props=>props.theme.accent};
  }
`;
const Description = styled.p`
  margin: 30px 0;
  padding: 10px 20px;
  font-weight: 400;
  text-indent: 10px;
  line-height: 20px;
  color: ${props=>props.theme.accent};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.div<{$isActive : boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 800;
  background-color: ${props=>props.theme.tip};
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
  border-radius: 10px;
  color: ${(props) =>
          props.$isActive ? props.theme.accent : props.theme.txt};
  a {
    display: block;
    padding: 7px 0;
  }
  &:hover{
    background-color: ${props=>props.theme.hvrbg};
  }
`;

interface IRouteParams{
    coinId : string;
}
interface IRouteState {
    coinName : string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:IPriceProps|undefined
    }
}

function Coin () {
    const {coinId} = useParams<IRouteParams>();
    const {state} = useLocation<IRouteState>();

    const {isLoading:infoLoading, data:coinInfo} = useQuery<InfoData>(["info", coinId], ()=>getCoinInfo(coinId));
    const {isLoading:priceLoading, data:coinPrice} = useQuery<PriceData>(
        ["price", coinId],
        ()=>getCoinPrice(coinId),
        {
            refetchInterval : 600000,
        });

//    const infoLoading = true;
//    const priceLoading = true;
//    const coinInfo = {name:"infoName", rank:0, symbol:coinId,description:"nothing"};
//    const coinPrice = {quotes:{USD:{price:12903.21398}},total_supply:21123, max_supply:1231};

    const loading = infoLoading || priceLoading;

    const path = {
        CHART : `/my_crpyto_tracker_2023/${coinId}/chart`,
        PRICE : `/my_crpyto_tracker_2023/${coinId}/price`
    }
    const chartMatch = useRouteMatch(path.CHART);
    const priceMatch = useRouteMatch(path.PRICE);

    return (
        <Wrapper>
            <Helmet>
                <title>{state?.coinName ?
                    state.coinName
                    : (loading ? "Loading..." : coinInfo?.name)}
                </title>
            </Helmet>
            <Header>
                <Route>
                    <Home>
                        <Link to="/my_crpyto_tracker_2023/">
                            <HomeIcon />
                        </Link>
                    </Home>
                </Route>
                <Title>{state?.coinName ?
                    state.coinName
                    : (loading ? "Loading..." : coinInfo?.name)}
                </Title>
            </Header>
            {
                loading ? (<Loader>loading...</Loader>) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank</span>
                            <span>{coinInfo?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>{coinInfo?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>{coinPrice?.quotes?.USD?.price.toFixed(2)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{coinInfo?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply</span>
                            <span>{coinPrice?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply</span>
                            <span>{coinPrice?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab $isActive={chartMatch !== null}>
                            <Link to={path.CHART}>Chart</Link>
                        </Tab>
                        <Tab $isActive={priceMatch !== null}>
                            <Link to={path.PRICE}>Price</Link>
                        </Tab>
                    </Tabs>

                    <Switch>
                        <Route path={path.CHART}>
                            <CoinChart coinId={coinId}/>
                        </Route>
                        <Route path={path.PRICE}>
                            <Price USD={ coinPrice?.quotes?.USD}/>
                        </Route>

                    </Switch>
                </>
                )
            }
        </Wrapper>
    );
}

export default Coin;