import Styled from 'styled-components'
import { PRIMARY_ORANGE } from './colors'

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
    background-color: ${PRIMARY_ORANGE};
`