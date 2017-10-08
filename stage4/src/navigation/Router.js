import { StackNavigator } from 'react-navigation';
import Dashboard from "../components/dashboard";
import AddPatients from "../components/addpatients";
import Search from "../components/search";
import searchDate from "../components/searchDate"
import Viewpatiens from "../components/view_all_patients"
import Tab from "./Tab"

const Router = StackNavigator({
    Homeroute: {
        screen: Tab
    },

    DashboardRoute: {
        screen: Dashboard
    },

    AddPatientsRoute: {
        screen: AddPatients
    },

    SearchRoute: {
        screen: Search
    },

    SearchDateRoute: {
        screen: searchDate
    },
    
    VeiwAllRoute: {
        screen: Viewpatiens
    },
})
export default Router