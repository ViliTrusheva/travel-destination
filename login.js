  
  // conditions for the forminputs
  const emailCondition =
    email.length < 16 || !email.includes("@");
  const passwordCondition = newPassword.length < 8;
  const usernameCondition = newUser.length < 4 || newUser.length > 30;