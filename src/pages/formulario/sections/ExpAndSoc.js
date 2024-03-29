import React from 'react';

import MenuItem from "@material-ui/core/MenuItem";

import Typography from "@material-ui/core/Typography";

import Input from "../../../components/materialComponents/InputUnderline";
import Select from "../../../components/materialComponents/Select";
import InputMultline from "../../../components/materialComponents/InputMultline";

export const Profile = (props) => {
  return (
    <div style={divBorder}>
      <div className="YAlign" style={{ textAlign: 'start', minWidth: '400px', justifyContent: 'flex-start' }}>
        <Typography>
          Tem/Teve empresa própria e/ou tem experiencia como
          profissional autônomo?
        </Typography>
        <Select
          width="200px"
          label="Selecione..."
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              T_Empresa: e.target.value
            })
          }
          value={props.Form.T_Empresa}
        >
          <MenuItem value="Sim">Sim</MenuItem>
          <MenuItem value="Não">Não</MenuItem>
        </Select>

        <Typography>
          Qual a sua formação escolar/acadêmica (especificar grau
          e área se houver)?
        </Typography>
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

        <Typography>
          De forma simplificada, nos conte sobre suas últimas
          experiências profissionais.
        </Typography>
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
        <Typography>Haverá sociedade neste negócio?</Typography>
        <Select
          width="200px"
          label="Selecione..."
          onChange={(e) =>
            props.FormHandler({

              ...props.Form,
              Sociedade: e.target.value
            })
          }
          value={props.Form.Sociedade}
        >
          <MenuItem value="Sim">Sim</MenuItem>
          <MenuItem value="Não">Não</MenuItem>
        </Select>



        <Typography>
          Você já teve algum empreendimento em sociedade com
          alguém?
        </Typography>
        <Select
          width="200px"
          label="Selecione..."
          onChange={(e) =>
            props.FormHandler({
              ...props.Form,
              T_Empreendimento: e.target.value,
            })
          }
          value={props.Form.T_Empreendimento}
        >
          <MenuItem value="Sim">Sim</MenuItem>
          <MenuItem value="Não">Não</MenuItem>
        </Select>

        {props.Form.T_Empreendimento === "Sim" ? (
          <>
            <Typography>Como foi a experiência?</Typography>
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
      </div>
      <div className="YAlign" style={{ textAlign: 'start', height: '100%' }}>
        {props.Form.T_Empresa === "Sim" ? (
          <><Typography variant='subtitle1' gutterBottom>Sobre experiência como autônomo/proprietário de empresa:</Typography>
            <Typography>
              Especifique detalhadamente qual a atividade, se
              existiam sócios, quais os rendimentos mensais, qual a
              quantidade de horas de trabalho por dia em média e qual
              o capital social: No caso do negócio não mais existir,
              especificar detalhadamente quais os motivos que
              ocasionaram o encerramento, se na ocasião houve prejuízo
              ou lucro e se houve a ocorrência de dívidas pendentes
            </Typography>
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

        {props.Form.Sociedade === "Sim" ? (
          <>
            <Typography
              variant='subtitle1'
              gutterBottom
            >
              Sobre sócio na franquia:
            </Typography>
            <div style={divStyle}>
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Nome_Socio: e,

                  })
                }
                value={props.Form.Nome_Socio}
                label="Nome do sócio"
              />
              <Input
                onChange={(e) =>
                  props.FormHandler({
                    ...props.Form,
                    Socio_Vinculo: e,
                  })
                }
                value={props.Form.Socio_Vinculo}
                label="Tipo de vinculo"
              />
            </div>
            <Typography>Há quanto tempo se conhecem?</Typography>
            <Input
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Tempo_ConheceSocio: e,
                })
              }
              value={props.Form.Tempo_ConheceSocio}
              label="Especifique..."
            />
            <Typography>O que já realizaram juntos?</Typography>
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

            <Typography>
              Essa pessoa vai ser sócia no contrato de concessão
              da franquia ou apenas vai participar no contrato da
              empresa (pessoa jurídica) que vai operar a franquia?
              Especificar em que condições e em qual proporção
            </Typography>
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
            <Typography>
              Havendo sociedada, essa pessoa participará do
              investimento?
            </Typography>
            <Select
              width="200px"
              label="Selecione..."
              onChange={(e) =>
                props.FormHandler({
                  ...props.Form,
                  Part_invest: e.target.value,
                })
              }
              value={props.Form.Part_invest}
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
            {props.Form.Part_invest === "Sim" ? (
              <>
                <Typography>Em qual proporção?</Typography>
                <Input
                  onChange={(e) =>
                    props.FormHandler({
                      ...props.Form,
                      Prop_Invest: e,
                    })
                  }
                  value={props.Form.Prop_Invest}
                  label="Especifique..."
                />
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}

const divBorder = {
  display: "flex",
  padding: "10px 10px 10px 10px",
  marginBottom: "10px",
  width: "100%",
  flexDirection: "row",
  border: "1px solid #c1c1c1",
  borderRadius: "1vw",
  flexWrap: 'wrap',
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