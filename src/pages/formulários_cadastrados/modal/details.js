import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { api } from '../../../services/api';

import { Visibility, GetApp, Close } from '@material-ui/icons'
import {
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Dialog,
  Button
} from '@material-ui/core/'

import { GREY_SECONDARY } from '../../../misc/colors'
import { Toast } from '../../../components/toasty'

const Modalzinho = (props) => {
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    function loadData() {
      if (props.form) {
        setForm(props.form);
      }
    }

    loadData();
  }, [props.form])

  const handleDownloadPDF = async () => {
    let toastId = null
    try {
      toastId = Toast('Buscando...', 'wait')

      const response = await api.get(`/form/pdf/${form.CodCandidato}`, {
        responseType: "arraybuffer",
      })

      Toast('Encontrado!', 'update', toastId, 'success')

      //Converto a String do PDF para BLOB (Necessario pra salvar em pdf)
      const blob = new Blob([response.data], { type: "application/pdf" });

      //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
      saveAs(blob, `Form_${form.CodCandidato}_${new Date().getTime()}.pdf`);
    } catch (err) {
      Toast('Falha ao recuperar PDF do servidor', 'update', toastId, 'error')
    }
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => setOpen(true)}
        disabled={!props.preenchido}
      >
        <Visibility />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
            <Button
              color="inherit"
              onClick={() => handleDownloadPDF()}
            >
              Baixar PDF
            </Button>
          </Toolbar>
        </AppBar>
        <div className="YAlign">
          <div style={divAlinha}>
            <div style={divColuna}>

              <div style={divMetade}>
                <h5>Dados Pessoais</h5>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Nome Completo: <strong style={{ color: 'red' }}>{form.NomeCompleto}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Data de Nascimento: <strong style={{ color: 'red' }}>{form.DtNascimento}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>RG: <strong style={{ color: 'red' }}>{form.RG}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>CPF: <strong style={{ color: 'red' }}>{form.CPF}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Logradouro: <strong style={{ color: 'red' }}>{form.Logradouro}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>Número: <strong style={{ color: 'red' }}>{form.Número}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Complemento: <strong style={{ color: 'red' }}>{form.Complemento}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>Bairro: <strong style={{ color: 'red' }}>{form.Bairro}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>Município: <strong style={{ color: 'red' }}>{form.Municipio}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>Estado: <strong style={{ color: 'red' }}>{form.Estado}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>CEP: <strong style={{ color: 'red' }}>{form.CEP}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>Email: <strong style={{ color: 'red' }}>{form.Email}</strong></Typography>
                </div>
                {form.TelResidencial === null || form.TelResidencial === '' ? null : (
                  <div style={divLinha}>
                    <Typography gutterBottom>
                      Telefone Residencial: <strong style={{ color: 'red' }}>{form.TelResidencial}</strong>
                    </Typography>
                  </div>
                )}

                {form.Celular === null || form.Celular === '' ? null : (

                  <div style={divLinha}>
                    <Typography gutterBottom>Celular: <strong style={{ color: 'red' }}>{form.Celular}</strong></Typography>
                  </div>
                )}

              </div>

              <div style={divMetade}>
                <h5>Rendimento e Experiencia</h5>
                <div style={divLinha}>
                  <Typography gutterBottom>Profissão: <strong style={{ color: 'red' }}>{form.Profissao}</strong></Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>Vinculo CLT: <strong style={{ color: 'red' }}>{form.CLT}</strong></Typography>
                </div>
                {form.CLT === 'Sim' ? (
                  <div style={divLinha}>
                    <Typography gutterBottom>
                      Rendimento Mensal: <strong style={{ color: 'red' }}>{form.RendMensal}</strong>
                    </Typography>
                  </div>
                ) : null}

                <div style={divLinha}>
                  <Typography gutterBottom>
                    Rec. de Imposto no Último ano: <strong style={{ color: 'red' }}>{form.PRecolhimento}</strong>
                  </Typography>
                </div>
                {form.PRecolhimento === 'Sim' ? (
                  <div style={divLinha}>
                    <Typography gutterBottom>
                      Valor do recolhimento: <strong style={{ color: 'red' }}>{form.QRecolhimento}</strong>
                    </Typography>
                  </div>
                ) : null}

                <div style={divLinha}>
                  <Typography gutterBottom>
                    Origem do capital: <strong style={{ color: 'red' }}>{form.OrigemCapital}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Renda Familiar: <strong style={{ color: 'red' }}>{form.RendaFamiliar}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Composição da Renda Familiar: <strong style={{ color: 'red' }}>{form.CRendaFamiliar}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Total Disponivel para Investimento:{" "}
                    <strong style={{ color: 'red' }}>{form.DispInvest}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Tem/Teve empresa própria e experiência como autônomo:{" "}
                    <strong style={{ color: 'red' }}>{form.TEmpresaExp}</strong>
                  </Typography>
                </div>
                {form.TEmpresaExp === 'Sim' ? (
                  <div style={divLinha}>
                    <Typography gutterBottom>
                      Detalhes da empresa: <strong style={{ color: 'red' }}>{form.EspcEmpresa}</strong>
                    </Typography>
                  </div>
                ) : null}

                <div style={divLinha}>
                  <Typography gutterBottom>
                    Formação Escolar: <strong style={{ color: 'red' }}>{form.FormEscolar}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Últimas experiencias profissionais: <strong style={{ color: 'red' }}>{form.UltExp}</strong>
                  </Typography>
                </div>
              </div>

              <div style={divMetade}>
                <h5>Franquia</h5>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Expectativa de retorno: <strong style={{ color: 'red' }}>{form.ExpectRetorno} meses</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Existe disponibilidade de capital para um eventual
                    investimento parcial mensal que complemente as despesas da
                    franquia: <strong style={{ color: 'red' }}>{form.InvestMenInic}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Como conheceu a Pilão Professional:{" "}
                    <strong style={{ color: 'red' }}>{form.ConhecPilao}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Qual característica do negócio mais pesou na escolha da Pilão
                    Professional: <strong style={{ color: 'red' }}>{form.CaracEscolha}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Está disposto(a) a cumprir as regras estabelecidas pela
                    franqueadora: <strong style={{ color: 'red' }}>{form.ConcRegras}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Está preparado para os primeiros meses com baixa média de
                    retorno: <strong style={{ color: 'red' }}>{form.LucroMin}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Se compromete a informar a franqueadora sobre o que for
                    solicitado: <strong style={{ color: 'red' }}>{form.CompInformar}</strong>
                  </Typography>
                </div>
              </div>

              <div style={divMetade}>
                <h5>Consultor referência</h5>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    {form.Consultor === '' || form.Consultor === null ? 'Não informado' : form.Consultor}
                  </Typography>
                </div>
              </div>

            </div>

            <div style={divColuna}>

              <div style={divMetade}>
                <h5>Estado civil e Familia</h5>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Estado Civil: <strong style={{ color: 'red' }}>{form.EstCivil}</strong>
                  </Typography>
                </div>

                {form.EstCivil !== 'Casado(Comunhão Universal)' && form.EstCivil !== 'Casado(Comunhão Parcial)' && form.EstCivil !== 'Casado(Separação Total)' ? null : (
                  <>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Nome Conjuge: <strong style={{ color: 'red' }}>{form.NomeConj}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Data de Nascimento: <strong style={{ color: 'red' }}>{form.DtNascConj}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>RG: <strong style={{ color: 'red' }}>{form.RGConj}</strong></Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>CPF: <strong style={{ color: 'red' }}>{form.CPFConj}</strong></Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Tempo de União: <strong style={{ color: 'red' }}>{form.TempoUni}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Rendimento Mensal: <strong style={{ color: 'red' }}>{form.RendMenConj}</strong>
                      </Typography>
                    </div>
                  </>
                )}

                <div style={divLinha}>
                  <Typography gutterBottom>
                    Possui Filhos: <strong style={{ color: 'red' }}>{form.PFilhos}</strong>
                  </Typography>
                </div>
                {form.PFilhos === 'Não' ? null : (
                  <>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Número de Filhos: <strong style={{ color: 'red' }}>{form.QFilhos}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Idade(s) do(s) filho(s): <strong style={{ color: 'red' }}>{form.IFilhos}</strong>
                      </Typography>
                    </div>
                  </>
                )}
              </div>

              <div style={divMetade}>
                <h5>Sócio</h5>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Haverá Sociedade: <strong style={{ color: 'red' }}>{form.HavSociedade}</strong>
                  </Typography>
                </div>
                {form.HavSociedade === 'Não' ? null : (
                  <>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Nome do Sócio: <strong style={{ color: 'red' }}>{form.NomeSocio}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Tipo de Vinculo com Sócio: <strong style={{ color: 'red' }}>{form.VincSocio}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        A quanto tempo se conhecem: <strong style={{ color: 'red' }}>{form.TempConhece}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        O que já realizaram juntos: <strong style={{ color: 'red' }}>{form.Realizacoes}</strong>
                      </Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>Tipo de Sócio: <strong style={{ color: 'red' }}>{form.TSocio}</strong></Typography>
                    </div>
                    <div style={divLinha}>
                      <Typography gutterBottom>
                        Sócio participará do investimento:{" "}
                        <strong style={{ color: 'red' }}>{form.SocioInvest}</strong>
                      </Typography>
                    </div>
                    {form.SocioInvest === 'Não' ? null : (
                      <div style={divLinha}>
                        <Typography gutterBottom>
                          Proporção de participação: <strong style={{ color: 'red' }}>{form.InvestProp}</strong>
                        </Typography>
                      </div>
                    )}
                  </>
                )}
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Já teve empreendimento em sociedade:{" "}
                    <strong style={{ color: 'red' }}>{form.TeveSociedade}</strong>
                  </Typography>
                </div>
                {form.TeveSociedade === 'Não' ? null : (
                  <div style={divLinha}>
                    <Typography gutterBottom>
                      Como foi a experiencia: <strong style={{ color: 'red' }}>{form.SociedadeExp}</strong>
                    </Typography>
                  </div>
                )}
              </div>

              <div style={divMetade}>
                <h5>Bens</h5>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Residencia: <strong style={{ color: 'red' }}>{form.TResidencia}</strong>
                  </Typography>
                </div>
                {form.TResidencia === 'Alugada' || form.TResidencia === 'Financiada' ? (
                  <div style={divLinha}>
                    <Typography gutterBottom>
                      Custo mensal: <strong style={{ color: 'red' }}>{form.ValResidencia}</strong>
                    </Typography>
                  </div>
                ) : null}

                <div style={divLinha}>
                  <Typography gutterBottom>
                    Possui Veículo: <strong style={{ color: 'red' }}>{form.PVeiculo}</strong>
                  </Typography>
                </div>
                <div style={divLinha}>
                  <Typography gutterBottom>
                    Possui Imóvel: <strong style={{ color: 'red' }}>{form.PImovel}</strong>
                  </Typography>
                </div>
              </div>

              <div style={{
                display: "flex",
                width: "100%",
                padding: "1vw",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                border: "1px solid #c1c1c1",
              }}>
                <h5>Prioridades</h5>
                {afirmacoes.map((afirmacao, index) => (
                  <div
                    style={divStyle}
                    key={index}
                  >
                    <input
                      disabled
                      id={index}
                      value={String(form.Notas).split(',')[index]}
                      maxLength={2}
                      style={inputStyle}
                      type="text"
                    />
                    <Typography>
                      {afirmacao}
                    </Typography>
                  </div>
                ))}
              </div>

              <div style={divMetade}>
                <h5>Arquivos</h5>
                <Button
                  icon={<GetApp />}
                  disabled
                  variant='contained'
                  color='primary'
                >
                  Baixar documentos
                </Button>
                <Typography>Local: X:\Franquia\SLWEB\DOCS\{form.CodCandidato}</Typography>
              </div>

            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Modalzinho

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const afirmacoes = [
  'Serviço de apoio prestado da franqueadora.',
  'Investimento. A equação financeira entre o quanto é investido e o tempo que demora e haver o retorno desse valor.',
  'Status. Reconhecimento social que ganhará tornando-se um franqueado Pilão Professional.',
  'Afinidade com a marca Pilão.',
  'Lucratividade. Quanto é o potencial de lucro mensal.',
  'Segurança e solidez. Garantidas pelos fatos de ser uma empresa líder no segmento.',
  'Afinidade com o produto café.',
  'Pelos conceitos, valores e cultura (transparência, afetividade, seriedade, etc); percebidos durante o processo de conhecimento da franquia.',
  'Força comercial da marca. Pelo tanto que a marca é conhecida pelo consumidor, faz propagandas e terá capacidade de gerar vendas nas unidades franqueadas.',
  'Indicação de um amigo ou conhecido.',
  'Referências positivas de franqueado(s) da rede Pilão Professional.',
]

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: GREY_SECONDARY,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    marginLeft: "8px",
    marginBottom: "8px",
    height: "54px",
  },
}));

const divLinha = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
};

const divAlinha = {
  display: "flex",
  flex: 1,
  width: "100%",
  flexDirection: "row",
  flexWrap: 'wrap',
  justifyContent: "center",
  alignItems: "fle-start",
};

const divMetade = {
  display: "flex",
  width: "100%",
  padding: "1vw",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  border: "1px solid #c1c1c1",
};

const divColuna = {
  display: "flex",
  width: "50%",
  minWidth: "400px",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "flex-start",
};

const divStyle = {
  display: "Flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginBottom: "2%",
};

const inputStyle = {
  width: "20px",
  textAlign: "center",
  height: "unset",
  border: "1px solid #9e9e9e",
  marginRight: "10px",
  color: 'red',
  fontWeight: 'bold',
};