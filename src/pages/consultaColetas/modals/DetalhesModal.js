import React from "react";
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment';

import { DataGrid } from "@material-ui/data-grid";
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Typography,
  Button
} from '@material-ui/core';
import { SetColetaCarga } from '../../../global/actions/VendasAction'

const DetalhesModalWithRedux = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const {
    SetColetaCarga
  } = props;

  const DetalhesFormatado = fromProps2Datagrid(props.detalhes.Detalhes);

  const handleLoadVendas = (coleta) => {
    let carga = {
      Cliente: coleta.CNPJ,
      Items: []
    }

    coleta.Detalhes.forEach((item) => {
      let repetido = false

      //verifico se tem um mesmo produto em mais de uma posição, e se tiver eu somo as QTDs com o que já tem
      carga.Items.forEach((cargaItem, index) => {
        if (cargaItem.ProdId === item.ProdId) {
          repetido = true
          carga.Items[index] = {
            ...cargaItem,
            QVenda: cargaItem.QVenda + item.FfdQtdFaturar,
          }
        }
      })

      //se não for um produto repetido adiciono ele a carga
      if (!repetido) {
        carga.Items.push({
          ProdId: item.ProdId,
          VVenda: item.PvpVvn1,
          QVenda: item.FfdQtdFaturar,
          DVenda: 0
        })
      }
    })

    SetColetaCarga(carga)
    history.push('/vendas')
  }

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={props.open}
      onClose={props.onClose}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Button
            color="inherit"
            onClick={() => handleLoadVendas(props.detalhes)}
          >
            Faturar
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <section className={classes.sectionColumn}>
          <div
            className={classes.infoBox}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Typography
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
            >
              {props.detalhes.Anexo}
            </Typography>
            <Typography>
              {props.detalhes.Cálculo}
            </Typography>
          </div>
          <div
            className={classes.infoBox}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Typography>
              Referência
            </Typography>
            <div
              className='XAlign'
              style={{
                justifyContent: 'space-evenly',
              }}
            >
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                {props.detalhes.ColeteAnterior !== null ? moment(props.detalhes.ColeteAnterior).format('L') : '__/__/____'}
              </Typography>
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                &#x2192;
              </Typography>
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                {moment(props.detalhes.DataColeta).format('L')}
              </Typography>
            </div>
          </div>
          <section className={classes.sectionRow}>
            <div className={classes.infoBox}>
              <Typography>
                Contador Anterior
              </Typography>
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                {props.detalhes.ContAnterior}
              </Typography>
            </div>
            <div className={classes.infoBox}>
              <Typography>
                Contador Gravado
              </Typography>
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                {props.detalhes.Contador}
              </Typography>
            </div>
          </section>
        </section>
        <DataGrid
          style={{
            height: '100%',
          }}
          className={classes.datagrid}
          rows={DetalhesFormatado}
          columns={columns}
          autoPageSize={false}
          disableSelectionOnClick={true}
          disableColumnMenu={true}
          checkboxSelection={false}
          pageSize={DetalhesFormatado.length}
          hideFooter={true}
        />
      </div>
    </Dialog>
  );
}

const mapStateToProps = (store) => ({
  State: store.VendaState,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      SetColetaCarga
    }
    , dispatch
  )

export const DetalhesModal = connect(mapStateToProps, mapDispatchToProps)(DetalhesModalWithRedux);

const useStyles = makeStyles((theme) => ({
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #18a0fb',
    borderRadius: '5px',
    color: '#18a0fb',
    backgroundColor: '#fff',
    padding: '10px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 8px',
    minWidth: '200px',
    maxWidth: '416px',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
    width: '100%',
  },
  sectionColumn: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-around",
    alignItems: "center",

    '@media (min-width: 1080px)': {
      width: '1080px'
    }
  },
  sectionRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  datagrid: {
    width: '100%',
    '@media (min-width: 1080px)': {
      width: '1080px'
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fromProps2Datagrid = (detalhes) => {
  const aux = [];

  if (Array.isArray(detalhes)) {
    detalhes.forEach((item) => {
      aux.push({
        id: item.PvpSel,
        Cont: item.FfdPago,
        Cons: item.FfdQtdFaturar,
        Prod: item.Produto,
        Prec1: item.PvpVvn1,
        Prec2: item.PvpVvn2,
      });
    });
  }

  return aux;
};

const columns = [
  { field: "id", headerName: "Seleção", type: "number", width: 80, editable: false, sortable: false },
  // { field: "Cont", headerName: "Contador", type: "number", width: 90, editable: false, sortable: false },
  { field: "Cons", headerName: "Consumo", type: "number", width: 90, editable: false, sortable: false },
  { field: "Prod", headerName: "Produto", flex: 1, editable: false, sortable: false },
  {
    field: "Prec1",
    headerName: "Preço 1",
    width: 80,
    editable: false,
    sortable: false,
    renderCell: (params) => String(Number(params.value).toFixed(2)).replace('.', ','),
  },
  {
    field: "Prec2",
    headerName: "Preço 2",
    width: 80,
    editable: false,
    sortable: false,
    renderCell: (params) => Number(params.value).toFixed(2).replace('.', ','),
  },
]