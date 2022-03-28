import React from 'react';
import { Slider, Slide, Caption } from "react-materialize";

import { Button } from '@material-ui/core'

// import news from "../../assets/news.jpg";
// import wall from "../../assets/black-white-wall.jpg";
// import { RED_PRIMARY, GREY_SECONDARY } from '../../misc/colors'
// import { NewsDialog } from './dialogs/NewsDialog'
import { BoxTitle } from '../../components/commom_in'

function News({ onOpenModal, News }) {
    return (
      <Slider
        fullscreen={false}
        options={{
          duration: 500,
          height: 600,
          indicators: true,
          interval: 6000,
        }}
      >
        {News.map(n => (
          <Slide
            key={n.NewsId}
            image={
              <img
                alt=""
                src={`https://source.unsplash.com/1280x720/?coffee/${n.NewsId}`}
              // src={`https://source.unsplash.com/random/1280x720?sig=${n.NewsId}`}
              />
            }
          >
            <Caption
              placement={n.BannerAlign}
            >
              <BoxTitle>
                <h3>{n.BannerTitle}</h3>
                <h5>
                  {n.BannerDescription}
                </h5>
              </BoxTitle>
              {n.ModalContent !== null ?
                <Button
                  style={{
                    margin: '100px 0px 0px 0px'
                  }}
                  onClick={() => onOpenModal(n)}
                  variant='contained'
                  color='primary'
                >
                  Saiba mais
                </Button>
                :
                null
              }
            </Caption>
          </Slide>
        ))}
        {/* <Slide
        image={
          <img alt="" src={news} />
        }
      >
        <Caption
          placement="left"
        >
          <h3
            style={{
              color: RED_PRIMARY,
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >PDF de venda disponível</h3>
          <h5
            style={{
              color: GREY_SECONDARY,
            }}
            className="light grey-text text-lighten-3"
          >
            O PDF com os detalhes da venda já pode ser gerado pela tela de Vendas!
          </h5>
        </Caption>
      </Slide>
      <Slide
        image={
          <img alt="" src={wall} />
        }
      >
        <Caption
          placement="left"
        >
          <h3
            style={{
              color: 'yellow',
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            Em breve...
          </h3>
          <h5
            style={{
              color: '#FFF',
            }}
          >
            ¤ Tela de Clientes
          </h5>
          <h5
            style={{
              color: '#FFF',
            }}
          >
            ¤ Nova VPN
          </h5>
          <h5
            style={{
              color: '#FFF',
            }}
          >
            ¤ Otimização de telas para o mobile
          </h5>
        </Caption>
      </Slide> */}
        {/* <Slide image={<img alt="" src={brown} />}>
        <Caption
          placement="right"
        >
          <h3>Nova VPN Pilao Professional</h3>
          <h5 className="light grey-text text-lighten-3">
            A atualização de VPN para acesso a rede Pilão Professional entra em vigor a partir do dia XX/XX/2022
          </h5>
          <Button
            style={{
              margin: '100px 0px 0px 0px'
            }}
            onClick={onOpen}
            variant='contained'
            color='secondary'
          >
            Saiba mais
          </Button>
        </Caption>
      </Slide> */}
      </Slider>
    );
  }

export default News;
