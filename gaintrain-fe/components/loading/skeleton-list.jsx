import React from 'react';
import { Skeleton } from '@rneui/themed';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash';

const CardContainer = styled.View`
    display: flex;
    align-items: center;
`;

const SkeletonList = ({ numCards }) => {
    return (
        <FlatList
            data={_.times(numCards, (i) => i)}
            renderItem={() => {
                return (
                    <CardContainer>
                        <Skeleton style={{ marginVertical: 5, borderRadius: 5, height: 100, width: '90%' }} animation="wave" />
                    </CardContainer>
                )
            }}
            keyExtractor={(i) => i}
        />
    )
}

export default SkeletonList;