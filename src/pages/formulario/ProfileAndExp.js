import React from 'react';

import MenuItem from "@material-ui/core/MenuItem";

import Input from "../../components/materialComponents/InputUnderline";
import Select from "../../components/materialComponents/Select";
import InputMultline from "../../components/materialComponents/InputMultline";

export const Profile = (props) => {
  return (
    <>
      <p>
        38. Tem/Teve empresa própria e/ou tem experiencia como
        profissional autônomo?
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({

            ...props.Form,
            T_Empresa: e.target.value
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>
      {props.Form.T_Empresa === "Sim" ? (
        <>
          <p>
            39. Especifique detalhadamente qual a atividade, se
            existiam sócios, quais os rendimentos mensais, qual a
            quantidade de horas de trabalho por dia em média e qual
            o capital social: No caso do negócio não mais existir,
            especificar detalhadamente quais os motivos que
            ocasionaram o encerramento, se na ocasião houve prejuízo
            ou lucro e se houve a ocorrência de dívidas pendentes
          </p>
          <InputMultline
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Detalhes_Atividade: e.target.value,

              })
            }
            value={props.Form.Detalhes_Atividade}
            label="Especifique..."
          />
        </>
      ) : null}
      <p>
        40. Qual a sua formação escolar/acadêmica (especificar grau
        e área se houver)?
      </p>
      <InputMultline
        onChange={(e) =>
          props.FormHandler({

            ...props.Form,
            Form_Escolar: e.target.value,

          })
        }
        value={props.Form.Form_Escolar}
        label="Especifique..."
      />

      <p>
        41. De forma simplificada, nos conte sobre suas últimas
        experiências profissionais.
      </p>
      <InputMultline
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Ult_exp: e.target.value
          })
        }
        value={props.Form.Ult_exp}
        label="Especifique..."
      />
      <p>42. Haverá sociedade neste negócio?</p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({

            ...props.Form,
            Sociedade: e.target.value
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>

      {props.Form.Sociedade === "Sim" ? (
        <>
          <div style={divStyle}>
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Nome_Socio: e,

                })
              }
              label="43. Nome do sócio"
            />
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Socio_Vinculo: e,
                })
              }
              label="44. Tipo de vinculo"
            />
          </div>
          <p>45. Há quanto tempo se conhecem?</p>
          <Input
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Tempo_ConheceSocio: e,
              })
            }
            placeholder="Especifique..."
          />
          <p>46. O que já realizaram juntos?</p>
          <InputMultline
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Realizou_Socio: e.target.value,
              })
            }
            value={props.Form.Realizou_Socio}
            label="Especifique..."
          />

          <p>
            47. Essa pessoa vai ser sócia no contrato de concessão
            da franquia ou apenas vai participar no contrato da
            empresa (pessoa jurídica) que vai operar a franquia?
            Especificar em que condições e em qual proporção
          </p>
          <InputMultline
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Cond_Socio: e.target.value,
              })
            }
            value={props.Form.Cond_Socio}
            label="Especifique...   "
          />
          <p>
            48. Havendo sociedada, essa pessoa participará do
            investimento?
          </p>
          <Select
            width="200px"
            label="Selecione..."
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Part_invest: e.target.value,
              })
            }
          >
            <MenuItem value="Sim">Sim</MenuItem>
            <MenuItem value="Não">Não</MenuItem>
          </Select>
          {props.Form.Part_invest === "Sim" ? (
            <>
              <p>49. Em qual proporção?</p>
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Prop_Invest: e,
                  })
                }
                placeholder="Especifique...   "
              />
            </>
          ) : null}
        </>
      ) : null}

      <p>
        50. Você já teve algum empreendimento em sociedade com
        alguém?
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            T_Empreendimento: e.target.value,
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>

      {props.Form.T_Empreendimento === "Sim" ? (
        <>
          <p>51. Como foi a experiência?</p>
          <InputMultline
            onChange={(e) =>
              props.FormHandler({
                ...props.Form,
                Exp_Sociedade: e.target.value,
              })
            }
            value={props.Form.Exp_Sociedade}
            label="Especifique...   "
          />
        </>
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