import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput';
import { isValidNickname } from '../../hooks/user';
import { useSignup } from '../../hooks/mutation/user';
import { Container, Label, LongInput, Conflict } from './styles';
import { BigButton } from '../../components/Button';
import Title from '../../components/Title';
import signupButton from '../../assets/bigButton/signupButton.svg';
import { CircularProgress } from '@mui/material';

const SignUp = () => {
  const { mutate, isLoading } = useSignup();

  const nickname = useInput('', isValidNickname);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [nicknameConflict, setNicknameConflict] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setNicknameConflict(false);
      mutate(nickname.value);
    },
    [nickname]
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
      <div className='BodyOuter'>
        <div className='Body'>
          <form onSubmit={onSubmit}>
            <div className='Input'>
              <Label id='nickname-label'>
                <p>N I C K N A M E</p>
                <LongInput
                  placeholder='nickname'
                  {...nickname}
                  onChange={onNicknameChange}
                />
              </Label>
              {nicknameConflict && (
                <Conflict>Nickname already exist. Try something else.</Conflict>
              )}
            </div>

            <div className='BigButtons'>
              {isLoading ? <CircularProgress /> :
                <BigButton img_url={signupButton} type='submit' disabled={isSubmitDisabled} />}
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
