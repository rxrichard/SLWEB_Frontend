import Styled from 'styled-components'

import background from '../assets/login_fig.png'

export const Container = Styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100vh;
    justify-content: flex-end;
    align-items: flex-end;
    
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: 100vh;
`

export const Box = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
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
