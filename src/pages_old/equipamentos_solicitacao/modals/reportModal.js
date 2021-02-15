import React from 'react'

import { Rotulo, Campo } from '../../../components/commom_in'

export default class ReactModal extends React.Component {
  state = {
    log: this.props.log
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <Campo>
          <Rotulo>
            {`Destino escolhido para entrega: ${this.state.log.OSCDestino}`}
          </Rotulo>
        </Campo>

        <strong>Máquina</strong>

        <Campo>
          <Rotulo>
            {this.state.log.OSCMaquina === null ||
            this.state.log.OSCMaquina === ''
              ? 'Nenhuma máquina foi solicitada.'
              : `Tipo de máquina solicitada: ${this.state.log.OSCMaquina}`}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {this.state.log.OSCGabinete === null ||
            this.state.log.OSCGabinete === ''
              ? 'Nenhum gabinete foi solicitado.'
              : `Tipo de gabinete solicitado: ${this.state.log.OSCGabinete}`}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {this.state.log.OSCBebidas === null ||
            this.state.log.OSCBebidas === ''
              ? 'Nenhuma bebida foi solicitada'
              : this.state.log.OSCBebidas}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {this.state.log.OSCSistHidrico === null ||
            this.state.log.OSCSistHidrico === ''
              ? 'Nenhuma sistema hídrico escolhido'
              : `Sistema de abastecimento hídrico escolhido: ${this.state.log.OSCSistHidrico}`}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {this.state.log.OSCIdVisual === null ||
            this.state.log.OSCIdVisual === ''
              ? 'Nenhuma identidade visual escolhida'
              : `Identidade visual escolhida: ${this.state.log.OSCIdVisual}`}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {this.state.log.OSCSistPagto === null ||
            Number(this.state.log.OSCSistPagto) === 0
              ? 'Nenhum sistema de pagamento solicitado'
              : `Sistema de pagamento solicitado: ${this.state.log.OSCSistPagto}`}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {Number(this.state.log.OSCMoedeiro) === 1
              ? 'Moedeiro solicitado: Sim'
              : 'Moedeiro solicitado: Não'}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {Number(this.state.log.OSCTelemetria) === 1
              ? 'Telemetria solicitada: Sim'
              : 'Telemetria solicitada: Não'}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {Number(this.state.log.OSCValidador) === 1
              ? 'Validador solicitado: Sim'
              : 'Validador solicitado: Não'}
          </Rotulo>
        </Campo>

        <strong>Acessórios</strong>

        <Campo>
          <Rotulo>
            {Number(this.state.log.OSCKitFiltro) === 1
              ? 'Kit de filtro solicitado: Sim'
              : 'Kit de filtro solicitado: Não'}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {Number(this.state.log.OSCTransformador) === 1
              ? 'Transformador solicitado: Sim'
              : 'Transformador solicitado: Não'}
          </Rotulo>
        </Campo>

        <Campo>
          <Rotulo>
            {Number(this.state.log.OSCEstabilizador) === 1
              ? 'Estabilizador solicitado: Sim'
              : 'Estabilizador solicitado: Não'}
          </Rotulo>
        </Campo>
      </>
    )
  }
}
