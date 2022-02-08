import React from "react";
import { Redirect } from "react-router-dom";
import {
  REACT_APP_FRANQUEADO_ROLE_LEVEL,
  REACT_APP_EXPEDICAO_ROLE_LEVEL,
  REACT_APP_SISTEMA_ROLE_LEVEL,
  REACT_APP_JURIDICO_ROLE_LEVEL,
  REACT_APP_BACKOFFICE_ROLE_LEVEL,
  REACT_APP_TECNICA_ROLE_LEVEL,
} from "./role_levels";

//Retorna CNPJ/CPF formatado
export const maskCNPJ = (cnpj) => {
  if (cnpj.length === 11) {
    const CPF_COM_ZEROS = `000${cnpj}`;
    const CPF_COMPLETO = CPF_COM_ZEROS.slice(-11);

    var CPF = [];

    CPF[0] = CPF_COMPLETO.substring(0, 3);
    CPF[1] = CPF_COMPLETO.substring(3, 6);
    CPF[2] = CPF_COMPLETO.substring(6, 9);
    CPF[3] = CPF_COMPLETO.substring(9, 11);

    const CNPJss = `${CPF[0]}.${CPF[1]}.${CPF[2]}-${CPF[3]}`;

    return CNPJss;
  } else if (cnpj.length === 14) {
    const CNPJ_COM_ZEROS = `000${cnpj}`;
    const CNPJ_COMPLETO = CNPJ_COM_ZEROS.slice(-14);

    var CNPJ = [];

    CNPJ[0] = CNPJ_COMPLETO.substring(0, 2);
    CNPJ[1] = CNPJ_COMPLETO.substring(2, 5);
    CNPJ[2] = CNPJ_COMPLETO.substring(5, 8);
    CNPJ[3] = CNPJ_COMPLETO.substring(8, 12);
    CNPJ[4] = CNPJ_COMPLETO.substring(12, 14);

    const CNPJss = `${CNPJ[0]}.${CNPJ[1]}.${CNPJ[2]}/${CNPJ[3]}-${CNPJ[4]}`;

    return CNPJss;
  } else {
    return cnpj;
  }
};

//Retorna CEP formatado
export const maskCEP = (cep) => {
  const cep_aux = [];

  cep_aux[0] = cep ? cep.substring(0, 2) : '?';
  cep_aux[1] = cep ? cep.substring(2, 5) : '?';
  cep_aux[2] = cep ? cep.substring(5, 8) : '?';

  return `${cep_aux[0]}.${cep_aux[1]}-${cep_aux[2]}`;
};

//Valida o valor de um input
export const valueCheck = (value) => {
  if (!isNaN(parseFloat(value))) {
    if (
      value.charAt(value.length - 1) === "." ||
      value.charAt(value.length - 1) === ","
    ) {
      return value;
    }
    return parseFloat(value);
  } else {
    if (value.length > 1) {
      value = value.slice(-1);
      return value.slice(-1);
    } else {
      value = 0;
      return 0;
    }
  }
};

//Retorna a data atual em formato DD/MM/AAAA com fuso horário correto
export const dateCheck = () => {
  const data = new Date();

  return data.toLocaleString();
};

//Retorna datas completas convertidas em DD/MM/AAAA
export const convertData = (data) => {
  if (data === "NA" || data === null || typeof data == "undefined") {
    return "NA";
  }

  let DtSolicita = String(data);

  const dataA = DtSolicita.split("T");
  const dataB = dataA[0].replace(/-/g, "/");
  return dataB.split("/").reverse().join("/");
};

//Destaca um elemento clicado
export const Bright = (event) => {
  event.target.parentElement.className = "Selected";
  event.persist();
  setTimeout(() => (event.target.parentElement.className = "Item"), 1000);
};

export const Go = (to) => {
  if (typeof to === "string") {
    return <Redirect to={to} />;
  }
};

export const roleLevel = () => {
  const role = sessionStorage.getItem("role");

  switch (role) {
    //sem permissão pra funções especiais
    case "Franquia":
      return REACT_APP_FRANQUEADO_ROLE_LEVEL;

    //permissão para interagir com solicitações de máquinas e configurações
    case "Expedição":
      return REACT_APP_EXPEDICAO_ROLE_LEVEL;

    //permissão para interagir com solicitações de máquinas e configurações
    case "Técnica Pilão" || "Técnica Bianchi":
      return REACT_APP_TECNICA_ROLE_LEVEL;

    //permissão para ver dados sensiveis de franqueados e gerar relatórios
    case "Jurídico":
      return REACT_APP_JURIDICO_ROLE_LEVEL;

    //permissão para alterar dados sensiveis de franqueados e gerar relatórios
    case "BackOffice":
      return REACT_APP_BACKOFFICE_ROLE_LEVEL;

    //Super usuário
    case "Sistema":
      return REACT_APP_SISTEMA_ROLE_LEVEL;

    default:
      return 0;
  }
};

export const toValidString = (string, sub = '') => {
  return string === null || string === 'null' || typeof string == 'undefined'? sub : String(string).trim();
}

export const capitalizeMonthFirstLetter = (month) => {
  return month.charAt(0).toUpperCase() + month.slice(1)
}