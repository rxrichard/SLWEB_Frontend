import React from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import ArrowBack from "@material-ui/icons/ArrowBack";

//Botão que se desativa após pressionado, com aspecto de "confirmar(é verde)"
export const ConfirmButton = (props) => (
  <Button
    variant="contained"
    color="default"
    size="large"
    startIcon={<CheckIcon />}
    className={props.className}
    href={props.href}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
);

//Botão que se desativa após pressionado, com aspecto de "perigo(é vermelho)"
export const CancelButton = (props) => (
  <Button
    variant="contained"
    color="default"
    size="large"
    startIcon={<CloseIcon />}
    className={props.className}
    href={props.href}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
);

//Botão comum, mas tem aspecto de "segurança(é amarelo)"
// export const SafeButton = props => (
//   <Button
//     {...props}
//     onClick={e => {
//       props.onClick(e)
//     }}
//     style={{ backgroundColor: SAFE_BUTTON_COLOR, margin: '10px' }}
//   >
//     {props.children}
//   </Button>
// )

//Volta pra última pagina sem perder histórico
export const GoBack = (props) => (
  <Button
    variant="contained"
    color="default"
    size="large"
    startIcon={<ArrowBack />}
    className={props.className}
    href={props.href}
    disabled={props.disabled}
    onClick={() => {
      window.history.back();
    }}
  >
    Voltar
  </Button>
);

