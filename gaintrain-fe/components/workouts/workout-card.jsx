import React from 'react';
import styled from 'styled-components/native';
import BaseCard from '../base-components/base-card';
import BaseTag from '../base-components/base-tag';

const TableContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const TableColumn = styled.View`
    display: flex;
    flex-direction: column;
    width: ${props => props.widthPercentage};
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;
`

const ColumnHeader = styled.Text`
    font-family: 'Inter-Bold';
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
`;

const WorkoutTable = ({ sets, reps, muscleGroups }) => {
    return (
        <TableContainer>
            <TableColumn widthPercentage='15%'>
                <ColumnHeader>
                    Sets
                </ColumnHeader>
                <Row>
                    <BaseTag text={sets} />    
                </Row>   
            </TableColumn>
            <TableColumn widthPercentage='18%'>
                <ColumnHeader>
                    Reps
                </ColumnHeader>
                <Row>
                    <BaseTag text={reps} />    
                </Row>   
            </TableColumn>
            <TableColumn widthPercentage='50%'>
                <ColumnHeader>
                    Muscle Groups
                </ColumnHeader>
                <Row>
                    {muscleGroups.map(group => <BaseTag style={{marginRight: 10}} text={group} />)}
                </Row>
            </TableColumn>
        </TableContainer>
    );
};

const WorkoutCard = ({ name, description, sets, reps, muscleGroups }) => {

    return (
        <BaseCard
            title={name}
            subtitle={description}
            options={[]}
            BodyComponent={<WorkoutTable sets={sets} reps={reps} muscleGroups={muscleGroups} />}
        />
    );
};

export default WorkoutCard;