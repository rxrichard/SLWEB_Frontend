import React from 'react'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export const Options = ({ folders, onClickFolder }) => {
    return(
        <Breadcrumbs aria-label="breadcrumb">
        {folders.map((folder, i) => {
          if (folders.length - 1 > i) {
            return (
              <Link color="inherit" href="/arquivos" onClick={onClickFolder}>
                {folder}
              </Link>
            )
          } else {
            return (
              <Typography color="textPrimary">
                {folder}
              </Typography>
            )
          }
        })}
      </Breadcrumbs>
    )
}