import React from 'react';
import styled from 'styled-components/native';
import { primaryOrange } from '../../theme/orange-theme';

const Container = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${primaryOrange};
    padding: 3px 8px 3px 8px;
    border-radius: 3px;
`;

const StyledText = styled.Text`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;

    color: #FFFFFF;
`;

const BaseTag = ({ text, style }) => {
    return (
        <Container style={style}>
            <StyledText>{text}</StyledText>
        </Container>
    );
}

export default BaseTag;