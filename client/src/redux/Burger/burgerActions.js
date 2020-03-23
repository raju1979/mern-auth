
import { ADD_INGREDEIENTS, START_BURGER, ADD_INGREDEIENTS_TO_MIDDLE, UPDATE_BURGER_VALUE, REMOVE_INGREDIENT_FROM_BURGER } from './burgerTypes';

export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDEIENTS,
        payload: ingredient
    }
};

export const addIngredientToMiddle = (ingredient) => {
    return {
        type: ADD_INGREDEIENTS_TO_MIDDLE,
        payload: ingredient
    }
};

export const removeIngredientFromBurger = (id) => {
    return {
        type: REMOVE_INGREDIENT_FROM_BURGER,
        payload: id
    }
};

export const startBurger = () => {
    return {
        type: START_BURGER
    }
};

export const updateBurgerQuantity = () => {
    return {
        type: UPDATE_BURGER_VALUE
    }
};


