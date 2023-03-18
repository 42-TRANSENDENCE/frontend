import React, { useCallback } from 'react';
import {TitleContainer} from './styles'
import HomeButton from '../../assets/Home.svg';
import SearchButton from '../../assets/Search.svg';

const Title = ({title, home, search} : any) : JSX.Element => {
    const onClickHome = useCallback(() => {}, []);
    const onClickSearch = useCallback(() => {}, []);

    return (
        <TitleContainer>
            {home && <img src={HomeButton} className="HomeButton" onClick={onClickHome}/>}
            <div className="Title">{title}</div>
            {search && <img src={SearchButton} className="SearchButton" onClick={onClickSearch}/>}
        </TitleContainer>
    )
}

export default Title;
