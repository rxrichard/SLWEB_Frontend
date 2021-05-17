import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selecao, setSelecao] = React.useState("");
  const [bebida, setBebida] = React.useState("");
  const [medida, setMedida] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Adicionar bebida</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Configurar bebida</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Seleção
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selecao}
                onChange={(e) => setSelecao(e.target.value)}
                label="Age"
              >
                <MenuItem value="">
                  <em>Nenhuma</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Bebida
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={bebida}
                onChange={(e) => setBebida(e.target.value)}
                label="Age"
              >
                <MenuItem value="">
                  <em>Nenhuma</em>
                </MenuItem>
                <MenuItem value="CAFÉ">Café</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Medida
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={medida}
                onChange={(e) => setMedida(e.target.value)}
                label="Age"
              >
                <MenuItem value="">
                  <em>Nenhuma</em>
                </MenuItem>
                <MenuItem value="35">35ML</MenuItem>
                <MenuItem value="90">90ML</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Tipo
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={medida}
                onChange={(e) => setMedida(e.target.value)}
                label="Age"
              >
                <MenuItem value="">
                  <em>Nenhuma</em>
                </MenuItem>
                <MenuItem value="Pronto">Pronto</MenuItem>
                <MenuItem value="Mistura">Mistura</MenuItem>
              </Select>
            </FormControl>


          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Voltar
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
