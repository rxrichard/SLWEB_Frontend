import React from 'react'

//Meio de comunicação
import { api } from '../../services/api'
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Panel, Container } from '../../components/commom_in'
import { Table } from '../../components/table'
import { GoBack } from '../../components/buttons'
import { Toast } from '../../components/toasty'

export default class Franquia extends React.Component {

    state = {
        loaded: false,
        franqueados: [],
        usersListFiltered: []
    }

    async componentDidMount() {

        try {
            //requisição inicial para obter dados essenciais da pagina
            const response = await api.get('/administrar/franquia')

            if (response.status === 200) {
                this.setState({ loaded: true, franqueados: response.data })
            } else {
                throw Error
            }
        } catch (err) {
            Toast('Falha ao trazer as informações das franquias', 'error')
        }


    }

    Filter(value, event) {
        this.setState({ usersListFiltered: this.state.usersList })
        event.target.value = value.toUpperCase()
        value = value.toUpperCase()
    
        if (value === '') {
          this.setState({ usersListFiltered: this.state.usersList })
          return
        }
    
        if (value.length > 4) {
          event.target.value = value.slice(0, 4)
          value = value.slice(0, 4)
        }
    
        this.setState({ usersListFiltered: this.state.usersList })
        let aux = []
        let newArray = []
        aux = [...this.state.usersList]
        
        for (let i = 0; i < aux.length; i++) {
          if (aux[i].M0_CODFIL.slice(0, value.length) === value) {
            newArray.push(aux[i])
          }
        }
        
        this.setState({ usersListFiltered: newArray })
      }

    render() {
        return !this.state.loaded ? (
            <Loading />
        ) : (
                <Container>
                    <Panel>
                        <Table>
                            <thead>
                                <th>Tendência</th>
                                <th>Emite NF.</th>
                                <th>UF</th>
                                <th>Consultor</th>
                                <th>Filial</th>
                                <th>Min. Compra</th>
                                <th>Franqueado</th>
                                <th>CodCli</th>
                                <th>Loja</th>
                                <th>Email</th>
                            </thead>
                            <tbody>
                                {this.state.franqueados.map(franq => (
                                    <tr>
                                        <td>{franq.STATUS}</td>
                                        <td>{franq.EmiteNF}</td>
                                        <td>{franq.UF}</td>
                                        <td>{franq.Consultor}</td>
                                        <td>{franq.M0_CODFIL}</td>
                                        <td>R$ {franq.VlrMinCompra}</td>
                                        <td>{franq.GrupoVenda}</td>
                                        <td>{franq.A1_COD}</td>
                                        <td>{franq.A1_LOJA}</td>
                                        <td>{franq.Email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Panel>
                    <GoBack />
                    {/* <input onChange={e => this.Filter(e.target.value, e)} type='text' style={{ width: '50px' }} placeholder='Filial...' /> */}
                </Container>
            )
    }
}