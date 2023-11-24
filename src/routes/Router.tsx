import {BrowserRouter, Route, Switch} from "react-router-dom";

import Coins from "../components/Coin/Coins";
import Coin from "../components/Coin/Coin";

function Router (){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/my_crpyto_tracker_2023/:coinId">
                    <Coin />
                </Route>
                <Route path="/my_crpyto_tracker_2023/">
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;