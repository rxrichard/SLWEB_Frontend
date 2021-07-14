import React from 'react'

//Meio de comunicação
import { api } from '../../services/api'
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Panel, Container } from '../../components/commom_in'
import { Toast } from '../../components/toasty'

export default class Exemplo extends React.Component {

    state = {
        loaded: false
    }

    async componentDidMount() {

        try {
            //requisição inicial para obter dados essenciais da pagina
            const response = await api.get('')

            if (response.status === 200) {
                this.setState({ loaded: true })
            } else {
                throw Error
            }
        } catch (err) {
            Toast('Falha', 'error')
        }


    }

    render() {
        return !this.state.loaded ? (
            <Loading />
        ) : (
                <Container>
                    <Panel>

                    </Panel>
                </Container>
            )
    }
}