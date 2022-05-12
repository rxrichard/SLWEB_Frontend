import styled from "styled-components";

export const Flex = styled.div`

    display:flex;
    flex-direction: ${(props) => props.direction || "row"};
    align-items:  ${(props) => props.align || "center"};
    margin: 0px 2px;s
    height:${(props) => props.heightSize || "98%"};
    width:${(props) => props.widthSize || "98%"};
    
    @media (max-width: 767px) {
        flex-direction: ${(props) => props.direction || "column"};;
        align-items: center;
        height: ${(props) => props.heightSize || "98%"};
        width: ${(props) => props.widthSize || "98%"};
        
    }
    `
;

export const Image = styled.div`
    width:30vw;
    height:17vw;
    justify-content: center;
    margin:5px;

    @media (max-width: 600px) {
        width: 70px;
        height: 70px;
    }

`;
export const ButtonModal = styled.button`
  background-color: ${(props) => props.bgColor || "#fff"};
  width: ${(props) => props.width || "0%"};
  height: 3rem;
  display: flex;
  border-radius: ${(props) => props.borderRadius || "0"};
  color: #fff;

  font-size: 1.2rem;
  padding: 0px 4px;
  margin: ${(props) => props.margin || "0"};
  justify-content: center;
  align-items: center;
  &:hover {
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: ${(props) => props.bgColorH || "#92211f"};
  }
  @media (max-width: 600px) {
    width: 100%;
    margin: 1rem 0;
    padding: 2rem;
  }
`;

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
        height:80vh;


    }
`;

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



export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bolder;
    color: #41211f;
    margin:0;
    text-align: center;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    padding: 0px 8px;
    box-sizing: border-box;
    flex-wrap: wrap;
`;

export const Text = styled.p`
    color: ${props => props.color || '#41211f'};
    font-size: ${props => props.fontSize || '1rem'};
    /* font-weight: bold; */
    margin: 0;
    align-items: top;
    text-align: justify;
    overflow: wrap;

    @media (max-width: 600px) {
        font-size: 1.2rem;
        margin:1rem 2rem;
    }

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

export const Input = styled.input`
  font-size: 16px;
  border: solid 1px #999 !important;
  border-radius: 4px !important;
  color: #262626;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  margin: 15px 0px !important;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
  width: 100%;
    height: 3rem;
  &:active,
  &:focus {
    text-align: left;
  }

`;