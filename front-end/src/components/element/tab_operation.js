import React , { useEffect } from 'react';
import { DataGrid , GridToolbar, itIT} from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import AddOperation from '../element/add_operation.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SeeNote from './utils/see_note_operation.js';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const theme = createMuiTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    itIT,
  );

const useStyles = makeStyles({
    table: {
      flexGrow:1
    },
  });







export default function OperazioniTab(props) {
    const columns = [
        { field: 'id', headerName: 'Operazione N.', width: 200, headerAlign: 'center',align: 'center'},
        { field: 'tipoOperazione', headerName: 'Tipo Operazione', width: 150,headerAlign: 'center',align: 'center'},
        { field: 'operatore', headerName: 'Operatore', width: 150, headerAlign: 'center',align: 'center'}, 
        { field: 'seriale', headerName: 'Seriale', width: 150,headerAlign: 'center',align: 'center'},
        { field: 'dataInizioOperazione', headerName: 'Inizio Operazione', width: 200,type: 'date',headerAlign: 'center',align: 'center',dateSetting: { locale: "it-IT"} },
        { field: 'dataFineOperazione', headerName: 'Fine Operazione', width: 200,type: 'date',headerAlign: 'center',align: 'center',dateSetting: { locale: "it-IT"} },
        { field: 'note', headerName: 'Note', width: 130},
        {field: 'infoPiu', width:50, 
        renderCell: (params) => (
          <strong>
            <IconButton aria-label="delete" onClick={() => {handleOpenNote(params.getValue('note') || '')}}>
              <InfoIcon color="primary" />
            </IconButton>
            
          </strong>
        ),}
      ];
    const classes = useStyles();
    const [collapseAll, setCollapseAll] = React.useState(false); // Serve per gestire il collasso contemporaneo di tutte le righe della pagina
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [stationOperations, setStationOperations] = React.useState([]);
    const [seeAddOperation, openAddOperation] = React.useState(false);
    const [openNote, setOpenNote] = React.useState(false);
    const [note,setNote] = React.useState("");
  useEffect(() => {
    
    getOperazioniStazione()
  }, [props.stationId]);

  const handleOpenNote = (note) => {
    setOpenNote(true);
    setNote(note);
}   

  const handleCloseNote = () => {
    setOpenNote(false);
  }

  function getOperazioniStazione () {
    axios.get('api/Stazione/'+props.stationId+'/Operazioni')
    .then((response) => {
        console.log(response.data["data"]);
        setStationOperations(response.data["data"])
    })
  }



  // Funzione duale di openAddOperation
  const closeAddOperation = () => {
    openAddOperation(false);
    getOperazioniStazione();
    props.forceRender("");
  }

    function modRow(rows){
        let newRows = [];
        for (let i=0; i<rows.length; i++) {
            const endDate = rows[i]["operazione"]["data_fine_operazione"]!==null ? new Date(rows[i]["operazione"]["data_fine_operazione"]):null;
            const startDate = rows[i]["operazione"]["data_inizio_operazione"]!==null ? new Date(rows[i]["operazione"]["data_inizio_operazione"]):null;
            
            newRows.push(
            {
                "id":i,
                "seriale":rows[i]["componente"]["seriale"],
                "tipoOperazione":rows[i]["operazione"]["tipo_operazione"],
                "operatore":rows[i]["operatore"]["nome_cognome"],
                "dataInizioOperazione":startDate,
                "dataFineOperazione": endDate,
                "note":rows[i]["operatore"]["note"]
            })
        }
        console.log(newRows);
        return newRows
    }
  return (
    <ThemeProvider theme={theme}> 
    <div style={{ height: "100%", width: '100%' }}>
    <SeeNote open={openNote} handleClose={handleCloseNote} note={note} />
    <AddOperation open={seeAddOperation} handleClose={closeAddOperation} stationId={props.stationId}/>
       <Fab variant="extended" color='primary' style={{width:"100%",margin:"10px auto 10px auto",minHeight:"5vh"}} onClick={() => openAddOperation(true)}>
                <Add  />
                Aggiungi Operazione
            </Fab>
      <DataGrid rowHeight={100} rows={modRow(stationOperations)} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} pagination 
      components={{
          Toolbar: GridToolbar,
        }}
        />
    
    </div>
    </ThemeProvider>
  );
}
