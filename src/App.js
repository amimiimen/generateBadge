import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: true,
      showAside: true,
      headerText: 'Header',
      asideText: 'Aside'
    }
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeCheckbox = name => event => {
    this.setState({
      [name]: event.target.checked
    })     
  }
  handleChangeFile = name => event => {
    this.setState({
      [name]: URL.createObjectURL(event.target.files[0])
    })  
  }
  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value
    })  
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <section className="content">
          {this.state.showHeader ? 
              <div className="header" >
                <h1>{this.state.headerText}</h1>
              </div>
            : ''
          }
          <section className="h_flex">
            { this.state.showAside ? <aside>
              <h1>{this.state.asideText}</h1>
            </aside>
            : ''
            }
            <div className="content_badge">
              <img src={this.state.file} alt="Image" />
              <div className="descriptions">
                <div className="h_flex item">
                  <label>
                    label 1: 
                  </label>
                  <p>description 1</p>
                </div>
                <div className="h_flex item">
                  <label>
                    hello test: 
                  </label>
                  <p>new description 1</p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <from className="form" onSubmit={this.handleSubmit}>
          <h1>Form</h1>
          <div className="field">
            <input id="show-header" type="checkbox" defaultChecked onChange={this.handleChangeCheckbox('showHeader')} />
            <label for="show-header">show header</label>
          </div>
          {this.state.showHeader ? 
            <div className="field">
              <input type="text" placeholder="Header text" autoFocus onChange={this.handleChangeText('headerText')} />
            </div>
            : ''
          }
          <div className="field">
            <input id="show-aside" type="checkbox" defaultChecked onChange={this.handleChangeCheckbox('showAside')} />
            <label for="show-aside">show aside</label>
          </div>
          {this.state.showAside ? 
            <div className="field">
            <input type="text" placeholder="Aside text" autoFocus onChange={this.handleChangeText('asideText')} />
          </div>
          : ''
          }
          <div className="field">
            <label for="upload-img" className="buttons upload-btn">
              <div className="icon upload-ic"></div>
              upload photo
            </label>
            <input type="file" id="upload-img" onChange={this.handleChangeFile('file')} hidden />
          </div>
          <button className="buttons add-btn">
            <div className="icon add-ic"></div>
            Add section
          </button>
          <button type="submit" className="buttons export-btn" >
            <div className="icon export-ic"></div>
            Export PNG
          </button>
        </from>
      </div>
    );
  }
}

export default App;
