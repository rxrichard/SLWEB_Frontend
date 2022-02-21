import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 64px;
    margin-left: 73px; //novo sidebar
    display: flex;
    justify-content: flex-start;
    align-items: center;
    `


export const Card = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow:0px 0px 10px rgb(0 0 0 / 40%);
    margin:.8rem;
    border-radius: 1rem;
    margin-left:0;
    flex-wrap: wrap;
    justify-content: center;

    &:hover{
        box-shadow:0px 0px 10px rgb(0 0 0 / 50%);
        transform: scale(1.02);
    }
  `;

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width:18rem;
    height:22rem;
    background:#f3f3f3;
    margin:1rem;
    border-radius: 2rem;
    
`;

export const Buttons = styled.div`
    display: flex;
    width:100%;
`
export const Button = styled.button`
    background-color: #41211f;
    width: 100%;
    height: 3rem;
    display: flex;
    border-radius: ${props => props.borderRadius || '0'};
    color:#fff;
    font-size: 1.2rem;

    justify-content: center;
    align-items: center;
    `;

export const Title = styled.h1`
    font-size: 1.2rem;
    font-weight: bold;
    color: #41211f;
    margin:0;
    text-align: center;
`;

export const Image = styled.img`
    width: 10rem;
    height: 12rem;
    justify-content: center;
    background: url("https://franquiapilaoprofessional.com.br/wp-content/uploads/2020/10/Maquina_Pilao-Lei-Sa.png" ) no-repeat center/contain;);
    border: none;
    margin:5px;
    

`

export const EquipCod = styled.p`
    font-size: 1rem;
    color: #41211f;
    font-weight: bold;
    margin:0;
`;
