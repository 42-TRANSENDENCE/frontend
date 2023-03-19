import React, { useCallback, useEffect, useState } from 'react';
import {
  SearchBox,
  SearchWrapper,
  TitleContainer,
  SearchButton,
  SearchIcon,
} from './styles';
import HomeButtonUrl from '../../assets/home.svg';
import SearchButtonUrl from '../../assets/search.svg';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

const Title = ({ title, home, search }: any): JSX.Element => {
  const onClickHome = useCallback(() => {}, []);
  const onClickSearch = useCallback(() => {}, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');

  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    []
  );

  const handleSearchToggle = useCallback((e: any) => {
    e.stopPropagation();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const onSubmitNickname = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!nickname?.trim()) return;
      console.log(nickname);
      /** nickname을 이용한 Logic 위치 */
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
            <img
              src={HomeButtonUrl}
              className="HomeButton"
              onClick={onClickHome}
              alt="Home"
            />
          </Link>
        </div>
      )}
      <div className="Title">
        <span>{title}</span>
      </div>
      {search && (
        <>
          {/* <div className="Search">
            <img
              src={SearchButtonUrl}
              className="SearchButton"
              onClick={onClickSearch}
            />
          </div> */}
          <div className="Search">
            <form onSubmit={onSubmitNickname}>
              <SearchWrapper isOpen={isOpen}>
                <SearchBox
                  type="search"
                  value={nickname}
                  onChange={onChangeNickname}
                />
                <SearchButton
                  className="SearchButton"
                  isOpen={isOpen}
                  onClickCapture={handleSearchToggle}
                >
                  <SearchIcon isOpen={isOpen}></SearchIcon>
                </SearchButton>
              </SearchWrapper>
            </form>
          </div>
        </>
      )}
    </TitleContainer>
  );
};

export default Title;
