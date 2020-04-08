const projectName = 'drum-machine';
localStorage.setItem('example_project', 'Drum Machine');
const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



const activeStyle = {
  backgroundColor: '#777',
  boxShadow: "0 3px #fff" };


const inactiveStyle = {
  backgroundColor: 'white',
  boxShadow: "3px 3px 5px #777" };


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle };

    this.playSound = this.playSound.bind(this);
    this.activatePad = this.activatePad.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  activatePad() {
    this.state.padStyle.backgroundColor === '#777' ?
    this.setState({
      padStyle: inactiveStyle }) :

    this.setState({
      padStyle: activeStyle });

  }
  render() {
    return (
      React.createElement("div", { id: this.props.clipId, onClick: this.playSound, className: "drum-pad", style: this.state.padStyle },
      React.createElement("audio", { src: this.props.clip, className: "clip", id: this.props.keyTrigger }),
      this.props.keyTrigger));


  }}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
      return (
        React.createElement(DrumPad, { clipId: padBankArr[i].id, clip: padBankArr[i].url, keyTrigger: padBankArr[i].keyTrigger,
          keyCode: padBankArr[i].keyCode, updateDisplay: this.props.updateDisplay }));

    });
    console.log(padBank);
    return (
      React.createElement("div", { className: "pad-bank" },
      padBank));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Starting',
      currentPadBank: bankOne };

    this.displayClipName = this.displayClipName.bind(this);
  }
  displayClipName(name) {
    this.setState({
      display: name });

  }
  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "display" },
      this.state.display),

      React.createElement(PadBank, { updateDisplay: this.displayClipName, currentPadBank: bankOne })));


  }}


ReactDOM.render(
React.createElement(App, null),
document.getElementById('root'));