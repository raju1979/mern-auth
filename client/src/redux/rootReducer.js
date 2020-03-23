import {combineReducers} from 'redux';

import userReducer from './User/userReducer';
import globalReducer from "./Global/globalReducer";
import burgerReducer from './Burger/burgerReducer';

const appReducer  = combineReducers({
    user: userReducer,
    global: globalReducer,
    burger: burgerReducer
})


// const rootReducer = combineReducers({
//     user: userReducer,
//     global: globalReducer,
//     burger: burgerReducer
// });

// Below code will reset the app

const rootReducer = (state, action) => {
    console.log(action);
    if(action.type === 'LOGOUT_USER') {
        state = undefined
    }

    console.log('STATE', state)
    return appReducer(state, action)
}

export default rootReducer;
