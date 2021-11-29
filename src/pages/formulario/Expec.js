import React from 'react';

import MenuItem from "@material-ui/core/MenuItem";

import Input from "../../components/materialComponents/InputUnderline";
import InputMultline from "../../components/materialComponents/InputMultline";
import Select from "../../components/materialComponents/Select";

export const Expect = (props) => {

  const handleDefinePrioidade = (opcao, prioridade, event) => {
    let aux = [];

    if (!Number.isSafeInteger(Number(prioridade)) || Number(prioridade) > 11) {
      event.target.value = prioridade.slice(0, prioridade.length - 1);
      return;
    }

    aux = [...props.Form.Prioridade];

    aux[opcao] = prioridade;

    props.FormHandler({
      ...props.Form, Prioridade: aux
    })
  }

  return (
    <>
      <p>
        52. Na fase inicial, eventualmente, faz-se necessária uma
        cobertura dos custos fixos da franquia, por motivo do
        negócio ainda não atingir uma maturidade suficiente. Nesse
        caso, existe disponibilidade de capital para um eventual
        investimento parcial mensal que complemente as despesas da
        franquia?
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Cob_Desp: e.target.value,
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>

      <p>53. Como você conheceu a Pilão Professional?</p>
      <InputMultline
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Conhece_Pilao: e.target.value,
          })
        }
        value={props.Form.Conhece_Pilao}
        label="Especifique..."
      />

      <p>
        54. Seguindo a sua opinião pessoal, por favor, numere por
        ordem de sua preferência, os motivos que o fizeram decidir
        pela franquia Pilão Professional (colocando o número 01 para
        o mais importante – primeiro - e respectivamente numerando
        até o 11 para o menos importante - último). Leia todas as
        alternativas antes de começar a responder
      </p>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={0}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Serviço de apoio prestado da franqueadora.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={1}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Investimento. A equação financeira entre o quanto é
          investido e o tempo que demora e haver o retorno desse
          valor.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={2}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Status. Reconhecimento social que ganhará tornando-se um
          franqueado Pilão Professional.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={3}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>Afinidade com a marca Pilão</label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={4}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Lucratividade. Quanto é o potencial de lucro mensal.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={5}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Segurança e solidez. Garantidas pelos fatos de ser uma
          empresa líder no segmento.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={6}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>Afinidade com o produto café</label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={7}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Pelos conceitos, valores e cultura (transparência,
          afetividade, seriedade, etc); percebidos durante o
          processo de conhecimento da franquia.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={8}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Força comercial da marca. Pelo tanto que a marca é
          conhecida pelo consumidor, faz propagandas e terá
          capacidade de gerar vendas nas unidades franqueadas.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={9}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Indicação de um amigo ou conhecido.
        </label>
      </div>
      <div style={divStyle}>
        <input
          onChange={(e) => {
            e.persist();
            handleDefinePrioidade(
              e.target.id,
              e.target.value,
              e
            );
          }}
          id={10}
          style={inputStyle}
          placeholder={0}
          maxLength={2}
          type="text"
        />
        <label style={labels}>
          Referências positivas de franqueado(s) da rede Pilão
          Professional
        </label>
      </div>

      <p>
        55. Qual foi a característica do negócio que mais pesou na
        escolha da Pilão Professional?
      </p>
      <InputMultline
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Caracteristica_Peso: e.target.value,
          })
        }
        value={props.Form.Caracteristica_Peso}
        label="Especifique...   "
      />

      <p>
        56. Numa franquia, a padronização é algo muito importante.
        Acrescenta-se ainda que a franqueadora tem sob sua
        responsabilidade a organização da rede em geral, bem como o
        cuidado com a manutenção da competitividade do negócio. Por
        esse motivo, trata-se de uma relação pautada por muitas
        regras, estabelecidas no dia a dia pela franqueadora, com
        base nos objetivos descritos. Você está ciente disso e
        disposto(a) a cumprir as regras estabelecidas pela
        franqueadora.
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Com_Regra: e.target.value,
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>

      <p>
        57. No que se refere ao lucro líquido que uma franquia pode
        oferecer, por mês em média (ao final de um ano, o lucro
        médio por mês), no total (no caso de existirem sócios, o
        lucro total, não a parte de cada sócio), existem alguns
        casos em que nos primeiros meses a média mensal fica sendo
        inferior a R$500,00. Caso na sua franquia exista esse nível
        de lucro, assim mesmo é possível para você iniciar o
        negócio?
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Com_Med: e.target.value,
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>

      <p>
        58. Devido à natureza da relação, rotineiramente a franquia
        deve fornecer as mais diversas informações para a
        franqueadora. Por exemplo, no que se refere aos resultados
        financeiros, existe o acompanhamento do desempenho de todas
        as máquinas, isso com o objetivo de planejar as políticas
        estratégicas da rede como um todo, e também para detectar
        eventuais problemas de gestão e potencial na unidade. São
        diversas informações, sobre diversos campos do negócio. Você
        se compromete a informar a franqueadora sobre o que for
        solicitado, desde que pertinente ao negócio?
      </p>
      <Select
        width="200px"
        label="Selecione..."
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Com_Inf: e.target.value,
          })
        }
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>
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

const labels = {
  all: "unset",
  fontSize: "1.20rem",
};

const inputStyle = {
  width: "20px",
  textAlign: "center",
  height: "unset",
  border: "1px solid #9e9e9e",
  marginRight: "10px",
};