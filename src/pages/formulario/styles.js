import styled from "styled-components";

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  max-width: 50vw;
  font-size: 1.5rem;
  background: ${(props) => props.bgColor || "#fff"};  
  padding: 3vw;
  border: ${props => props.border || "none"};

  @media (max-width: 768px) {
    width: 100vw;
    max-width: 100vw;
    margin:0;
    padding:1vw;
    font-size: 1rem;
    
  }
`;


export const BlockTotal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:100vw;
  max-width: 100vw;
  font-size: 1.5rem;
  background: ${(props) => props.bgColor || "#fff"};  
  padding:5vw;
  @media (max-width: 768px) {
      flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 3em;
  color: #fff; ;
  text-align: center;  
`;

export const Text = styled.p`
  color: ${(props) => props.color || "#fff"};
  text-align: justify;
  @media (max-width: 768px) {
    font-size: 1.5em;
    width: 95vw;
  }
`;

export const InputEmail = styled.input`
  text-align: left;
  border-radius: 0.5rem;
  border: 1px solid #000;
  width: 50vw;
`;

export const Body = styled.div`
  display: flex;
  width: 80vw;
  height: 90vh;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  border: 1px solid #000;
  border-radius: 0.5rem;


`;

export const DivEmail = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerFFq = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  background-color: none;
  align-items: center;
  overflow: ${(props) => props.overflow};
  justify-content: center;
  align-content: center;
  height: unset;
  text-align: center;
  background: #f21;
`;

export const Container = styled.div`
  display: flex;
  margin: 0;
  padding: 0;

  height: 100vw;
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100vw;
    width: 100vw;
    margin: 0;
    height: 100vh;
    max-height: 100vh;
   
    font-size: 1rem;
  }
`;
export const Button = styled.button`
  width: 25rem;
  height: 5rem;
  border-radius: 1rem;
  border: ${(props) => props.border};
  background-color: ${(props) => props.bgColor};
  margin-top: 1rem;
  color: ${(props) => props.color};
  font-size: 1.5rem;
  
  &:hover {
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    cursor: pointer;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.hover};
    color: ${(props) => props.colorH || "#fff"};};	
  }

  @media (max-width: 768px) {
    width:95vw;
    height: 12vh; 
  }
`;

export const InputUnderline  = styled.input`
  border-radius: 0.5rem;
  border: none;
  width: 40vw
  height: 5vh;

  
`
