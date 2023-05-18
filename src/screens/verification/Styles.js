import styled from "styled-components/native";

export const SplitOTPBoxesContainer = styled.Pressable`
 width: 90%;
 flex-direction: row;
 justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
border-radius: 10px;
border-width: 1px;
padding:23px;
padding-left: 0px;
padding-right: 0px;
background-color: #0F0F0F;
min-width: 50px;
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: #e5e5e5;
`;

export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
`;

export const TextInputHidden = styled.TextInput`
width: 300px;
 padding: 15px;
 position:absolute;
 opacity: 0;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
 border-color: #4D8837;
 background-color: #81cd2c;
`;