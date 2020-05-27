// import React from 'react';
// import { Table, Tag, Space } from 'antd';
//import 'antd/dist/antd.css';
// export default class OperazioniTable extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             ...props
//         }
//     }

//     render(){
//         var data_table = [];
//         this.props.operazioni.map( (operazione) => {
//             console.log(operazione)
//             data_table.push(
//                 {
//                     "tipo_operazione":operazione["operazione"]["tipo_operazione"],
//                     "data_start":operazione["operazione"]["data_inizio_operazione"],
//                     "data_end":operazione["operazione"]["data_fine_operazione"],
//                     "operatore":operazione["operatore"]["nome_cognome"],
//                     "seriale":operazione["componente"]["seriale"]
//                 }
//             )
//         })
//         console.log(data_table)
            
          
//           const columns = [
//             {
//               title: 'Tipo Operazione',
//               dataIndex: 'tipo_operazione',
//               key: 'tipo_operazione',
//             },
//             {
//               title: 'Data inizio ',
//               dataIndex: 'data_start',
//               key: 'data_start',
//             },
//             {
//               title: 'Data fine',
//               dataIndex: 'data_end',
//               key: 'data_end',
//             },
//             {
//               title: 'Operatore',
//               dataIndex: 'operatore',
//               key: 'operatore',
//             },
//             {
//               title: 'Seriale Componente',
//               dataIndex: 'seriale',
//               key: 'seriale',
//             }
//           ];
          
//           return(<Table pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['5', '10', '15']}}
//                         dataSource={data_table} columns={columns} scroll={{x:"300"}}/>);
//     }
// }
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
const useStyles = makeStyles({
  table: {
    flexGrow:1
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function Row(props) {
  const { operazione } = props;
  const { data_inizio } = props;
  const { data_fine } = props;
  const [open, setOpen] = React.useState(false);

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
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1} justifyContent="center">
                    Note : {operazione["operatore"]["note"]}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
  );
}

export default function OperazioniTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  return (
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
            props.operazioni.map( (operazione) => {
              console.log(operazione)
              const data_fine = operazione["operazione"]["data_fine_operazione"]!=null ? new Date(operazione["operazione"]["data_fine_operazione"]):"";
              const data_inizio = operazione["operazione"]["data_inizio_operazione"]!=null ? new Date(operazione["operazione"]["data_inizio_operazione"]):"" ;
              
              return(
                <Row operazione={operazione} data_inizio={data_inizio} data_fine={data_fine}/>
              )
            })
          }
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}