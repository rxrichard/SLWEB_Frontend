import Styled from 'styled-components'

export const Campo = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px 0px 10px;
`

export const Rotulo = Styled.label`
    font-weight: bold;
    margin-right: 1vw;
`

export const Valor = Styled.input`
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    border-radius: 10px;
    background-color: #e1ebfc;
    height: 100%;
    margin-right: 100px;

    &:focus{
        animation-name:  grow;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }
    &:not(focus){
        animation-name:  shrink;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }

    @keyframes grow{
        0%{
            padding: 0 1vw 0 1vw;
        }100%{
            padding: 1vh 2vw 1vh 2vw;
        }
    }

    @keyframes shrink{
        0%{
            padding: 0 2vw 0 2vw;
        }100%{
            padding: 0 1vw 0 1vw;
        }
    }
`
export const Titulo = Styled.label`
    padding: 10px;
    background-color: none;
    width: 100vw;
    margin-bottom: 10px;

    text{
        margin-right: 10px;
        margin-right: 10vw;
    }

    label{
        margin-left: 10px;
    }
`

export const Data = Styled.input`
`

export const Combobox = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    background-color: none;
    padding: 10px;
`
