import Styled from 'styled-components'

export const Titulo = Styled.label`
    padding: 10px;
    background-color: #ffd257;
    width: 100%;
    margin-bottom: 10px;

    text{
        margin-right: 10px;
        margin-right: 10vw;
    }

    label{
        margin-left: 10px;
    }
`

export const Panel = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #ccc;
    height: 88vh;
    width: 80vw;
`
