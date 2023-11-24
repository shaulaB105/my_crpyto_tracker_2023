import Chart from "react-apexcharts";
import {useQuery} from "react-query";

import {getNicoEx} from "../../../api/coinpaprika";

import styled from "styled-components";
import {useContext} from "react";
import {ThemeContext} from "../../../context/ThemeProvider";
const Loader = styled.span`
  display: flex;
  justify-content: center;
  margin: 5px;
  font-style: italic;
  font-weight: 600;
  color: ${props=>props.theme.txt};
`;

interface IParams{
    coinId : string
}
interface NicoEx {
    "time_open" : number,
    "time_close" : number,
    "open" : string,
    "high" : string,
    "low" : string,
    "close" : string,
    "volume" : string,
    "market_cap" : number,
}
interface NicoCandleSeries{
    x : Date,
    y : [number, number, number, number]
}

function CoinChart ({ coinId }: IParams) {

    const {theme} = useContext(ThemeContext);

    const {isLoading, data} = useQuery<NicoEx[]>("NicoChart", ()=>getNicoEx(coinId));
    const chartSeries:NicoCandleSeries[] = [];
    data?.map(d=>{
        chartSeries.push({
            x: new Date(d.time_open),
            y:[
                parseFloat(d.open),
                parseFloat(d.high),
                parseFloat(d.low),
                parseFloat(d.close)
            ]
        })

    });
    const dateFormatter = (date:string): string => {
        const fmt = date?.split(" ") || undefined;
        const time = fmt ? fmt[4]?.split(":") || undefined : undefined;
        return fmt && time ? `${fmt[1]} ${fmt[2]} ${time[1]}:${time[2]}` : "";
    }

    return (
        <>{
            isLoading ? (<Loader>Chart Loading...</Loader>)
                : (
                    <Chart
                        options={{
                            chart: {
                                background : "transparent",
                                height : "300",
                                toolbar : { show : false }
                            },
                            //grid: { show: false },
                            stroke : {
                                curve : "smooth",
                                width : 3
                            },
                            theme : { mode : ("light" === theme ? "light" : "dark") },
                            tooltip : {
                              y: {
                                  formatter: (val) =>`$ ${val.toFixed(2)}`
                              }
                            },
                            xaxis: {
                                axisBorder: { show: false },
                                axisTicks: { show: false },
                                labels: {
                                    show: false,
                                    formatter : (val) => dateFormatter(val)
                                },
                            },
                            yaxis : {
                                labels: {show: false},
                                tooltip: { enabled: true }
                            }
                        }}
                        series={[
                            {
                                name: "Price",
                                data: chartSeries
                            }
                        ]}
                        type="candlestick"
                    />
                )

        }</>

    )
}

export default CoinChart;