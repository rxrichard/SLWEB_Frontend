import React from 'react';

import Input from "../../../components/materialComponents/InputUnderline";
import { RED_PRIMARY, GREY_SECONDARY } from '../../../misc/colors'

export const BasicInfo = (props) => {
  return (
    <div style={divBorder}>
      <div style={divStyle2}>
        <Input
          label="1. Nome completo"
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
          label="2. Dt. de nascimento"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              RG: e

            })
          }
          value={props.Form.RG}
          label="3. RG"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              CPF: e

            })
          }
          value={props.Form.CPF}
          label="4. CPF"
          />
      </div>

      <div style={divStyle}>
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Logradouro: e,
              
            })
          }
          value={props.Form.Logradouro}
          label="5. Logradouro"
          />

        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Número: e
              
            })
          }
          value={props.Form.Número}
          label="6. Número"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Complemento: e,
              
            })
          }
          value={props.Form.Complemento}
          label="7. Complemento"
          />
      </div>

      <div style={divStyle2}>
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Bairro: e
              
            })
          }
          value={props.Form.Bairro}
          label="8. Bairro"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Municipio: e
              
            })
          }
          value={props.Form.Municipio}
          label="9. Município"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Estado: e
              
            })
          }
          value={props.Form.Estado}
          label="10. Estado"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              CEP: e
            })
          }
          value={props.Form.CEP}
          label="11. CEP"
          />
      </div>

      <div style={divStyle}>
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Email: e
              
            })
          }
          value={props.Form.Email}
          label="12. Email"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Tel_Residencial: e,
              
            })
          }
          value={props.Form.Tel_Residencial}
          label="13. Telefone residencial"
          />
        <Input
          onChange={(e) =>
            props.FormHandler({
              
              ...props.Form,
              Celular: e
              
            })
          }
          value={props.Form.Celular}
          label="14. Celular"
        />
      </div>
    </div>
  )
}

const divBorder = {
  display: "flex",
  padding: "10px 10px 0px 10px",
  width: "100%",
  flexDirection: "column",
  border: "1px solid #c1c1c1",
  borderRadius: "1vw",
};

const divStyle = {
  display: "Flex",
  flexWrap: "wrap",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",

  borderRadius: '8px',
  borderBottom: `4px solid ${RED_PRIMARY}`,
  borderLeft: `4px solid ${RED_PRIMARY}`,
};

const divStyle2 = {
  display: "Flex",
  flexWrap: "wrap",
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",

  borderRadius: '8px',
  borderBottom: `4px solid ${GREY_SECONDARY}`,
  borderLeft: `4px solid ${GREY_SECONDARY}`,
};