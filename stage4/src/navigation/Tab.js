import {TabNavigator} from 'react-navigation';
import Signup from "../auth/signup";
import Login from "../auth/login";

const Tab = TabNavigator({
    LoginRoute : {
        screen : Login
    },
    SignupRoute : {
        screen : Signup
    },

})
export default Tab