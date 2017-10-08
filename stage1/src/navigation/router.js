import { StackNavigator } from "react-navigation";
import Home from "../home";
import Add from "../component/add";
import SearchName from "../component/searchName";
import SearchDate from "../component/searchDate";
import ViewAll from "../component/viewAll";

const Router = StackNavigator({

    Homeroute: {
        screen: Home
    },
    
    Addroute: {
        screen: Add
    },

    SearchNameroute: {
        screen: SearchName
    },

    SearchDateroute: {
        screen: SearchDate
    },

    ViewAllroute: {
        screen: ViewAll
    },
})
export default Router