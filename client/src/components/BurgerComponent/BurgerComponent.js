import React from 'react';

import styled from 'styled-components';

// import burgerTop from '../../assets/images/burgerTop.png';
// import burgerBottom from '../../assets/images/burgerBottom.png';



const BurgerComponent = (props) => {

    console.log(JSON.stringify(props));

    const BurgerDiv = styled.div`
        width: 500px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
    `
    return(
        <BurgerDiv>
            {props.burger.map(burgerItem => {
                return <img key={burgerItem.mappedId} src={burgerItem.imgUrl} />;
            })}

        </BurgerDiv>
    )
}

export default BurgerComponent;
