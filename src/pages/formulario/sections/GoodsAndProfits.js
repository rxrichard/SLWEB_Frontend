import React from 'react';

import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import Select from "../../../components/materialComponents/Select";
import Input from "../../../components/materialComponents/InputUnderline";
import InputMultline from "../../../components/materialComponents/InputMultline";

export const Goods = (props) => {
  return (
    <div className="XAlign" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div className="YAlign" style={{ textAlign: 'start', minWidth: '400px' }}>
        <Typography variant='subtitle1'>22. CLT?</Typography>
        <div className="XAlign" style={{ justifyContent: 'flex-start' }}>
          <Select
            width="200px"
            label="Selecione..."
            value={props.Form.CLT}
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                CLT: e.target.value
              })
            }
          >
            <MenuItem value="Sim">Sim</MenuItem>
            <MenuItem value="Não">Não</MenuItem>
          </Select>
          {props.Form.CLT === "Sim" ? (
            <Input
              style={{ margin: '0px 0px 0px 8px' }}
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Rend_Mensal: e,
                })
              }
              value={props.Form.Rend_Mensal}
              label="23. Rendimento mensal"
              />
              ) : null}
        </div>


        <Typography variant='subtitle1'>27. Residencia:</Typography>
        <div className="XAlign" style={{ justifyContent: 'flex-start' }}>
          <Select
            width="200px"
            label="Selecione..."
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                T_Residencia: e.target.value,
              })
            }
            value={props.Form.T_Residencia}
            >
            <MenuItem value="Própria">Própria</MenuItem>
            <MenuItem value="Alugada">Alugada</MenuItem>
            <MenuItem value="Financiada">Financiada</MenuItem>
            <MenuItem value="Emprestada">Emprestada</MenuItem>
            <MenuItem value="Outros">Outros</MenuItem>
          </Select>

          {props.Form.T_Residencia === "Alugada" ||
            props.Form.T_Residencia === "Financiada" ? (
              <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Residencia_Mensal: e,
                })
              }
              value={props.Form.Residencia_Mensal}
              label="28. Valor mensal"
              />
              ) : null}
        </div>

        <Typography variant='subtitle1'>29. Possui veículo?</Typography>
        <Select
          width="200px"
          label="Selecione..."
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              P_Veiculo: e.target.value
            })
          }
          value={props.Form.P_Veiculo}
          >
          <MenuItem value="Sim">Sim</MenuItem>
          <MenuItem value="Não">Não</MenuItem>
        </Select>
        <Typography variant='subtitle1'>30. Possui Imóvel?</Typography>
        <Select
          width="200px"
          label="Selecione..."
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              P_Imovel: e.target.value
            })
          }
          value={props.Form.P_Imovel}
          >
          <MenuItem value="Sim">Sim</MenuItem>
          <MenuItem value="Não">Não</MenuItem>
        </Select>

        <Typography variant='subtitle1'>
          32. Teve recolhimento de imposto de renda no ultimo ano?
        </Typography>
        <div className="XAlign" style={{ justifyContent: 'flex-start' }}>
          <Select
            width="200px"
            label="Selecione..."
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Recolhimento: e.target.value,
              })
            }
            value={props.Form.Recolhimento}
            >
            <MenuItem value="Sim">Sim</MenuItem>
            <MenuItem value="Não">Não</MenuItem>
          </Select>

          {props.Form.Recolhimento === "Sim" ? (
            <div style={divStyle}>
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Recolhimento_QTD: e,
                  })
                }
                value={props.Form.Recolhimento_QTD}
                label="33. Quantia:"
                />
              <Typography variant='subtitle1'>*Sem considerar eventual valor restituído</Typography>
            </div>
          ) : null}
        </div>
      </div>
      <div className="YAlign" style={{ textAlign: 'start' }}>
        <Typography variant='subtitle1'>35. Qual sua renda familiar mensal?</Typography>
        <Input
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              Renda_Familiar: e,
            })
          }
          value={props.Form.Renda_Familiar}
          label="Especifique..."
          />
        <Typography variant='subtitle1'>36. Como é composta sua renda familiar?</Typography>
        <InputMultline
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              Renda_Composta: e.target.value,
            })
          }
          value={props.Form.Renda_Composta}
          label="Especifique..."
          />

        <Typography variant='subtitle1'>
          31. Qual sua expectativa de retorno para esse investimento?
        </Typography>
        <Select
          width="200px"
          label="Selecione..."
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              Expect: e.target.value
            })
          }
          value={props.Form.Expect}
          >
          <MenuItem value="10/20">10 a 20 meses</MenuItem>
          <MenuItem value="20/30">20 a 30 meses</MenuItem>
          <MenuItem value="30+">30+ meses</MenuItem>
        </Select>
        <Typography variant='subtitle1'>
          34. Qual a origem do capital disponível para a abertura do
          negócio com a Pilão Professional?
        </Typography>
        <InputMultline
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              Origem_Capital: e.target.value,
            })
          }
          value={props.Form.Origem_Capital}
          label="Especifique..."
        />
        <Typography variant='subtitle1'>
          37. Qual a disponibilidade para investimento na franquia, em
          dinheiro, sem considerar empréstimos ou linhas de crédito?
        </Typography>
        <Input
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              Disp_Invest: e,
            })
          }
          value={props.Form.Disp_Invest}
          label="Especifique..."
        />
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