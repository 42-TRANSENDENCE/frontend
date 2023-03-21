import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { Container, Label, Input, Inputs, Form, Conflict } from './styles';
import Button from '../../components/Button';
import Title from '../../components/Title';
import loginButton from '../../assets/bigButton/2FALoginButton.svg';

const TwoFactor = () => {
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [twoFactorError, setTwoFactorError] = useState(false);

  const mutation = useMutation(async (password: string) => {
    const response = await fetch(awsUrl + '/2fa/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token: password }),
    });
    if (response.status === 200) {
      navigate('/home');
    } else if (response.status === 401) {
      setTwoFactorError(true);
      setPassword('');
    } else {
      throw new Error('Unexpected response status code');
    }
  });

  const handleInputChange = (index: number, value: string) => {
    if (value.length === 1 && !isNaN(Number(value))) {
      setPassword(password + value);
      const nextInput = document.getElementById(
        `p${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      } else {
        const currentInput = document.getElementById(
          `p${index}`
        ) as HTMLInputElement;
        if (currentInput) {
          currentInput.blur();
        }
      }
    }
  };
  

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      mutation.mutate(password);
    },
    [mutation, password]
  );

  return (
    <Container>
      <div className='Title'>
        <Title title='PONG 2FA' />
      </div>
      <div className='Body'>
        <Form onSubmit={onSubmit}>
          <Label id='password'>
            <span>Google Authenticator</span>
            <Inputs>
              <Input
                id='p1'
                maxLength={1}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
              <Input
                id='p2'
                maxLength={1}
                onChange={(e) => handleInputChange(2, e.target.value)}
              />
              <Input
                id='p3'
                maxLength={1}
                onChange={(e) => handleInputChange(3, e.target.value)}
              />
              <Input
                id='p4'
                maxLength={1}
                onChange={(e) => handleInputChange(4, e.target.value)}
              />
              <Input
                id='p5'
                maxLength={1}
                onChange={(e) => handleInputChange(5, e.target.value)}
              />
              <Input
                id='p6'
                maxLength={1}
                onChange={(e) => handleInputChange(6, e.target.value)}
              />
            </Inputs>
          </Label>
          {twoFactorError && (
            <Conflict>2FA authentication failed. Please try again.</Conflict>
        )}

          <Button img_url={loginButton} type='submit' />
        </Form>
      </div>
    </Container>
  );
};

export default TwoFactor;



// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import { Container, Label, Input, Inputs, Form, Conflict } from './styles';
// import Button from '../../components/Button';
// import Title from '../../components/Title';
// import loginButton from '../../assets/bigButton/2FALoginButton.svg';
// import useInput from '../../hooks/useInput';

// const TwoFactor = () => {
//   const [password, setPassword] = useState('');
//   const ref1 = useRef<HTMLInputElement>(null);
//   const ref2 = useRef<HTMLInputElement>(null);
//   const ref3 = useRef<HTMLInputElement>(null);
//   const ref4 = useRef<HTMLInputElement>(null);
//   const ref5 = useRef<HTMLInputElement>(null);
//   const ref6 = useRef<HTMLInputElement>(null);

//   const handleOnChange = useCallback((index: number, value: string) => {
//     if (value.length === 1) {
//       setPassword((prevPassword) => {
//         const newPassword = prevPassword.slice(0, index) + value + prevPassword.slice(index + 1);
//         return newPassword;
//       });
//       switch (index) {
//         case 0:
//           ref2.current?.focus();
//           break;
//         case 1:
//           ref3.current?.focus();
//           break;
//         case 2:
//           ref4.current?.focus();
//           break;
//         case 3:
//           ref5.current?.focus();
//           break;
//         case 4:
//           ref6.current?.focus();
//           break;
//         case 5:
//           ref6.current?.blur();
//           break;
//         default:
//           break;
//       }
//     }
//     else {
//       setPassword((prevPassword) => {
//         const newPassword = prevPassword.slice(0, index) + prevPassword.slice(index + 1);
//         return newPassword;
//       });
//     }
//   }, []);

//   const inputProps = useInput('', (value: string) => /^[0-9]{0,1}$/.test(value));

//   useEffect(() => {
//     ref1.current?.focus();
//   }, []);

//     const onSubmit = useCallback(
//       (e: any) => {
//         e.preventDefault();
//         console.log(password);
//       },
//       [password]
//   );
//   return (
//     <Form onSubmit={onSubmit}>
//       <Inputs>
//         <Input type='text' maxLength={1} ref={ref1} {...inputProps} onChange={(event) => handleOnChange(0, event.target.value)} />
//         <Input type='text' maxLength={1} ref={ref2} {...inputProps} onChange={(event) => handleOnChange(1, event.target.value)} />
//         <Input type='text' maxLength={1} ref={ref3} {...inputProps} onChange={(event) => handleOnChange(2, event.target.value)} />
//         <Input type='text' maxLength={1} ref={ref4} {...inputProps} onChange={(event) => handleOnChange(3, event.target.value)} />
//         <Input type='text' maxLength={1} ref={ref5} {...inputProps} onChange={(event) => handleOnChange(4, event.target.value)} />
//         <Input type='text' maxLength={1} ref={ref6} {...inputProps} onChange={(event) => handleOnChange(5, event.target.value)} />
//       </Inputs>
//       <Button img_url={loginButton} type='submit' />
//     </Form>
//   );
// };

// export default TwoFactor;
