import React from 'react'

import MenuItem from "@material-ui/core/MenuItem";

import Select from "../../components/materialComponents/Select";
import Input from "../../components/materialComponents/InputUnderline";

export const Partner = (props) => {

  const marcaCheckbox = (valueMarcado, value) => {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');

    if (valueMarcado > 3 && value === true) {
      props.FormHandler({
        ...props.Form,
        Est_Civil: valueMarcado,
        Conj_Nome: null,
        Conj_DtNascimento: null,
        Conj_CPF: null,
        Conj_RG: null,
        TUnião: null,
        Conj_RendMensal: null,
      })
    } else if (value === false) {
      props.FormHandler({
        ...props.Form,
        Est_Civil: null,
        Conj_Nome: null,
        Conj_DtNascimento: null,
        Conj_CPF: null,
        Conj_RG: null,
        TUnião: null,
        Conj_RendMensal: null,
      })
    } else {
      props.FormHandler({
        ...props.Form,
        Est_Civil: valueMarcado
      })
    }

    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].value !== valueMarcado) {
        checkbox[i].checked = false;
      }
    }
  }

  return (
    <>
      <p>15. Estado Civil:</p>
      <div style={divStyle}>
        <input
          type="checkbox"
          style={checkbox}
          onClick={(e) =>
            marcaCheckbox(e.target.value, e.target.checked)
          }
          value="1"
        />
        <p style={{ margin: "0px" }}>
          Casado(a) em regime de comunhão universal de bens
        </p>
      </div>
      <div style={divStyle}>
        <input
          type="checkbox"
          onClick={(e) =>
            marcaCheckbox(e.target.value, e.target.checked)
          }
          value="2"
        />
        <p style={{ margin: "0px" }}>
          Casado(a) em regime de comunhão parcial de bens
        </p>
      </div>
      <div style={divStyle}>
        <input
          type="checkbox"
          onClick={(e) =>
            marcaCheckbox(e.target.value, e.target.checked)
          }
          value="3"
        />
        <p style={{ margin: "0px" }}>
          Casado(a) em regime de separação de bens
        </p>
      </div>
      <div style={divStyle}>
        <input
          type="checkbox"
          onClick={(e) =>
            marcaCheckbox(e.target.value, e.target.checked)
          }
          value="4"
        />
        <p style={{ margin: "0px" }}>Solteiro (a)</p>
      </div>
      <div style={divStyle}>
        <input
          type="checkbox"
          onClick={(e) =>
            marcaCheckbox(e.target.value, e.target.checked)
          }
          value="5"
        />
        <p style={{ margin: "0px" }}>Divorciado(a)</p>
      </div>
      <div style={divStyle}>
        <input
          type="checkbox"
          onClick={(e) =>
            marcaCheckbox(e.target.value, e.target.checked)
          }
          value="6"
        />
        <p style={{ margin: "0px" }}>Separado(a) judicialmente</p>
      </div>
      <div style={divStyle}>
        <input
          type="checkbox"
          onClick={(e) =>
            marcaCheckbox(e.target.value, e.target.checked)
          }
          value="7"
        />
        <p style={{ margin: "0px" }}>Viúvo (a)</p>
      </div>

      {props.Form.Est_Civil < 4 &&
        props.Form.Est_Civil !== null ? (
        <>
          <div style={divStyle}>
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Conj_Nome: e,

                })
              }
              label="16. Nome do(a) cônjuge"
            />
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Conj_DtNascimento: e,
                })
              }
              label="17. Data de Nascimento"
            />
          </div>
          <div style={divStyle}>
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Conj_CPF: e,
                })
              }
              label="18. CPF"
            />
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Conj_RG: e,
                })
              }
              label="19. RG"
            />
          </div>
          <div style={divStyle}>
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  TUnião: e,
                })
              }
              label="20. Tempo de união"
            />
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Conj_RendMensal: e,
                })
              }
              label="21. Rendimento mensal"
            />
          </div>
        </>
      ) : null}
      <p>24. Possui filhos?</p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Tem_filhos: e.target.value,
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>

      {props.Form.Tem_filhos === "Sim" ? (
        <div style={divStyle}>
          <Input
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Qtd_filhos: e,
              })
            }
            label="25. Quantos:"
          />
          <Input
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Idd_filhos: e,
              })
            }
            label="26. Idades:"
          />
        </div>
      ) : null}
    </>
  )
}

const divStyle = {
  display: "Flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",
};

const checkbox = {};