const projectName = "javascript-calculator";
const buttons = [{
  buttonId: 'clear',
  buttonValue: 'AC',
  class: 'clearClass' },
{
  buttonId: 'equals',
  buttonValue: '=',
  class: 'equalClass' },
{
  buttonId: 'seven',
  buttonValue: '7',
  class: 'numbers' },
{
  buttonId: 'eight',
  buttonValue: '8',
  class: 'numbers' },
{
  buttonId: 'nine',
  buttonValue: '9',
  class: 'numbers' },
{
  buttonId: 'divide',
  buttonValue: '/',
  class: 'operators' },
{
  buttonId: 'four',
  buttonValue: '4',
  class: 'numbers' },
{
  buttonId: 'five',
  buttonValue: '5',
  class: 'numbers' },
{
  buttonId: 'six',
  buttonValue: '6',
  class: 'numbers' },
{
  buttonId: 'multiply',
  buttonValue: '*',
  class: 'operators' },
{
  buttonId: 'one',
  buttonValue: '1',
  class: 'numbers' },
{
  buttonId: 'two',
  buttonValue: '2',
  class: 'numbers' },
{
  buttonId: 'three',
  buttonValue: '3',
  class: 'numbers' },
{
  buttonId: 'subtract',
  buttonValue: '-',
  class: 'operators' },
{
  buttonId: 'zero',
  buttonValue: '0',
  class: 'zeroClass' },
{
  buttonId: 'decimal',
  buttonValue: '.',
  class: 'numbers' },
{
  buttonId: 'add',
  buttonValue: '+',
  class: 'operators' }];


const isOperator = /[*/+‑]/,
isDigit = /\d/,
endsWithOperator = /[*+‑/]$/,
endsWithNegativeSign = /[*/+]‑$/;

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClickInd = this.buttonClickInd.bind(this);
  }
  buttonClickInd(e) {
    this.props.buttonClick(this.props.buttonValue);
  }
  render() {
    return (
      React.createElement("button", { id: this.props.buttonId, value: this.props.buttonValue, className: this.props.class,
        onClick: this.buttonClickInd }, this.props.buttonValue));

  }}


class ButtonBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let allButtons;
    allButtons = this.props.buttonBank.map((buttonObj, i, buttonArr) => {
      return (
        React.createElement(Button, { buttonId: buttonArr[i].buttonId, buttonValue: buttonArr[i].buttonValue,
          class: buttonArr[i].class, buttonClick: this.props.buttonClick }));

    });
    return (
      React.createElement("div", { className: "button-bank" },
      allButtons));


  }}


class Formula extends React.Component {
  render() {
    return React.createElement("div", { className: "formulaScreen" }, this.props.formula);
  }}

class Output extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "outputScreen", id: "display" },
      this.props.currentValue));


  }}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      currentValue: '0',
      prevValue: '0',
      btns: buttons };

    this.reset = this.reset.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }
  reset() {
    this.setState({
      formula: '',
      currentValue: '0',
      prevValue: '0',
      evaluated: false });

  }

  buttonClick(buttonvalue) {
    const { formula, currentValue, prevValue, evaluated } = this.state;
    let crValue,frValue,prValue = currentValue,eValue = false;

    if (buttonvalue == 'AC') {
      this.reset();
      return;
    } else if (/[*/+-]/.test(buttonvalue)) {
      if (/[*/+-]/.test(prValue)) {
        frValue = /[*/+]-$/.test(formula + buttonvalue) && formula.length > 1 ? formula + buttonvalue : formula.slice(0, -1) + buttonvalue;
        crValue = buttonvalue;
        if (!/[*/+]-$/.test(frValue)) {
          while (/[*/+-]$/.test(frValue)) {
            frValue = frValue.slice(0, -1);
          }
          frValue = frValue + buttonvalue;
        }
      } else {
        prValue = buttonvalue;
        crValue = buttonvalue;
        frValue = evaluated ? currentValue + buttonvalue : formula + buttonvalue.toString();
      }
    } else if (isDigit.test(buttonvalue)) {
      if (evaluated) {
        crValue = buttonvalue;
        frValue = buttonvalue;
      } else {
        if (buttonvalue == '0' && prValue == '0') {
          crValue = '0';
          frValue = formula;
        } else {
          crValue = isDigit.test(prValue) ? currentValue + buttonvalue : buttonvalue;
          frValue = formula.length == 1 && !/[\d-]/.test(formula) ? buttonvalue : formula + buttonvalue;
        }
      }


    } else if (buttonvalue == '=') {
      if (evaluated) {
        return;
      }
      let expression = formula;
      expression = expression.match(/[\d\-][\d+\-*/\.]*[\d]/)[0];
      console.log(expression);
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      console.log(answer);
      frValue = expression + " =" + answer;
      crValue = answer;
      eValue = true;
    } else if (buttonvalue == '.') {
      if (evaluated) {
        crValue = '0.';
        frValue = '0.';
      } else
      {
        if (/[.]/.test(prValue)) {
          crValue = prValue;
          frValue = formula;
        } else {
          crValue = currentValue + buttonvalue;
          frValue = formula + buttonvalue;
        }
      }


    }
    if (currentValue == '0' && formula == '') {
      crValue = buttonvalue;
    }
    this.setState({
      formula: frValue,
      currentValue: crValue,
      evaluated: eValue });

  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "calculator" },

      React.createElement(Formula, { formula: this.state.formula }),
      React.createElement(Output, { currentValue: this.state.currentValue }),
      React.createElement(ButtonBank, { buttonBank: this.state.btns, buttonClick: this.buttonClick }))));



  }}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById('app'));