import Styled from 'styled-components'

import background from '../assets/new_year.jpg'

export const Container = Styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100vh;
    justify-content: flex-end;
    align-items: flex-end;
    
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: 100vw;

`

export const LinkContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(120, 28, 29) none repeat scroll 0% 0%;
    height: 36px;
    width: 200px;
    text-decoration: none;
    color: #fff;
    letter-spacing: .5px;
    cursor: pointer;
    border-radius: 2px;
`

export const Box = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(207, 8, 41, 1);
    width: 25vw;
    margin-right: 10vw;
    margin-bottom: calc(10% - 36px);
    height: 60vh;
    min-width: 280px;
    min-height: 400px;
    border-radius: 10px;

    animation-name: fadein;
    animation-duration: 700ms;
    animation-fill-mode: forwards;

    @keyframes fadein{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }    
`
export const Logo = Styled.img`
    height:30%;
`
