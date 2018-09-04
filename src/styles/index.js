import styled, { injectGlobal, css } from 'styled-components';
import "typeface-roboto";

const tileWidth = '200px';
const orange = '#f0ad4e;';

injectGlobal`
  html, body {
    font-family: 'Roboto', sans-serif;
  }

  body {
    font-size: 85%;
  }
`;

export const Main = styled.div`
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const Loader = styled.img`
  display: block;
  margin: 80px auto;
  width: 80px;
  height: 80px;
`;

export const Sub = styled.div`
  width: calc(100% - 210px);
  float: left;
  margin-left: 210px;

  ${props => props.filters && css`
    width: 200px;
    position: fixed;
    top: 10px;
    left: 10px;
    margin-left: 0;
    text-align: left;

    & h4 {
      margin: 5px 0;
    }

    & label {
      display: inline-block;
      margin-right: 10px;
    }
  `}
`;

export const MovieTile = styled.div`
  border: 1px solid #dedede;
  float: left;
  width: ${tileWidth};
  margin: 3px;
  height: 490px;

  & img {
    width: ${tileWidth};
  }

  & h4 {
    text-align: center;
    margin: 10px;
    height: 38px;
    color: #393939;
  }

  &:hover {
    border-color: #ababab;
  }
`;

export const Genres = styled.ul`
  padding: 0;
  margin: 0;

  & li {
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 20px;
    list-style-type: none;
    display: inline-block;
    margin: 4px;
    background: #ffedcc;
  }
`;

export const Rating = styled.div`
  margin-top: 15px;

  & label {
    font-weight: bold;
  }

  & select {
    margin-top: 6px;
  }
`;

export const NoMovies = styled.div`
  margin: 12px;
  background: ${orange};
  padding: 10px;
`;