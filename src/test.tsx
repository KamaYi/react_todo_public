import React from 'react';
const ThemeContext = React.createContext("light");
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { theme: "light" };
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  toggleTheme() {
    this.setState(({ theme }: any) => ({
      theme: theme === "light" ? "dark" : "light"
    }));
  }
  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
        <AppBody onClick={this.toggleTheme} />
        </ThemeContext.Provider>
      </div>
    );
  }
}
class AppBody extends React.PureComponent<any, any> {
  render() {
    console.log("AppBody rendered");
    console.log(' this.props: ',  this.props);
    const { onClick }: any = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <button onClick={onClick}>
            {theme}
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default App