import React, { Component } from "react";
import "./App.scss";
import InputRange from 'react-input-range';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: true,
      showAside: true,
      file: '/images/default.jpg',
      headerText: 'Header',
      asideText: 'Aside',
      imageRadius: 0,
      descriptions: []
    }
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.addSection = this.addSection.bind(this);
    this.removeSection = this.removeSection.bind(this);
    this.handleChangeSection = this.handleChangeSection.bind(this);
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
  addSection() {
    let desc = this.state.descriptions;    
    desc.push({
      label: '',
      description: ''
    });   
    this.setState({descriptions:desc})      
  }
  removeSection(index) {
    let filtred = this.state.descriptions
      .filter((f, i) => i !== index)
    this.setState({
      descriptions: filtred
    })
  }
  handleChangeSection(input, index, event) {
    let desc = this.state.descriptions;
    if(input === "label") {
      desc[index].label = event.target.value
    }
    if(input === "desc") {
      desc[index].description = event.target.value
    }
    this.setState({descriptions:desc})    
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
              <img src={this.state.file} alt="Image" style={{ borderRadius: this.state.imageRadius + '%' }} />
              <div className="descriptions">
                {
                  this.state.descriptions && this.state.descriptions.map(el => {
                    return (
                      <div className="h_flex item">
                        <label>
                          {el.label}: 
                        </label>
                        <p> {el.description}</p>
                      </div>
                    )
                  })
                }
               
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
          <div className="field">
            <label>Image Radius</label>
            <InputRange
              maxValue={50}
              minValue={0}
              value={this.state.imageRadius}
              onChange={imageRadius => this.setState({ imageRadius })}
            />
          </div>
         
          {
            this.state.descriptions.map((element, index) => {
              return (
              <div className="field description" key="index">
                <button className="close" onClick={() => this.removeSection(index)}>
                  <div className="icon delete-ic"></div>
                </button>
                <input type="text" value={element.label} placeholder="label" onChange={(event) => this.handleChangeSection('label', index, event)} />
                <input type="text" value={element.description} placeholder="description" onChange={(event) => this.handleChangeSection('desc', index, event)} />
              </div>)
            })
          }
          <button className="buttons add-btn" onClick={this.addSection}>
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
