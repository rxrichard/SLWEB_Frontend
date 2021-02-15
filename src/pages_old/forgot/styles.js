import Styled from 'styled-components'

export const EmailInput = Styled.input`
border: 2px solid #333;
width: 80%;
margin-bottom: 5%;
padding: 5px;
border-radius: 4px;
font-weight: bold;
`

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

export const NewPasswordButton = Styled.button`
border: none;
    width: 80%;
    padding: 5px;
    background-color: rgba(120,28,29,1);
    border-radius: 4px;
    font-weight: bold;
    border: 2px solid #333;
    margin-bottom: 20px;
    color: #FFF;

    &:hover{
        border: 2px solid #FFF;
        background-color: #FFF;
        color: ${props => props.color};
        cursor: pointer;
    }
`
