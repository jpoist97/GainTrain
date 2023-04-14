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
   width: ${(props) => props.widthPercentage};
`;

const Row = styled.View`
   display: flex;
   flex-direction: row;
`;

const ColumnHeader = styled.Text`
   font-family: 'Inter-Bold';
   font-weight: 600;
   font-size: 14px;
   line-height: 22px;
`;

const MoreLabel = styled.Text`
   font-family: 'Inter-Bold';
   font-style: normal;
   font-weight: 600;
   font-size: 12px;
   line-height: 22px;
   color: #979797;
`;

const CyclesTable = ({ days, workouts, more }) => {
   return (
      <TableContainer>
         <TableColumn widthPercentage="15%">
            <ColumnHeader>Days</ColumnHeader>
            <Row>
               <BaseTag text={days} />
            </Row>
         </TableColumn>
         <TableColumn widthPercentage="80%">
            <ColumnHeader>Workouts</ColumnHeader>
            <Row>
               {workouts.map((group) => (
                  <BaseTag style={{ marginRight: 10 }} text={group} key={group} />
               ))}
                <MoreLabel>{more}</MoreLabel>
            </Row>
         </TableColumn>
      </TableContainer>
   );
};

const CyclesCard = ({ name, description, days, workouts, more }) => {
    let n = workouts.length;
    if(n > 3){
        return (
            <BaseCard
                title={name}
                subtitle={description}
                options={[]}
                BodyComponent={
                    <CyclesTable days={days} workouts={workouts.slice(0,3)} more={ '+' + (n-3) + ' more'}/>
                }
            />
        );
    }else{
        return(
            <BaseCard
                title={name}
                subtitle={description}
                options={[]}
                BodyComponent={
                    <CyclesTable days={days} workouts={workouts}/>
                }
            /> 
        );
    }
};

export default CyclesCard;
