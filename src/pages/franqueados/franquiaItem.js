import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardActions, CardContent, Button, Typography, } from '@material-ui/core';

import { Launch as LaunchIcon } from '@material-ui/icons'

import moment from 'moment'


export const FranquiaItem = ({ Franquia, onOpenDetailsModal }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="elevation">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Filial {Franquia.M0_CODFIL}
        </Typography>
        <Typography className={classes.ellipsis} variant="h5" component="h2">
          {Franquia.NREDUZ}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {Franquia.GrupoVenda}
        </Typography>
        <Typography variant="body2" component="p">
          Grupo de Venda: {Franquia.A1_GRPVEN}
          <br />
          Cod TOTVs: {Franquia.A1_COD}
          <br />
          CNPJ: {Franquia.M0_CGC}
          <br />
          Consultor: {Franquia.Consultor}
          <br />
          UF: {Franquia.UF}
          <br />
          Data de Cadastro: {Franquia.DtCadastro !== null ? moment(Franquia.DtCadastro).format('L') : "Desconhecida"}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          endIcon={<LaunchIcon />}
          onClick={onOpenDetailsModal}
        >
          Ver mais
        </Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles({
  root: {
    width: '300px',
    height: '300px',
    margin: '8px 0px'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});