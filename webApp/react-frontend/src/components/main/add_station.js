import React, { Component } from 'react'
import { Header, Icon, Modal } from 'semantic-ui-react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {TextField,Box,Button, FormControl} from '@material-ui/core';
import {Grid,Image} from 'semantic-ui-react';
export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

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
                <Modal.Content >
                
                <Modal.Description>
                    <Grid>
                        <Grid.Row columns={3}>
                        <Grid.Column>
                        <TextField id="nome_textfield" label="Nome" variant="outlined" required fullWidth
                                helperText="*Campo Richiesto">
                                </TextField>
                        </Grid.Column>
                        <Grid.Column>
                        <TextField id="nome_textfield" label="Nome" variant="outlined" required fullWidth
                                helperText="*Campo Richiesto">
                                </TextField>
                        </Grid.Column>
                        <Grid.Column>
                            <TextField id="nome_textfield" label="Nome" variant="outlined" required fullWidth
                                helperText="*Campo Richiesto">
                                </TextField>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Description>
                </Modal.Content>
            </Modal>
      </>
    )
  }
}
