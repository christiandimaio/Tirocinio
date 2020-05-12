import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SimpleCard from '../element/station_card.js';
import { Wrapper } from '@material-ui/pickers/wrappers/Wrapper';
import {Grid,Image} from 'semantic-ui-react';
import TopBar from '../element/topbar.js';
import 'semantic-ui-css/semantic.min.css'
import {Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  app: {

  },
  root: {
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
   height:"90vh",
   
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList() {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" style={{maxHeight:"100vh"}}>
    <Grid >
      <Grid.Row columns={1}>
        <Grid.Column>
          <TopBar isMain={false} />
        </Grid.Column>                     
      </Grid.Row>
    </Grid>
    <Box display="flex" flexWrap="wrap" flexGrow={1} >
      <Grid padded columns="1" centered style={{flexGrow:1,maxHeight:"92vh",overflow:"auto"}}>
            <Grid.Column mobile={16} tablet={5} computer={4} style={{flexGrow:1,maxHeight:"100%"}} >
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
            </Grid.Column>
      </Grid>
      <Grid padded columns="1" style={{flexGrow:1,maxHeight:"100%"}}>
          <Grid.Column stretched mobile={16} tablet={11} computer={16}>
              <Box display="flex" flexGrow={1}>
              <Paper elevation={3} style={{flexGrow:1}}>
              <Image fluid src='https://mcdn.wallpapersafari.com/medium/27/89/JuICQz.jpg'></Image>
              </Paper>
              </Box>
              
            
            </Grid.Column>
          
      </Grid>
    </Box>
      
   </Box>

    
  );
}
// {/* <Box display="flex" flexDirection="column" style={{maxHeight:"100vh"}}>
// <Grid >
//   <Grid.Row columns={1}>
//     <Grid.Column>
//       <TopBar isMain={false} />
//     </Grid.Column>                     
//   </Grid.Row>
// </Grid>
// <Box display="flex" flexDirection="row" >
//   <Grid padded style={{flexGrow:1,maxHeight:"100%",overflow:"auto"}}>
//         <Grid.Column width={5} style={{flexGrow:1,maxHeight:"100%"}} >
//           <SimpleCard/>
//           <SimpleCard/>
//           <SimpleCard/>
//           <SimpleCard/>
//           <SimpleCard/>
//           <SimpleCard/>
//         </Grid.Column>
//   </Grid>
//   <Grid padded>
//       <Grid.Column width={11}>
      
//         <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
//         </Grid.Column>
      
//   </Grid>
// </Box>
// </Box> */}

//MEGLIO QUESTA
{/* <Box display="flex" flexDirection="column" style={{maxHeight:"100vh"}}>
    <Grid >
      <Grid.Row columns={1}>
        <Grid.Column>
          <TopBar isMain={false} />
        </Grid.Column>                     
      </Grid.Row>
    </Grid>
    <Box display="flex" flexDirection="row" flexGrow={1} >
      <Grid padded columns="1" style={{flexGrow:1,maxHeight:"90vh",overflow:"auto"}}>
            <Grid.Column width={5} style={{flexGrow:1,maxHeight:"100%"}} >
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
              <SimpleCard/>
            </Grid.Column>
      </Grid>
      <Grid padded columns="1" style={{flexGrow:1}}>
          <Grid.Column stretched width={11} >
          
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
          
      </Grid>
    </Box>
      
   </Box> */}