import React from 'react';

import MenuItem from "@material-ui/core/MenuItem";

import Select from "../../components/materialComponents/Select";
import Input from "../../components/materialComponents/InputUnderline";
import InputMultline from "../../components/materialComponents/InputMultline";

export const Goods = (props) => {
  return (
    <>
      <p>22. CLT?</p>
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
          onChange={(e) =>
            props.FormHandler({
                ...props.Form,
                Rend_Mensal: e,
            })
          }
          label="23. Rendimento mensal"
        />
      ) : null}



      <p>27. Residencia:</p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
              ...props.Form,
              T_Residencia: e.target.value,
          })
        }
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
          label="28. Valor mensal"
        />
      ) : null}

      <p>29. Possui veículo?</p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
              ...props.Form, 
              P_Veiculo: e.target.value 
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>
      <p>30. Possui Imóvel?</p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
              ...props.Form, 
              P_Imovel: e.target.value 
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>

      <p>
        31. Qual sua expectativa de retorno para esse investimento?
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
              ...props.Form, 
              Expect: e.target.value 
          })
        }
      >
        <MenuItem value="10/20">10 a 20 meses</MenuItem>
        <MenuItem value="20/30">20 a 30 meses</MenuItem>
        <MenuItem value="30+">30+ meses</MenuItem>
      </Select>

      <p>
        32. Teve recolhimento de imposto de renda no ultimo ano?
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
              ...props.Form,
              Recolhimento: e.target.value,
          })
        }
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
            placeholder="33. Quantia:"
          />
          <p>*Sem considerar eventual valor restituído</p>
        </div>
      ) : null}

      <p>
        34. Qual a origem do capital disponível para a abertura do
        negócio com a Pilão Professional?
      </p>
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
      <p>35. Qual sua renda familiar mensal?</p>
      <Input
        onChange={(e) =>
          props.FormHandler({
              ...props.Form,
              Renda_Familiar: e,
          })
        }
        placeholder="Especifique..."
      />

      <p>36. Como é composta sua renda familiar?</p>
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

      <p>
        37. Qual a disponibilidade para investimento na franquia, em
        dinheiro, sem considerar empréstimos ou linhas de crédito?
      </p>
      <Input
        onChange={(e) =>
          props.FormHandler({
              ...props.Form,
              Disp_Invest: e,
          })
        }
        placeholder="Especifique..."
      />
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