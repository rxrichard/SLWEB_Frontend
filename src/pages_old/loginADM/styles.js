import Styled from 'styled-components'

export const CodeInput = Styled.input`
    border: 2px solid #333;
    width: 80%;
    margin-bottom: 5%;
    padding: 5px;
    border-radius: 4px;
    font-weight: bold;
`

export const PasswordInput = Styled.input`
    border: 2px solid #333;
    width: 80%;
    margin-bottom: 5%;
    padding: 5px
    border-radius: 4px;
    font-weight: bold;
`

export const LoginButton = Styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: none;
    width: 80%;
    padding: 5px;
    background-color: rgba(120,28,29,1);
    border-radius: 4px;
    font-weight: bold;
    border: 2px solid #333;
    margin-bottom: 10px;
    color: #FFF;

    &:hover{
        border: 2px solid #FFF;
        background-color:${props => props.background};
        color: ${props => props.color};
        cursor: pointer;
    }
`

export const Icon = Styled.img`
    height: 100%;
`
