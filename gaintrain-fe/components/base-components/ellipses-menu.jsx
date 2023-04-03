import React from 'react';
import { primaryOrange } from '../../theme/orange-theme';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {
    Entypo,
} from '@expo/vector-icons';
import styled from 'styled-components/native';

const StyledText = styled.Text`
   font-family: 'Inter-Medium';
   font-size: 12px;
`;

const EllipsesMenu = (props) => {
    const { style, options } = props;

    return (
        <Menu style={style}>
            <MenuTrigger>
                <Entypo name='dots-three-horizontal' color={primaryOrange} size={16} />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: '#FEFEFE',
                        borderRadius: 5,
                        padding: 5,
                        width: 'auto',
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuOption key={option.text + index} onSelect={option.onPress}>
                        <StyledText>{option.text}</StyledText>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );
};

export default EllipsesMenu;