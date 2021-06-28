import Styled from 'styled-components'
import { RED_PRIMARY, GREY_SECONDARY } from './colors'

export const Header = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    padding-right: 1%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: ${sessionStorage.getItem('role') === 'Franquia' ? RED_PRIMARY:GREY_SECONDARY };
`