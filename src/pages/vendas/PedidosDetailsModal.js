import React, { useState } from 'react';
import Draggable from "react-draggable";
import { api } from "../../services/api";
import { saveAs } from "file-saver";

import { Close, GetApp, NoteAdd, HourglassEmpty, Block, Edit } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";

import { Toast } from "../../components/toasty";
import Select from "../../components/materialComponents/Select";

export const DetailsModal = ({ pedidoDet, open, actualPedidoInfo, setActualPedidoInfo, setPedidos, setPedidoDet, setOpen }) => {
    const [wait, setWait] = useState(false);
    const [doctype, setDoctype] = useState("DANFE");

    const handleCloseDialog = () => {
        setActualPedidoInfo({});
        setPedidoDet([]);
        setOpen(false);
        setDoctype('DANFE')
    };

    const extraControls = (status) => {
        switch (status) {
            case 'F':
                return (
                    <>
                        <Select
                            onChange={(e) => setDoctype(e.target.value)}
                            value={doctype}
                            disabled={false}
                            label="Documento"
                            variant='outlined'
                        >
                            <MenuItem value="DANFE">DANFE</MenuItem>
                            <MenuItem value="XML">XML</MenuItem>
                            <MenuItem value="CANCELAMENTO">Cancelamento</MenuItem>
                            <MenuItem value="CC">Carta de Correção</MenuItem>
                        </Select>
                        <Tooltip
                            title={
                                <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                                    Baixar
                                </label>
                            }
                            placement="top"
                            arrow
                            followCursor
                        >
                            <IconButton
                                disabled={wait}
                                onClick={() => handleRecoverDOC(actualPedidoInfo, doctype)}
                                color="primary"
                            >
                                <GetApp />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            case 'P':
                return (
                    <>
                        <Tooltip
                            title={
                                <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                                    Cancelar Pedido
                                </label>
                            }
                            placement="top"
                            arrow
                            followCursor
                        >
                            <IconButton disabled={wait} onClick={() => handleCancel()} color="primary">
                                <Block />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                                    Editar Venda
                                </label>
                            }
                            placement="top"
                            arrow
                            followCursor
                        >
                            <IconButton disabled={wait} onClick={() => handleEditVenda()} color="secondary">
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                                    Solicitar NFe
                                </label>
                            }
                            placement="top"
                            arrow
                            followCursor
                        >
                            <IconButton disabled={wait} onClick={() => handleRequestNFE()} color="primary">
                                <NoteAdd />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            case 'S':
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <HourglassEmpty />
                        <Typography variant='subtitle2'>Gerando NFe...</Typography>
                    </div>
                )
            default:
                return
        }
    }

    const handleRecoverDOC = async (pedido, doctype) => {
        if (doctype === '') {
            Toast('Selecione um tipo de documento')
            return
        }

        let configs = selectDocConfigs(doctype);

        setWait(true);
        try {
            const response = await api.get(
                `/vendas/pedidos/detalhes/DOCS/${doctype}/${pedido.Serie_Pvc}/${pedido.Pvc_ID}`,
                {
                    responseType: "arraybuffer",
                }
            );

            //quando não encontra o documento retorna um arraybuffer de 5 bytes(false)
            if (response.data.byteLength > 5) {
                //Converto a String do PDF para BLOB (Necessario pra salvar em pdf)
                const blob = new Blob([response.data], { type: configs.appType });

                //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
                saveAs(blob, `NFe_${pedido.DOC}_${configs.sulfix}.${configs.ext}`);

                setWait(false);
            } else {
                Toast('Nenhum documento encontrado', 'error')
                setWait(false);
            }
        } catch (err) {
            setWait(false);
            console.log(err);
        }
    };

    const handleEditVenda = () => {
        alert("iniciar edição da venda(trocar colums do datagrid)");
    };

    const handleRequestNFE = () => {
        alert("solicitar NFe atravéz do Nasajonson");
    };

    const handleCancel = async () => {
        setWait(true)
        try {
            await api.put(`/vendas/pedidos/cancelar/${actualPedidoInfo.Serie_Pvc}/${actualPedidoInfo.Pvc_ID}`)

            Toast('Venda cancelada', 'success')
            setOpen(false)
            setWait(false)
            setPedidos(previousState => {
                let index = null
                let aux = [...previousState]

                aux.forEach((pedido, i) => {
                    if (pedido.Serie_Pvc === actualPedidoInfo.Serie_Pvc && pedido.Pvc_ID === actualPedidoInfo.Pvc_ID) {
                        index = i
                    }
                })

                if (index !== null) {
                    aux[index].ST = 'C'
                }

                return aux
            })
        } catch (err) {
            setWait(false)
            Toast('Não foi possivel cancelar a venda', 'error')
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => handleCloseDialog()}
            keepMounted={false}
            PaperComponent={PaperComponent}
            TransitionComponent={Transition}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                Detalhes da Venda
            </DialogTitle>
            <DialogContent>
                <div className="XAlign" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: '8px' }}>

                    <Typography gutterBottom variant="subtitle1">
                        {PedidoDesc(String(actualPedidoInfo.Tipo).trim(), actualPedidoInfo.ST, actualPedidoInfo["Nome Fantasia"], actualPedidoInfo.Emissao)}
                    </Typography>

                    <div
                        style={{ all: "unset", display: "flex", flexDirection: "row" }}
                    >
                        {extraControls(actualPedidoInfo.ST)}



                    </div>
                </div>
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={PedidoDetToDatagrid(pedidoDet)}
                        columns={columns}
                        pageSize={5}
                        disableSelectionOnClick
                        disableColumnMenu
                        hideFooter={pedidoDet.length > 5 ? false : true}
                        loading={pedidoDet.length === 0}
                    />
                </div>
            </DialogContent >
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleCloseDialog}
                    startIcon={<Close />}
                    disabled={wait}
                >
                    Fechar
                </Button>
            </DialogActions>
        </Dialog >
    )
}

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} style={{ width: "100%", maxWidth: "900px" }} />
        </Draggable>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow {...props} />;
});

const PedidoDesc = (tipo, status, cliente, emissão) => {
    console.log(tipo)
    let Desc = "";

    if (status === 'S') {
        Desc = Desc.concat("Solicitada a nota para a ");
    }

    switch (tipo) {
        case "V":
            Desc = Desc.concat("Venda ");
            break;
        case "R":
            Desc = Desc.concat("Remessa ");
            break;
        case "B":
            Desc = Desc.concat("Bonificação ");
            break;
        default:
            break;
    }

    switch (status) {
        case "F":
            Desc = Desc.concat("faturada para ");
            break;
        case "P":
            Desc = Desc.concat("registrada para ");
            break;
        case "C":
            Desc = Desc.concat("para ");
            break;
        default:
            break;
    }

    if (status === 'S') {
        Desc = Desc.concat(`de ${cliente}`);
    } else if (status === 'C') {
        Desc = Desc.concat(` ${cliente} cancelada`);
    } else {

        Desc = Desc.concat(` ${cliente}`);
    }

    // if (status === 'F' || status === 'P') {
    //     Desc = Desc.concat(` em ${moment(emissão).format("LL")}`);
    // }

    return Desc;
};

const columns = [
    {
        field: "index",
        headerName: "Item",
        width: 90,
        editable: false,
        align: "center",
    },
    { field: "id", headerName: "Cód", width: 80, editable: false },
    {
        field: "Produto",
        headerName: "Produto",
        flex: 1,
        editable: false,
    },
    {
        field: "PvdQtd",
        headerName: "Qtd.",
        width: 60,
        editable: false,
        sortable: false,
        align: "right",
    },
    {
        field: "PvdVlrUnit",
        headerName: "Vlr. Un.",
        width: 90,
        editable: false,
        sortable: false,
        align: "right",
    },
    {
        field: "PvdVlrTotal",
        headerName: "Vlr. Total",
        width: 90,
        editable: false,
        sortable: false,
        align: "right",
    },
];

const PedidoDetToDatagrid = (pedidoDet) => {
    let aux = [];
    pedidoDet.map((det) =>
        aux.push({
            index: det.PvdID,
            id: det.ProdId,
            Produto: det.Produto,
            PvdQtd: det.PvdQtd,
            PvdVlrUnit: det.PvdVlrUnit,
            PvdVlrTotal: det.PvdVlrTotal,
        })
    );

    return aux;
};

const selectDocConfigs = (doctype) => {
    switch (doctype) {
        case "DANFE":
            return {
                ext: 'pdf',
                sulfix: doctype,
                appType: "application/pdf",
            };
        case "XML" || "CANCELAMENTO" || "CC":
            return {
                ext: 'xml',
                sulfix: doctype,
                appType: "text/xml",
            };
        case "CANCELAMENTO":
            return {
                ext: 'xml',
                sulfix: doctype,
                appType: "text/xml",
            };
        case "CC":
            return {
                ext: 'xml',
                sulfix: doctype,
                appType: "text/xml",
            };

        default:
            return null;
    }
}

// Antiga função pra baixar NFe que eu convertia Buffer pra ArrayBuffer depois de receber a resposta e não automaticamente com o Axios
  // const handleRecoverNFE = async (pedido) => {
  //   setWait(true)
  //   try {
  //     const response = await api.get(`/vendas/pedidos/detalhes/DANFE/${pedido.Serie_Pvc}/${pedido.Pvc_ID}`)
  //     /*Os arquivos sao retornados em formato Buffer,
  //     preciso convertelos para ArrayBuffer antes de fazer o blob*/

  //     const danfeArrayBuffer = toArrayBuffer(response.data.DANFE.data)
  //     const xmlArrayBuffer = toArrayBuffer(response.data.XML[0].data)

  //     const danfeBlob = new Blob([danfeArrayBuffer], { type: "application/pdf" });
  //     const xmlBlob = new Blob([xmlArrayBuffer], { type: "text/xml" });

  //     saveAs(danfeBlob, `NFe_${pedido.DOC}_DANFE.pdf`);
  //     saveAs(xmlBlob, `NFe_${pedido.DOC}_XML.xml`);

  //     setWait(false)
  //   } catch (err) {
  //     console.log(err)
  //   }

  // };
  // function toArrayBuffer(buf) {
  //   var ab = new ArrayBuffer(buf.length);
  //   var view = new Uint8Array(ab);
  //   for (var i = 0; i < buf.length; ++i) {
  //     view[i] = buf[i];
  //   }
  //   return ab;
  // }