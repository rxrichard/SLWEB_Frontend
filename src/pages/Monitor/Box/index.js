import React from "react";
import moment from 'moment'
import { useHistory } from 'react-router-dom'

import {
  Typography,
  Button,
  IconButton,
  Tooltip
} from '@material-ui/core'

import {
  Storefront as StorefrontIcon,
  EmojiFoodBeverage as EmojiFoodBeverageIcon,
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'

import {
  Card,
  TopInfoLabel,
  FirstHalf,
  StateInfoText,
  SecondHalf,
  TelemetryInfo,
  Footer,
  CabContainer,
  ButtonContainer,
  TableCell,
  TableRow,
  TableHeader
} from "./style";

export const MachineCard = ({ Telemetria, onOpenChamadoComponent, onOpenDetailsComponent }) => {
  const history = useHistory()

  return (
    <Card>
      <TopInfoLabel state={String(Telemetria.LeitOk).trim()} />
      <FirstHalf>
        <CabContainer>
          <Typography
            variant='body1'
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <strong>{Telemetria.AnxDesc}</strong>
          </Typography>
          <Typography variant='subtitle1'>
            Ativo: {String(Telemetria.EquiCod).trim()}
          </Typography>
        </CabContainer>
        <ButtonContainer>
          <Tooltip title={ <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} > Ponto de Venda </label> } placement="top" arrow={true} >
            <Button style={{ margin: '4px 0px 0px 0px' }} variant='outlined' color='secondary' disabled={true} onClick={() => { }} size="small" >
              <StorefrontIcon />
            </Button>
          </Tooltip>
          <Tooltip title={ <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} > Consulta Coletas </label> } placement="top" arrow={true} >
            <Button style={{ margin: '4px 0px 0px 0px' }} variant='outlined' color='primary' disabled={false} onClick={() => history.push(`/leituras/${Telemetria.EquiCod}`)} size="small" >
              <EmojiFoodBeverageIcon />
            </Button>
          </Tooltip>
        </ButtonContainer>
      </FirstHalf>
      <StateInfoText state={String(Telemetria.LeitOk).trim()}>
        <i>{String(Telemetria.LeitOk).trim() === 'OK' ? 'Online' : Telemetria.MáxDeDataLeitura !== null ? `Última leitura em ${moment(Telemetria.MáxDeDataLeitura).format('DD/MM/YYYY HH:mm:ss')}` : 'Nenhuma leitura recebida'}</i>
      </StateInfoText>
      <SecondHalf>
        <TelemetryInfo>
          <table>
            <TableRow>
              <TableHeader>Periodo</TableHeader>
              <TableHeader>Doses</TableHeader>
            </TableRow>
            <TableRow>
              <TableCell>Esta semana</TableCell>
              <TableCell>{Telemetria.Prd !== null ? Telemetria.Prd : '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Uma semana</TableCell>
              <TableCell>{Telemetria.Prd1 !== null ? Telemetria.Prd1 : '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Duas semanas</TableCell>
              <TableCell>{Telemetria.Prd2 !== null ? Telemetria.Prd2 : '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Três semanas</TableCell>
              <TableCell>{Telemetria.Prd3 !== null ? Telemetria.Prd3 : '-'}</TableCell>
            </TableRow>
          </table>
        </TelemetryInfo>
        <Button
          onClick={() => onOpenChamadoComponent(Telemetria)}
          variant='contained'
          color='primary'
          disabled={String(Telemetria.LeitOk).trim() !== 'KO'}
          size='small'
          style={{
            margin: '8px 0px 0px 8px',
            width: '100px'
          }}
        >
          ABRIR CHAMADO TELEMETRIA
        </Button>
      </SecondHalf>
      <Footer>
        <IconButton onClick={() => onOpenDetailsComponent(Telemetria)}>
          <MoreHorizIcon />
        </IconButton>
      </Footer>
    </Card>
  )
}
