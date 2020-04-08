const projectName = "markdown-previewer";
localStorage.setItem('example_project', 'Markdown Previewer');

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true });


const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

//App

class App extends React.Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value });

  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "editorDiv" },
      React.createElement(Editor, { markdown: this.state.markdown, onChange: this.handleChange })),

      React.createElement("div", { className: "previewDiv" },
      React.createElement(Preview, { markdown: this.state.markdown }))));



  }}
;

//Editor
const Editor = props => {
  return (
    React.createElement("textarea", { id: "editor", value: props.markdown, onChange: props.onChange }));

};

const Preview = props => {
  return (
    React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(props.markdown, { renderer: renderer }) } }));

};

const placeholder =
`# React Markdown Previewer! (I am heading 1)

## Developed by deekay

### Instructions:

One can add inline code like this \`<div>Incline Code</div>\`, between 2 backticks.

\`\`\`
// One can write multi-line code using three backticks '\`\`\`':

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.

You can add links to using '[Link text](Link)' format [Try this](https://www.freecodecamp.com), and
> Block Quotes!

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

You can also add images with alt text
![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));