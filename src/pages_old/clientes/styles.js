import Styled from 'styled-components'

export const Campo = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px 0px 0px 10px;
`

export const Rotulo = Styled.label`
    font-weight: bold;
    margin-right: 1vw;
`

export const Valor = Styled.textarea`
display:flex;
justify-content: center;
align-items: center;
    border: 1px solid #333;
    background-color: #e1ebfc;
    padding: 0 1vw 0 1vw;
    height: 5vh;
`

export const Panel = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: none;
    height: 100%;
    width: 100%;
`
