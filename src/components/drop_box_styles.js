import Styled from 'styled-components'

export const Box = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 300px;
    height: 70px;
    position: absolute;
    right: 9vw;
    top: 5%;
    z-index: 5;

    border: 1px solid #333;
    border-radius: 10px;
    background-color: ${props => props.color}
    animation-name: load;
    animation-duration: 1000ms;
    animation-fill-mode: forwards;

    @keyframes load {
        0%{
            opacity: 0;
        }50%{
            opacity: 0;
            position: abolute;
            right: 9vw
            top: 20%;
        }100&{
            opacity: 1;
            position: absolute;
            right: 9vw
            top: 100%;
        }
    }
`

export const Message = Styled.label`
    font-weight: bold;
    font-size: 18;
`
