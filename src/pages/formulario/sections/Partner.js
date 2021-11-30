import React from 'react'

import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import Select from "../../../components/materialComponents/Select";
import Input from "../../../components/materialComponents/InputUnderline";

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
    <div className="XAlign" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div className="YAlign" style={{ textAlign: 'start' }}>
        <Typography variant='subtitle1'>15. Estado Civil:</Typography>
        <div>
          <div style={divStyle}>
            <input
              type="checkbox"
              style={checkbox}
              onClick={(e) =>
                marcaCheckbox(e.target.value, e.target.checked)
              }
              value="1"
              checked={props.Form.Est_Civil === '1'}
            />
            <Typography variant='subtitle1'>
              Casado(a) em regime de comunhão universal de bens
            </Typography>
          </div>
          <div style={divStyle}>
            <input
              type="checkbox"
              onClick={(e) =>
                marcaCheckbox(e.target.value, e.target.checked)
              }
              value="2"
              checked={props.Form.Est_Civil === '2'}
            />
            <Typography variant='subtitle1'>
              Casado(a) em regime de comunhão parcial de bens
            </Typography>
          </div>
          <div style={divStyle}>
            <input
              type="checkbox"
              onClick={(e) =>
                marcaCheckbox(e.target.value, e.target.checked)
              }
              value="3"
              checked={props.Form.Est_Civil === '3'}
            />
            <Typography variant='subtitle1'>
              Casado(a) em regime de separação de bens
            </Typography>
          </div>
          <div style={divStyle}>
            <input
              type="checkbox"
              onClick={(e) =>
                marcaCheckbox(e.target.value, e.target.checked)
              }
              value="4"
              checked={props.Form.Est_Civil === '4'}
            />
            <Typography variant='subtitle1'>Solteiro (a)</Typography>
          </div>
          <div style={divStyle}>
            <input
              type="checkbox"
              onClick={(e) =>
                marcaCheckbox(e.target.value, e.target.checked)
              }
              value="5"
              checked={props.Form.Est_Civil === '5'}
            />
            <Typography variant='subtitle1'>Divorciado(a)</Typography>
          </div>
          <div style={divStyle}>
            <input
              type="checkbox"
              onClick={(e) =>
                marcaCheckbox(e.target.value, e.target.checked)
              }
              value="6"
              checked={props.Form.Est_Civil === '6'}
            />
            <Typography variant='subtitle1'>Separado(a) judicialmente</Typography>
          </div>
          <div style={divStyle}>
            <input
              type="checkbox"
              onClick={(e) =>
                marcaCheckbox(e.target.value, e.target.checked)
              }
              value="7"
              checked={props.Form.Est_Civil === '7'}
            />
            <Typography variant='subtitle1'>Viúvo (a)</Typography>
          </div>
        </div>

        <Typography variant='subtitle1'>24. Possui filhos?</Typography>
        <Select
          width="200px"
          MBottom='8px'
          label="Selecione..."
          value={props.Form.Tem_filhos}
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


      </div>
      <div style={{ textAlign: 'start' }}>
        {props.Form.Est_Civil < 4 &&
          props.Form.Est_Civil !== null ? (
          <>
            <Typography variant='subtitle1'>Dados do(a) companheiro(a)</Typography>
            <div style={divStyle}>
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Conj_Nome: e,

                  })
                }
                value={props.Form.Conj_Nome}
                label="16. Nome do(a) cônjuge"
                />
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Conj_DtNascimento: e,
                  })
                }
                value={props.Form.Conj_DtNascimento}
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
                value={props.Form.Conj_CPF}
                label="18. CPF"
                />
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Conj_RG: e,
                  })
                }
                value={props.Form.Conj_RG}
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
                value={props.Form.TUnião}
                label="20. Tempo de união"
                />
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Conj_RendMensal: e,
                  })
                }
                value={props.Form.Conj_RendMensal}
                label="21. Rendimento mensal"
                />
            </div>
          </>
        ) : null}
        {props.Form.Tem_filhos === "Sim" ? (
          <>
            <Typography variant='subtitle1'>Dados do(s) filho(s)</Typography>
            <div style={divStyle}>
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Qtd_filhos: e,
                  })
                }
                value={props.Form.Qtd_filhos}
                label="25. Quantos:"
                />
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Idd_filhos: e,
                  })
                }
                value={props.Form.Idd_filhos}
                label="26. Idades:"
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
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