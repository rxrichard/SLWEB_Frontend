import React from 'react';

import Input from "../../components/materialComponents/InputUnderline";

export const BasicInfo = (props) => {
  return (
    <div style={divBorder}>
      <div style={divStyle2}>
        <Input
          label="1. Nome completo"
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
          label="2. Dt. de nascimento"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              RG: e

            })
          }
          label="3. RG"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              CPF: e

            })
          }
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
          label="5. Logradouro"
        />

        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Número: e

            })
          }
          label="6. Número"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Complemento: e,

            })
          }
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
          label="8. Bairro"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Municipio: e

            })
          }
          label="9. Município"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Estado: e

            })
          }
          label="10. Estado"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              CEP: e
            })
          }
          label="11. CEP"
        />
      </div>

      <div style={divStyle2}>
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Email: e

            })
          }
          label="12. Email"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Tel_Residencial: e,

            })
          }
          label="13. Telefone residencial"
        />
        <Input
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Celular: e

            })
          }
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
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",
};

const divStyle2 = {
  display: "Flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",
};