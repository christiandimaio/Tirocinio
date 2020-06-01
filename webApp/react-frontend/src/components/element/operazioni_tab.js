import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from 'semantic-ui-react';
import {FormControlLabel,Switch} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles = makeStyles({
  table: {
    flexGrow:1
  },
});


function Row(props) {
  const { operazione } = props;
  const { data_inizio } = props;
  const { data_fine } = props;
  const [open, setOpen] = React.useState();

  React.useEffect(() => {
    setOpen(props.collapseAll);
  }, [props.collapseAll])

  return (
          <React.Fragment>
            <TableRow >
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              
              <TableCell align="center">{operazione["componente"]["seriale"]}</TableCell>
              <TableCell align="center">{operazione["operazione"]["tipo_operazione"]}</TableCell>
              <TableCell align="center">{operazione["operatore"]["nome_cognome"]}</TableCell>
              <TableCell align="center">{data_inizio.getFullYear()+"/"+(data_inizio.getMonth()+1)+"/"+data_inizio.getDate()}</TableCell>
              <TableCell align="center">{data_fine!=""?data_fine.getFullYear()+"/"+(data_fine.getMonth()+1)+"/"+data_fine.getDate():""}</TableCell>
            </TableRow>
            <TableRow style={{width:"50%"}}>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box  justifyContent="center" display="flex">
                    Note : {operazione["operatore"]["note"]}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
  );
}

export default function OperazioniTab(props) {
  const classes = useStyles();
  const [collapseAll, setCollapseAll] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChange = (event) => {
    console.log(collapseAll)
    setCollapseAll(event.target.checked);
  };
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.operazioni.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid >
            <Grid.Row columns={1}>
              <Grid.Column floated="left">
                <FormControlLabel
                  control={<Switch checked={collapseAll} onChange={handleChange} />}
                  label="Visualizza tabella estesa"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              
              <Grid.Column width={16}>
                <Paper style={{overflowY:"auto",overflowX:"auto"}}>
                  <TableContainer component={Box} >
                    <Table className={classes.table} size="small" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" size="small"></TableCell>
                          <TableCell align="center" size="small">Seriale</TableCell>
                          <TableCell align="center" size="small">Tipo Operazione</TableCell>
                          <TableCell align="center" size="small">Operatore</TableCell>
                          <TableCell align="center" size="small">Data Inizio Operazione</TableCell>
                          <TableCell align="center" size="small">Data Fine Operazione</TableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          (
                            rowsPerPage > 0
                            ? props.operazioni.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.operazioni
                          ).map( (operazione) => {
                            console.log(operazione)
                            const data_fine = operazione["operazione"]["data_fine_operazione"]!=null ? new Date(operazione["operazione"]["data_fine_operazione"]):"";
                            const data_inizio = operazione["operazione"]["data_inizio_operazione"]!=null ? new Date(operazione["operazione"]["data_inizio_operazione"]):"" ;
                            
                            return(
                              <Row operazione={operazione} collapseAll={collapseAll} data_inizio={data_inizio} data_fine={data_fine}/>
                            )
                          })
                        }
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'Tutte', value: -1 }]}
                            colSpan={3}
                            count={props.operazioni.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelRowsPerPage="Righe per pagina"
                            SelectProps={{
                              inputProps: { 'aria-label': 'Righe per pagina' },
                              native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>  
                </Paper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
    
  );
}