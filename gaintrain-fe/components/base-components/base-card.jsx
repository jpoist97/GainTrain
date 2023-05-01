import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import EllipsesMenu from './ellipses-menu';
import { primaryOrange } from '../../theme/orange-theme';

const Container = styled(TouchableOpacity)`
   padding: 15px;
   background-color: rgba(255, 255, 255, 0.75);
   border-width: 0.25px;
   border-color: rgba(0, 0, 0, 0.1);
   box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
   border-radius: 5px;
   width: 100%;
`;

const TopView = styled.View`
   display: flex;
   justify-content: space-between;
   flex-direction: row;
`;

const Title = styled.Text`
   font-family: 'Inter-Bold';
   font-weight: 600;
   font-size: 16px;
   line-height: 22px;
   color: ${(props) => (props.primary ? primaryOrange : '#000000')};
`;

const Subtitle = styled.Text`
   font-family: 'Inter-Bold';
   font-style: normal;
   font-weight: 600;
   font-size: 12px;
   line-height: 22px;
   color: #b8b8b8;
`;

const BodySlot = styled.View`
   width: 100%;
   margin-top: 10px;
`;

const OptionsIcon = styled(TouchableOpacity)`
   height: 20px;
   width: 20px;
`;

const BaseCard = ({
   title,
   subtitle,
   options,
   BodyComponent,
   onPress,
   primary,
}) => {
   return (
      <Container onPress={onPress}>
         <TopView>
            <View>
               <Title primary={primary}>{title}</Title>
               <Subtitle>{subtitle}</Subtitle>
            </View>
            <OptionsIcon>
               <EllipsesMenu options={options} />
            </OptionsIcon>
         </TopView>

         <BodySlot>
            <>{BodyComponent}</>
         </BodySlot>
      </Container>
   );
};

export default BaseCard;
