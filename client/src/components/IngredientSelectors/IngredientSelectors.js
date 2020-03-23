import React from 'react';

import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {connect} from 'react-redux';
import {addIngredientToMiddle, startBurger, updateBurgerQuantity, removeIngredientFromBurger} from '../../redux';

import uuid from 'react-uuid';


const Wrapper = styled.section`
  padding: 1em;
  margin: 0 auto;
  width: 400px;
`;

const IngredientRow = styled.div`
    display: flex;
    margin: 5px 0;
    width: 400px;
    margin: 0 auto;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
`;

const IngredientType = styled.span`
    width: 100px;
    text-align: right;
`;

const IngredientQty = styled.p`
    width: 100px;
    box-sizing: border-box;
    padding: 2px;
    border: 1px solid black;
    border-radius: 3px;
    display: inline-block;
`;

const IngredientSelector = (props) => {

    console.log(props);

    const Ingredient = ({ingredient, change, burger}) => {

        let ingredientQty = burger.reduce((total, currentValue) => {
            if(currentValue.type == ingredient.type) {
                total =  total + 1;
            }
            return total;
        }, 0);

        const addNewIngredientToBurger = (id, qty) =>{
            console.log(id, qty);
            let burger = [props.burger];

            // burger = {...burger}
            console.log('gggggggg', burger)

            if(qty === 1) {
                let ingredient = {...props.burger.ingredients.filter(item => item.id === id)[0]};
                ingredient = {...ingredient, mappedId: uuid()};
                props.addIngredientToMiddle(ingredient)
                props.updateBurgerQuantity()
            }

            if(qty === -1) {
                props.removeIngredientFromBurger(id);
                props.updateBurgerQuantity()
            }


        };



        // let sum = objArray.reduce(function (total, currentValue) {
        //     return total + currentValue.x;
        // }, initialValue);

        return (
            <IngredientRow>
                <IngredientType>
                    {ingredient.type}
                </IngredientType>
                <span>
                    <IconButton color="primary" aria-label="add to shopping cart"  onClick={() => addNewIngredientToBurger(ingredient.id, -1)} disabled={ingredient.addable == false}>
                        <RemoveShoppingCartIcon />
                    </IconButton>
                </span>
                <IngredientQty>{ingredientQty}</IngredientQty>
                <span>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addNewIngredientToBurger(ingredient.id, 1)} disabled={ingredient.addable == false}>
                        <AddShoppingCartIcon />
                    </IconButton>
                </span>
            </IngredientRow>
        )
    };


    return (
        <Wrapper>
            <h2>Select the Burger Ingredients</h2>
            {
                props.burger.ingredients.map(ingredient => {
                    return <Ingredient key={ingredient.id} ingredient={ingredient} change={props.change} burger={props.burger.burger}/>
                })
            }
        </Wrapper>
    )
};

const mapStateToProps = (state) => {
    return {
        burger: state.burger
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientToMiddle: (payload) => dispatch(addIngredientToMiddle(payload)),
        removeIngredientFromBurger: (id) => dispatch(removeIngredientFromBurger(id)),
        updateBurgerQuantity: () => dispatch(updateBurgerQuantity()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientSelector);
