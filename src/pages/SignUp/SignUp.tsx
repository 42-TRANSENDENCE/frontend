import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput';
import { isValidNickname } from '../../hooks/user';
import { useSignup } from '../../hooks/mutation/user';
import { Container } from '../../styles/styles';
import { Label, Input, Conflict } from './styles';
import { BigButton } from '../../components/Button';
import Title from '../../components/Title';
import signupButton from '../../assets/bigButton/signupButton.svg';

const SignUp = () => {
  const signup = useSignup();

  const nickname = useInput('', isValidNickname);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [nicknameConflict, setNicknameConflict] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setNicknameConflict(false);
      signup.mutate(nickname.value);
    },
    [nickname, signup]
  );

  const onNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      nickname.onChange(e);

      // enable submit button if nickname is valid and has at least 3 characters
      setIsSubmitDisabled(e.target.value.length < 3);
    },
    [nickname]
  );

  return (
    <Container>
      <div className='Title'>
        <Title title='PONG SIGNUP' />
      </div>
      <div className='Body'>
        <form onSubmit={onSubmit}>
          <Label id='nickname-label'>
            <span>N I C K N A M E</span>
            <Input
              placeholder='nickname'
              {...nickname}
              onChange={onNicknameChange}
            />
          </Label>
          {nicknameConflict && (
            <Conflict>Nickname already exist. Try something else.</Conflict>
          )}
          <BigButton img_url={signupButton} type='submit' disabled={isSubmitDisabled} />
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
