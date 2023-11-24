import {styled} from "styled-components";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Loader = styled.span`
  display: flex;
  justify-content: center;
  margin: 5px;
  font-style: italic;
  font-weight: 600;
  color: ${props=>props.theme.txt};
`;

const WrappingOverView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  margin-bottom: 25px;
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

export interface IPriceProps {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
}

function Price ( {USD}: {USD: IPriceProps|undefined} ) {
    console.log(USD);

    const priceToStr = (price:number|string|undefined):string => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : "";
    }
    const perToStr = (percent:number|string|undefined):string => {
        if(undefined !== percent && (0 === percent || "0" ===percent))
            return "±0%"

        return percent ? `${0 < parseFloat(percent.toString()) ? "+":""}${percent}%` : "";
    }

    const loading:boolean = !!!USD;

    return (
        <>{
            loading ? (<Loader>Price Loading...</Loader>) : (
            <>
                <WrappingOverView>
                    <Overview>
                        <OverviewItem>
                            <span>1H</span>
                            <span>{`${perToStr(USD?.percent_change_1h)}`}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <span>24H</span>
                            <span>{`${perToStr(USD?.percent_change_24h)}`}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <span>7D</span>
                            <span>{`${perToStr(USD?.percent_change_7d)}`}</span>
                        </OverviewItem>
                    </Overview>
                </WrappingOverView>
                <Overview>
                    <OverviewItem>
                        <span>Trading 24H</span>
                        <span>{`$${priceToStr(USD?.volume_24h.toFixed(2))}`}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Total Price</span>
                        <span>{`$${priceToStr(USD?.market_cap)}`}</span>
                    </OverviewItem>
                </Overview>
            </>
        )}</>
    )




}

export default Price;