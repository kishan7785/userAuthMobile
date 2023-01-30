import React, {useState} from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    // console.log('handlePasswordVisibility in password toggler:');
    if (rightIcon == 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon == 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

export const useToggleConfirmPasswordVisibility = () => {
  const [confirmpasswordVisibility, setCondirmPasswordVisibility] =
    useState(true);
  const [confirmrightIcon, setconfirmRightIcon] = useState('eye');

  const handleConfirmPasswordVisibility = () => {
    // console.log('handlePasswordVisibility in password toggler:');
    if (confirmrightIcon == 'eye') {
      setconfirmRightIcon('eye-off');
      setCondirmPasswordVisibility(!confirmpasswordVisibility);
    } else if (confirmrightIcon == 'eye-off') {
      setconfirmRightIcon('eye');
      setCondirmPasswordVisibility(!confirmpasswordVisibility);
    }
  };

  return {
    confirmpasswordVisibility,
    confirmrightIcon,
    handleConfirmPasswordVisibility,
  };
};
