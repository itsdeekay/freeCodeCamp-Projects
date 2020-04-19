const projectName = 'pomodoro-clock';
localStorage.setItem('example_project', 'Pomodoro Clock');

//Constant variables
const SADD = 'SADD';
const SSUB = 'SSUB';
const BADD = 'BADD';
const BSUB = 'BSUB';
const SSEC = 'SSEC';
const CHANGE_STATE = 'CHANGE_STATE';
const STATES = ['SESSION', 'BREAK'];

//Default state of Redux App
const defaultState = {
  sessionValue: 25,
  breakValue: 5,
  currentState: STATES[0],
  crntStateValue: 0,
  timerSeconds: 1500,
  playSt: 0 };


//Redux Actions
const playPause = () => {
  return {
    type: 'PP' };

};
const setSeconds = () => {
  return {
    type: SSEC };

};
const addSession = () => {
  return {
    type: SADD };

};
const subSession = () => {
  return {
    type: SSUB };

};
const addBreak = () => {
  return {
    type: BADD };

};
const subBreak = () => {
  return {
    type: BSUB };

};
const changeState = () => {
  return {
    type: CHANGE_STATE };

};

//Redux Reducer 
const timerReducer = (state = defaultState, action) => {

  switch (action.type) {
    case SADD:
      var temp = state.sessionValue + 1 > 60 ? 60 : state.sessionValue + 1;
      return Object.assign({}, state, {
        sessionValue: temp,
        timerSeconds: temp * 60 });

    case SSUB:
      var temp = state.sessionValue - 1 > 0 ? state.sessionValue - 1 : 1;
      return Object.assign({}, state, {
        sessionValue: temp,
        timerSeconds: temp * 60 });

    case BADD:
      return Object.assign({}, state, {
        breakValue: state.breakValue + 1 > 60 ? 60 : state.breakValue + 1 });

    case BSUB:
      return Object.assign({}, state, {
        breakValue: state.breakValue - 1 > 0 ? state.breakValue - 1 : 1 });

    case CHANGE_STATE:
      return Object.assign({}, state, {
        currentState: STATES[1 - state.crntStateValue],
        crntStateValue: 1 - state.crntStateValue,
        timerSeconds: state.crntStateValue ? state.sessionValue * 60 : state.breakValue * 60 });

    case SSEC:
      return Object.assign({}, state, {
        timerSeconds: state.timerSeconds - 1 });

    case 'reset':
      return defaultState;
    case 'PP':
      return Object.assign({}, state, {
        playSt: 1 - state.playSt });

    default:
      return state;}

};

//Redux Store
const store = Redux.createStore(timerReducer);


const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class LengthController extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "length-control" },
      React.createElement("div", { id: this.props.titleID },
      this.props.title),

      React.createElement("button", { id: this.props.decId, className: "btn-level", value: this.props.decId, onClick: this.props.onClick },
      React.createElement("i", { className: "fa fa-arrow-down" })),

      React.createElement("div", { id: this.props.lengthID, className: "btn-level" }, this.props.length),
      React.createElement("button", { id: this.props.incId, className: "btn-level", value: this.props.incId, onClick: this.props.onClick },
      React.createElement("i", { className: "fa fa-arrow-up" }))));



  }}
;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: 0 };

    this.IncDec = this.IncDec.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.counter = this.counter.bind(this);
  }
  counter() {
    if (this.props.timerState.timerSeconds > 0 && this.props.timerState.playSt == 1) {
      this.props.setTimerSecond();
      setTimeout(() => this.counter(), 1000);
    } else if (this.props.timerState.playSt == 1) {
      this.props.stateChange();
      this.audioBeep.play();
      setTimeout(() => this.counter(), 1000);
    }
  }
  timerControl() {
    this.props.pp();
  }
  componentDidUpdate(prevProps) {
    if (this.props.timerState.playSt != prevProps.timerState.playSt) {
      setTimeout(() => this.counter(), 1000);
    }
  }
  IncDec(e) {
    try {
      switch (e.currentTarget.value) {
        case "break-decrement":
          this.props.subToBreak();
          break;
        case "break-increment":
          this.props.addToBreak();
          break;
        case "session-decrement":
          if (!this.props.timerState.playSt) {
            this.props.subToSession();
          }

          break;
        case "session-increment":
          if (!this.props.timerState.playSt) {
            this.props.addToSession();
          }

          break;
        case "reset":
          this.props.toReset();
          this.audioBeep.pause();
          this.audioBeep.currentTime = 0;
          break;}

    } catch (err) {
      console.log(err.message);
    }

  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "mainTitle" }, "Pomodoro Clock"),


      React.createElement(LengthController, { titleID: "break-label", title: "Break Length", decId: "break-decrement",
        incId: "break-increment", length: this.props.timerState.breakValue, onClick: this.IncDec, lengthID: "break-length" }),

      React.createElement(LengthController, { titleID: "session-label", title: "Session Length", decId: "session-decrement",
        incId: "session-increment", length: this.props.timerState.sessionValue, onClick: this.IncDec, lengthID: "session-length" }),

      React.createElement("div", { className: "timer" },
      React.createElement("div", { id: "timer-label" },
      this.props.timerState.currentState),

      React.createElement("div", { id: "time-left" },
      ('0' + Math.floor(this.props.timerState.timerSeconds / 60).toString()).slice(-2).concat(':', ('0' + (this.props.timerState.timerSeconds % 60).toString()).slice(-2)))),




      React.createElement("div", { className: "timer-control" },
      React.createElement("button", { id: "start_stop", onClick: this.timerControl },
      React.createElement("i", { className: "fa fa-play" }),
      React.createElement("i", { className: "fa fa-pause" })),

      React.createElement("button", { id: "reset", value: "reset", onClick: this.IncDec },
      React.createElement("i", { className: "fa fa-refresh" }))),


      React.createElement("audio", { id: "beep", preload: "auto",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
        ref: audio => {this.audioBeep = audio;} })));


  }}
;

const mapStateToProps = state => {
  return { timerState: state };
};

const mapDispatchToProps = dispatch => {
  return {
    addToSession: () => {
      dispatch(addSession());
    },
    subToSession: () => {
      dispatch(subSession());
    },
    addToBreak: () => {
      dispatch(addBreak());
    },
    subToBreak: () => {
      dispatch(subBreak());
    },
    toReset: () => {
      dispatch({ type: 'reset', state: undefined });
    },
    setTimerSecond: () => {
      dispatch(setSeconds());
    }, stateChange: () => {
      dispatch(changeState());
    }, pp: () => {
      dispatch(playPause());
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(Timer);

class AppWrapper extends React.Component {
  render() {
    return (
      React.createElement(Provider, { store: store },
      React.createElement(Container, null)));


  }}
;
ReactDOM.render(React.createElement(AppWrapper, null), document.getElementById('app'));