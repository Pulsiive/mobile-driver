import React, { useRef, useState, useEffect } from "react";
import {
    Keyboard
} from 'react-native';

import { OTPInputContainer, TextInputHidden, SplitOTPBoxesContainer, SplitBoxes, SplitBoxText, SplitBoxesFocused } from "./Styles";



const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumLength);
        // clean up function
        if (code.length === maximumLength)
            Keyboard.dismiss();
        return () => {
          setIsPinReady(false);
        };
      }, [code]);
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();

    const boxDigit = (_, index) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;

        const isCurrentValue = index === code.length - 1;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;

        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

        const StyledSplitBoxes = isValueFocused ? SplitBoxesFocused : SplitBoxes;

        return (
          <StyledSplitBoxes key={index}>
            <SplitBoxText>{digit}</SplitBoxText>
          </StyledSplitBoxes>
        );
       };

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

 return (
   <OTPInputContainer>
    <SplitOTPBoxesContainer>{boxArray.map(boxDigit)}</SplitOTPBoxesContainer>
     <TextInputHidden
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        keyboardType="numeric"
     />
   </OTPInputContainer>
 );
};

export default OTPInput;
