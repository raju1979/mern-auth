import {
    ADD_INGREDEIENTS,
    START_BURGER,
    ADD_INGREDEIENTS_TO_MIDDLE,
    UPDATE_BURGER_VALUE,
    REMOVE_INGREDIENT_FROM_BURGER
} from "./burgerTypes";

import uuid from 'react-uuid';

const initialState = {
    ingredients: [
        {
            type: 'cheese',
            img: 'cheese',
            imgUrl: '../../assets/images/cheese.png',
            value: 5,
            id: uuid()
        },
        {
            type: 'chicken',
            img: 'chicken',
            imgUrl: '../../assets/images/chicken.png',
            value: 3,
            id: uuid()
        },
        {
            type: 'top',
            img: 'burgerTop',
            imgUrl: '../../assets/images/burgerTop.png',
            value: 1,
            id: uuid(),
            addable: false
        },
        {
            type: 'bottom',
            img: 'burgerBottom',
            imgUrl: '../../assets/images/burgerBottom.png',
            value: 1,
            id: uuid(),
            addable: false
        }
    ],
    burgerdone: false,
    burgerstart: false,
    burger: [],
    burgervalue: 0
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDEIENTS:
            return {
                ...state,
                burger: [...state.burger, action.payload]
            }
        case ADD_INGREDEIENTS_TO_MIDDLE:
            const burgerArr = [...state.burger];
            burgerArr.splice(burgerArr.length - 1, 0, action.payload);
            return {
                ...state,
                burger: burgerArr
            };
        case REMOVE_INGREDIENT_FROM_BURGER:
            let found = false;
            let index = -1;
            console.log(action.id)
            const ingredient = {...state.ingredients.filter(item => item.id === action.payload)[0]};
            console.log('ingredient', ingredient)
            const burgerArrForRemoval = state.burger;
            for(let i = 0; i < burgerArrForRemoval.length; i++) {
                if(burgerArrForRemoval[i].type === ingredient.type) {
                    found = true;
                    index = i;
                    break;
                }
            }
            if(found) {
                burgerArrForRemoval.splice(index, 1);
            }
            return {
                ...state,
                burger: burgerArrForRemoval
            };
        case UPDATE_BURGER_VALUE:
            const burgerValue = state.burger.reduce((total, currentValue) => {
                return total + currentValue.value;
            }, 0);
            return {
                ...state,
                burgervalue: burgerValue
            };
        case START_BURGER:
            return {
                ...state,
                burgerstart: true
            }
        default:
            return state;
    }
};

export default burgerReducer;
