import React, { useCallback, useState, useRef } from 'react';
import {
  SearchBox,
  SearchWrapper,
  TitleContainer,
  SearchButton,
  SearchIcon,
} from './styles';
import HomeButtonUrl from '../../assets/home.svg';
import { Link } from 'react-router-dom';

const Title = ({ title, home, search, setSearchUser }: any): JSX.Element => {
  const onClickHome = useCallback(() => { }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');

  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchToggle = useCallback((e: any) => {
    e.stopPropagation();
    setNickname('');
    inputRef.current?.focus();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const onSubmitNickname = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!nickname?.trim()) return;
      setSearchUser(nickname);
      setNickname('');
      console.log(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      if (!isSafari) {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    },
    [nickname]
  );

  return (
    <TitleContainer>

      {home && (
        <div className="Home">
          <Link to="/home">
            <div>
              <img
                src={HomeButtonUrl}
                onClick={onClickHome}
                alt="Home"
              />
            </div>
          </Link>
        </div>
      )}

      <div className="Title">
        <span>{title}</span>
      </div>

      {search && (
        <div className="Search">
          <form onSubmit={onSubmitNickname}>
            <SearchWrapper isOpen={isOpen}>
              <SearchBox
                type="search"
                value={nickname}
                onChange={onChangeNickname}
                autoFocus={true}
                ref={inputRef}
              />

              <SearchButton
                className="SearchButton"
                isOpen={isOpen}
                onClickCapture={handleSearchToggle}
              >
                <SearchIcon isOpen={isOpen} />
              </SearchButton>

            </SearchWrapper>
          </form>
        </div>
      )}

    </TitleContainer>
  );
};

export default Title;
