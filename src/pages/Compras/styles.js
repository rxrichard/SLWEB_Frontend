import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-wrap: wrap;
    box-sizing: border-box;

`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width:${ props => props.width ||'20rem'};
    height:${ props => props.height ||'23rem'} ;
    background:#f3f3f3;
    border-radius: 1rem;
    margin: 8px 0px;
    box-shadow:${ props => props.boxShadow ||'0px 0px 10px rgb(0 0 0 / 40%)'};
    border-radius: 1rem;

    &:hover{
        box-shadow:0px 0px 10px rgb(0 0 0 / 50%);
        transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        transform: scale(1.015);
    }

    @media (max-width: 600px) {
        width:40vw;
        height:420px;


    }
`;

export const Buttons = styled.div`
    display: flex;
    width:100%;
    justify-content: center;
`
export const Button = styled.button`
    background-color: ${props => props.bgColor || '#41211f'};
    width: ${props => props.width || '0%'};
    height: 3rem;
    display: flex;
    border-radius: ${props => props.borderRadius || '0'};
    color:#fff;
    font-size: 1.2rem;
    padding: 0px 4px;
    margin: ${props => props.margin || '0'};
    justify-content: center;
    align-items: center;
    &:hover{
        transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        background-color: ${props => props.bgColorH || '#92211f'};
    }
    @media (max-width: 600px){
        width: 100%;
        margin:1rem 0;
        padding: 2rem;
    }
    `;

export const ChamadoButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${props => props.Online ? '#CCC' : '#92211f'};
    color: ${props => props.Online ? '#333' : '#FFF'};
    cursor: ${props => props.Online ? 'default' : 'pointer'};
    padding: 8px 0px;
    margin: 8px 0px 0px 0px;
    font-size: 1rem;
    font-weight: bold;
    
    
    &:hover{
        transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        background-color: ${props => props.Online ? 'rgba(204, 204, 204, 0.8)' : 'rgba(146, 33, 31, 0.8)'};
    }
    `;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bolder;
    color: #41211f;
    margin:0;
    text-align: center;
  
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    padding: 0px 8px;
    box-sizing: border-box;
    flex-wrap: wrap;
`;

export const Image = styled.div`
    width: 10rem;
    height: 12rem;
    justify-content: center;
    background: url("https://cafepilao.vteximg.com.br/arquivos/ids/158902/1500144-25-02_252vacuo.png?v=637757072160900000" ) no-repeat center/contain;);
    border: none;
    margin:5px;

    @media (max-width: 600px) {
        width: 70px;
        height: 70px;
    }


`

export const Text = styled.p`
    color: ${props => props.color || '#41211f'};
    font-size: ${props => props.fontSize || '1rem'};
    /* font-weight: bold; */
    margin: 0 1rem;
    align-items: center;
    flex:1;
    text-align: center;
    white-space: wrap;
    overflow: wrap;

    @media (max-width: 600px) {
        font-size: 1.2rem;
        margin:1rem 2rem;
    }

`;

export const notificationTMT = styled.div` 
    background-color: ${props => props.color || '#fff'};
`;

export const Price = styled.div`
    display: flex;
    background-color: ${props => props.color || '#fff'};
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: ${props => props.widthSize || '5rem'};
    height: ${props => props.heightSize || '5rem'}
    margin: 1rem;
    color: ${props => props.colorText || '#41211f'};
`

export const Flex = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 2px;
    height:auto;
`