import React from 'react';

import Input from "../../../components/materialComponents/InputUnderline";
// import { RED_PRIMARY, GREY_SECONDARY } from '../../../misc/colors'
import { BlockTotal, Block } from '../styles';

export const BasicInfo = (props) => {
  return (
    <BlockTotal>
      <Block border={"1px solid #000"} >
  
        <Input  style={inputStyle}
          label="Nome completo"
          value={props.Form.Nome_Completo}
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              Nome_Completo: e,
            })
          }
        />
        <Input 
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              DtNascimento: e,

            })
          }
          value={props.Form.DtNascimento}
          label="Data de nascimento"
        />

        <Input
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              RG: e
            })
          }
          value={props.Form.RG}
          label="Número do RG"
        />

        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              CPF: e

            })
          }
          value={props.Form.CPF}
          label="Número do CPF"
          />
     
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Email: e
              
            })
          }
          value={props.Form.Email}
          label="Email"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Tel_Residencial: e,
              
            })
          }
          value={props.Form.Tel_Residencial}
          label="Telefone residencial"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Celular: e
              
            })
          }
          value={props.Form.Celular}
          label="Celular"
        />
          
      </Block>
      <Block border={"1px solid #000"}>
      
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Logradouro: e,
              
            })
          }
          value={props.Form.Logradouro}
          label="Endereço"
          />

        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Número: e
              
            })
          }
          value={props.Form.Número}
          label="Número"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Complemento: e,
              
            })
          }
          value={props.Form.Complemento}
          label="Complemento"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Bairro: e
              
            })
          }
          value={props.Form.Bairro}
          label="Bairro"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Municipio: e
              
            })
          }
          value={props.Form.Municipio}
          label="Município"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Estado: e
              
            })
          }
          value={props.Form.Estado}
          label="Estado"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              CEP: e
            })
          }
          value={props.Form.CEP}
          label="CEP"
          />


      </Block>
    </BlockTotal>
  )
}

const inputStyle = {
  width: '45vw',
  border: 'none',
  borderBottom: '1px solid #000',
  fontSize: '1.2rem',
};