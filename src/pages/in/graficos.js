import { Chart } from 'react-google-charts'
import React from 'react'
import { Combobox } from '../../components/commom_in'
import Loading from '../../components/loading_screen'

const titulo = {
  title: 'Produtos mais vendidos',
  pieHole: 0.2,
  is3d: true
}

const data = [
  ['Produtos', 'Itens mais consumidos'],
  ['Chocolate', 11],
  ['Cha', 2],
  ['Café expresso longo', 2],
  ['Café expresso', 2],
  ['Capuccino', 7]
]

class graficos extends React.Component {
  render() {
    return (
      <>
        <Combobox>
          <div className='App'>
            <Chart
              chartType='PieChart'
              width='600px'
              height='350px'
              data={data}
              options={titulo}
            />
          </div>
          <div className='App'>
            <Chart
              chartType='PieChart'
              width='600px'
              height='350px'
              data={data}
              options={titulo}
            />
          </div>
        </Combobox>
        <Combobox>
          <Chart
            width={'1200px'}
            height={'400px'}
            chartType='AreaChart'
            loader={<Loading />}
            data={[
              ['Mes', 'Vendas'],
              ['Jan ', 100],
              ['Fev', 1170],
              ['Mar', 660],
              ['Abr', 1030],
              ['Mai', 1500],
              ['Jun', 1000],
              ['Jul', 200],
              ['Ago', 1000],
              ['Set', 1200],
              ['Out', 0],
              ['Nov', 230],
              ['Dez', 831]
            ]}
            options={{
              title: 'Faturamento',
              hAxis: { title: 'Mes', titleTextStyle: { color: '#000' } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: '50%', height: '70%' }
              // lineWidth: 25
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
          />
        </Combobox>
      </>
    )
  }
}

export default graficos
