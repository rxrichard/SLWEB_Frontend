import Styled from 'styled-components'

export const Header = Styled.div`
    background-color: #323835;
    width: 100vw;
    height: 6vh;
`

export const Box = Styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    height: 20vh;
    width: 10vw;
    min-width: 100px;
    margin-top: 20px;
    margin-left 20px;
    margin-right: 20px;
    background-color: rgba(120,28,29,1);
    border-radius: 10px;
    border: 2px solid #FF2525;
    animation-name:fadeout;
    animation-fill-mode: forwards;
    animation-duration: 300ms;
    cursor: pointer;
    box-shadow: 5px 5px 9px 5px rgba(0, 0, 0, 0.2);

    &:hover{
        animation-name: fadein;
        animation-fill-mode: forwards;
        animation-duration: 300ms;

        label{
            animation-name: slideup;
            animation-duration: 300ms;
            animation-fill-mode: forwards;
        }
    }

    label{
        animation-name: slidedown;
        text-align: center;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
        position: relative;
        top: -25%;
        left: 0%;
        cursor: pointer;
        color: #FFF;
    }

    @keyframes slideup {
        0%{
            position: relative;
            top: -25%;
            left: 0%;
            color: #FFF;
        }100%{
            position: relative;
            top: 0%;
            left: 0%;
            color: rgba(120,28,29,1);
        }
    }

    @keyframes slidedown {
        0%{
            position: relative;
            top: -0%;
            left: 0%;
        }100%{
            position: relative;
            top: -25%;
            left: 0%;
        }
    }

    @keyframes fadein{
        0%{
            color: #000;
            background-color: rgba(120,28,29,1);
            border: 2px solid #FF2525;
            box-shadow: 5px 5px 9px 5px rgba(0, 0, 0, 0.2);
        }100%{
            color: rgba(120,28,29,1);
            background-color: #FFF;
            border: 2px dashed rgba(120,28,29,1);
            box-shadow: 10px 10px 9px 5px rgba(0, 0, 0, 0.5);
        }
    }

    @keyframes fadeout{
        0%{
            color: rgba(120,28,29,1);
            background-color: rgba(120,28,29,1);
            border: 2px dashed #FF2525;

        }100%{
            color: #000;
            background-color: rgba(120,28,29,1);
            border: 2px solid #FF2525;
        }
    }
`

export const Icon = Styled.img`
    height: 50%;
`
