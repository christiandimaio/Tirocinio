import React, { Component } from 'react'
import { Header, Icon, Modal,Button } from 'semantic-ui-react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {TextField,Box, FormControl} from '@material-ui/core';
import {Grid,Image} from 'semantic-ui-react';
import Selecter from '../element/selecter';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import { Divider } from 'semantic-ui-react'
import TransferList from '../element/transfer_list.js'

export default class AddNewStation extends Component {
    state = { modalOpen: false,
                codice_stazione:"",
                tipo_stazione:"Digitale",
                periodo_manutenzione:null,
                seriale_gps:null,
                latitudine:null,
                longitudine:null,
                altezza_lv_mare:null,
                responsabile_1:null,
                responsabile_2:null,
                responsabile_3:null,
                responsabile_4:null,
                note_aggiuntive:null }


    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    
    handleChange = (name,event) => this.setState({[name]:event.target.value})

    render() {
        return (
            <>
                <Box display="flex" justifyContent="flex-end">
                    <Tooltip title="Add" aria-label="add" style={{zIndex:2}}>
                        <Fab onClick={this.handleOpen} style={{position:"relative"}} color="secondary" >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Box>
                <Modal   open={this.state.modalOpen}
                        onClose={this.handleClose}  centered={false}>
                    <Modal.Header>Crea una nuova stazione</Modal.Header>
                    <Modal.Content scrolling>
                    
                    <Modal.Description>
                        <Grid>
                        
                            <Grid.Row columns={3}>
                            <Grid.Column>
                            <TextField id="codice_stazione_textfield" value={this.state.codice_stazione} onChange={(e) => this.handleChange("codice_stazione",e)} label="Codice Stazione" variant="outlined" required fullWidth
                                    helperText="*Campo Richiesto">
                                    </TextField>
                            </Grid.Column>
                            <Grid.Column>
                            <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Stazione",style:{flexGrow:1},value:"",
                                    customHandler:this.handleChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={["Analogica","Digitale"]}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                        Mesi validità Manutenzione
                                </Typography>
                                <Slider
                                    defaultValue={1}
                                    getAriaValueText={(value) => {return '$(value)M'}}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={1}
                                    value={this.state.periodo_manutenzione}
                                    onChange={(e) => this.handleChange("periodo_manutenzione",e)}
                                    marks
                                    min={1}
                                    max={12}
                                    valueLabelDisplay="auto"
                                />
                            </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='info' />
                                    Informazioni Utili
                                </Header>
                            </Divider>
                            <Grid.Row columns={2}>
                                <Grid.Column width={11}>
                                    <Grid>
                                        <Grid.Row centered columns={1}>
                                            <h4>Localizzazione</h4>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={6}>
                                                <TextField id="seriale_gps_textfield" label="N. Seriale GPS" variant="outlined" required 
                                                    helperText="*Campo Richiesto">
                                                    </TextField>
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <IconButton aria-label="delete" onClick={() => {this.setState({test:"OK"})}}>
                                                    <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                                                </IconButton>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row columns={2}>
                                            <Grid.Column width={7}>
                                                <TextField id="codice_stazione_textfield" label="Latitudine (Gradi)" variant="outlined" required fullWidth
                                                    helperText="*Campo Richiesto, separatore: '.'">
                                                    </TextField>
                                            </Grid.Column>
                                            <Grid.Column width={7}>
                                                <TextField id="codice_stazione_textfield" label="Longitudine (Gradi)" variant="outlined" required fullWidth
                                                    helperText="*Campo Richiesto, separatore: '.'">
                                                    </TextField>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column> 
                                <Grid.Column width={5}>
                                    <Grid  style={{height:"100%"}}>
                                        <Grid.Row  columns={1} style={{height:"20%"}} textAlign='justified'>
                                            <Grid.Column textAlign='center' centered>
                                                <Typography id="vertical-slider" gutterBottom>
                                                    Altezza Lv. Mare (mt.)
                                                </Typography>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row columns={1} style={{height:"80%"}} textAlign='justified'>
                                            <Grid.Column textAlign='center' centered >
                                                <Slider
                                                    style={{maxHeight:"100%"}}
                                                    orientation="vertical"
                                                    defaultValue={0}
                                                    getAriaValueText={(value) => {return value+"mt."}}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={50}
                                                    marks
                                                    min={-100}
                                                    max={1000}
                                                    valueLabelDisplay="auto"
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>   
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='user' />
                                    Responsabili
                                </Header>
                            </Divider>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 1",style:{flexGrow:1},value:"",
                                    customHandler:this.handleChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={["Analogica","Digitale"]}/>
                                </Grid.Column>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 2",style:{flexGrow:1},value:"",
                                    customHandler:this.handleChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={["Analogica","Digitale"]}/>
                                </Grid.Column>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 3",style:{flexGrow:1},value:"",
                                    customHandler:this.handleChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={["Analogica","Digitale"]}/>
                                </Grid.Column>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 4",style:{flexGrow:1},value:"",
                                    customHandler:this.handleChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={["Analogica","Digitale"]}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='sticky note outline' />
                                    Note aggiuntive
                                </Header>
                            </Divider>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <TextField
                                        variant="outlined"
                                        id="standard-multiline-static"
                                        label="Note"
                                        multiline
                                        rows={5}
                                        placeholder="Inserisci nota qui.."
                                        fullWidth
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative>
                            Cancella
                        </Button>
                        <Button
                            
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Salva'
                        />
                    </Modal.Actions>
                </Modal>
        </>
        )
    }
}
