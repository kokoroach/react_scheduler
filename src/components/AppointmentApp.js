import React, { Component, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import moment from "moment";

const drawerWidth = 240;
const smallScreen =  window.innerWidth < 768

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  customizeToolbar: {
    minHeight: 20
  }
}));


// class AppointmentApp extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};

//   };

const SelectedListItem = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  const renderAppointmentTimes = () => {
    const slots = [...Array(8).keys()];
    
    return slots.map((slot, index) => {
      const time1 = moment().hour(9).minute(0).add(slot, "hours");
      const time2 = moment().hour(9).minute(0).add(slot + 1, "hours");
    
      return (
        <Grid item xs={4}> 
          <ListItem 
            button
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            style={{
              marginTop: 15,
              marginBottom: 15,
            }}
          >
          <ListItemText primary={time1.format("hh:mm A")} />
          </ListItem>
        </Grid>
      );
    });
  };

  return (
    <div>
      <Grid container justify="center">
        {renderAppointmentTimes()}
      </Grid>
    </div>
  );
}

const SelectedDate = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          orientation={smallScreen ? "portrait" : "landscape"}
          variant="static"
          openTo="date"
          value={selectedDate}
          onChange={handleDateChange}
          disablePast
          shouldDisableDate={(day) => (day.getDay() === 0)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default function AppLayout() {
  const classes = useStyles();
  const theme = useTheme();

  const setAppBar = () => (
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            DocPy Appointment Scheduler
          </Typography>
        </Toolbar>
      </AppBar>
  );

  const setDrawer = () => (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {['Make Appointments', 'My Appointments'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <CalendarTodayIcon /> : <ScheduleIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {setAppBar()}
      {setDrawer()}
      <main className={clsx(classes.content, {
          [classes.contentShift]: true,
      })}>
        <Toolbar />
        <Typography variant="h3" align="center">
            Make Appointment
        </Typography>
        <Toolbar className={classes.customizeToolbar}/>
        <Grid container justify="center">
          <Grid item xs={6}> 
            <Typography variant="h5" align="center">
              Select Date
            </Typography>
            <Toolbar className={classes.customizeToolbar}/>
            <Container>
              {SelectedDate()}
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" align="center">
              Select Time
            </Typography>
            <Toolbar className={classes.customizeToolbar}/>
            <Container>
              {SelectedListItem()}
            </Container>
          </Grid>
      </Grid>
      <Toolbar className={classes.customizeToolbar}/>
      <Grid container justify="center">
        <Button variant="contained" color="primary">
          MAKE APPOINMENT
        </Button>
      </Grid>
      </main>
    </div>
  );
}
