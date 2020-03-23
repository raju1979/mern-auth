import React from 'react';

import {Wrapper} from './BurgerBuilder.style';
import {Grid, Row, Col} from 'react-flexbox-grid';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {addIngredient, startBurger, updateBurgerQuantity} from '../../redux';
import uuid from 'react-uuid';
import IngredientSelector from "../IngredientSelectors/IngredientSelectors";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';


// import IngredientSelector from '../../components/IngredientSelectors/IngredientSelectors';

// import BurgerComponent from '../../components/BurgerComponent/BurgerComponent';

class BurgerBuilder extends React.Component {

    constructor(props) {
        super(props);
        this.purchaseBurger = this.purchaseBurger.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    state = {
        open: false
    }

    componentDidMount() {
        console.log(this.props.burger.ingredients)

        this.props.addIngredient({
            ...this.props.burger.ingredients[this.props.burger.ingredients.length - 2],
            mappedId: uuid()
        });
        this.props.updateBurgerQuantity();

        this.props.addIngredient({
            ...this.props.burger.ingredients[this.props.burger.ingredients.length - 1],
            mappedId: uuid()
        });
        this.props.updateBurgerQuantity();

    }

    startBurgerBuilding() {
        console.log('ddddddddddddd');
        this.props.startBurger();
    }

    purchaseBurger() {
        console.log(this.props.burger.burger.length)
        if(this.props.burger.burger.length > 2) {
            this.setState({
                open: true
            })
        }
    }

    handleClose (event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false
        })
    };

    render() {
        const BurgerWrapper = styled.section`
            padding: 1em;
            background: #fff;
            margin: 0 auto;
            text-align: center
        `;

        return(
            <Wrapper>
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={12}>
                            <BurgerWrapper>
                                <h1>Burger Builder</h1>
                                <div>
                                    {
                                        !this.props.burger.burgerstart ?
                                            <Button variant="contained" color="primary" onClick={() => this.startBurgerBuilding()}>
                                                Start Burger Builder
                                            </Button> : null
                                    }
                                </div>
                                {
                                    this.props.burger.burgerstart ?
                                        <>
                                            <BurgerComponent burger={this.props.burger.burger}/>
                                            <IngredientSelector />
                                            <h3>Total Value: {this.props.burger.burgervalue}</h3>
                                            <Button variant="outlined" color="secondary" onClick={this.purchaseBurger}>
                                                Purchase
                                            </Button>
                                            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                                                <Alert severity="success">
                                                    Burger Purchased!
                                                </Alert>
                                            </Snackbar>
                                        </>
                                        : null
                                }
                            </BurgerWrapper>
                        </Col>
                    </Row>
                </Grid>
            </Wrapper>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        burger: state.burger
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (payload) => dispatch(addIngredient(payload)),
        updateBurgerQuantity: () => dispatch(updateBurgerQuantity()),
        startBurger: () => dispatch(startBurger())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
