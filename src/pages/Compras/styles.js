import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;

`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:${ props => props.width ||'20rem'};
    height:${ props => props.height ||'25rem'} ;
    background:#f3f3f3;
    border-radius: 1rem;
    margin: 8px 12px;
    box-shadow:${ props => props.boxShadow ||'0px 0px 10px rgb(0 0 0 / 40%)'};
    border-radius: 1rem;

    &:hover{
        box-shadow:0px 0px 10px rgb(0 0 0 / 50%);
        transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        transform: scale(1.015);
    }

    @media (max-width: 600px) {
        width:85vw;
        height:400px;

        p{
            height:4rem;
        }

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
    border:none;
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
        width: 75vw;
        margin:1rem 0;
        padding: 2rem;
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
    width: 150px;
    height: 175px;
    justify-content: center;
    border: none;
    margin:15px 5px 5px 5px;
  

    img{
        width: 100%;
        height: 100%;
        border: none;
        box-sizing: border-box;
        
    }

  
    @media (max-width: 600px) {
        width: 70px;
        height: 140px;
        display: flex;
        
        img{
            
            align-items: center;
            justify-content: center;
            margin-top:0;
            width: 30vw;
            height: 30vw;
            box-sizing: border-box;
        }
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
export const Codigo = styled.p `
    font-size:10px;
    font-weight: bold;
    margin:5px 0 0 0;
    padding:0;
    display:flex;
    align-items:center;
    justify-content:center;
    flex:1;
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

    @media (max-width: 600px) {
        margin:1rem 0;
    }
`

export const Flex = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 2px;
    height:auto;
`

export const Sidebar = styled.div`
    background-color: #e3e3e3;
    width: 250px;
    height: 100%;
    top:65px;
    right:0;
    z-index: 9999;
    position: fixed;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 40%);
    transition: 500ms cubic-bezier(0.4, 0, 0.5, 1) 5ms;
`