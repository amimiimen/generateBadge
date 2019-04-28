import React, { Component } from "react";
import "./App.scss";
import InputRange from 'react-input-range';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

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
      descriptions: [],
      customStyle: `
      .content {
        width: 350px;
        min-height: 600px;
        display: flex;
        flex-direction: column;
        background: #fff;
      }
      .content .header {
        height: 75px;
        width: calc(100% - 75px);
        margin-left: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: #000;
      }
      
      aside {
        width: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      aside h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        transform: rotate(-90deg);
        white-space: nowrap;
      }
      .content_badge {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .content_badge img {
        width: 250px;
        height: 250px;
        object-fit: cover;
        object-position: center;
      }
  
      .content_badge .descriptions {
        width: 100%;
      }
      .descriptions .item {
        align-items: center;
      }
      .item label {
        width: 40%;
        text-align: right;
        margin-right: 5px;
      }

      .item p {
        width: 60%;
        text-align: left;
      }

      `.trim().replace(/   /g, '')
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

  exportPng() {
 
    domtoimage.toBlob(document.getElementById('image-to-export'))
    .then(function (blob) {
        saveAs(blob, 'image-to-export.png');
    });

  }
  updateStyle = event => {
    this.setState({
      customStyle: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <section id="image-to-export" className="content">
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
        <div className="form" onSubmit={this.handleSubmit}>
        <Tabs>
          <TabList>
            <Tab>Form</Tab>
            <Tab>Custom style</Tab>
          </TabList>

          <TabPanel>
            <h2>Form</h2>
            <div className="field">
              <input id="show-header" type="checkbox" defaultChecked onChange={this.handleChangeCheckbox('showHeader')} />
              <label htmlFor="show-header">show header</label>
            </div>
            {this.state.showHeader ? 
              <div className="field">
                <input type="text" placeholder="Header text" autoFocus onChange={this.handleChangeText('headerText')} />
              </div>
              : ''
            }
            <div className="field">
              <input id="show-aside" type="checkbox" defaultChecked onChange={this.handleChangeCheckbox('showAside')} />
              <label htmlFor="show-aside">show aside</label>
            </div>
            {this.state.showAside ? 
              <div className="field">
              <input type="text" placeholder="Aside text" autoFocus onChange={this.handleChangeText('asideText')} />
            </div>
            : ''
            }
            <div className="field">
              <label htmlFor="upload-img" className="buttons upload-btn">
                <div className="icon upload-ic"></div>
                upload photo
              </label>
              <input type="file" id="upload-img" onChange={this.handleChangeFile('file')} hidden />
            </div>
            <div className="field b_40">
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
          </TabPanel>
          <TabPanel>
            <h2>Custom style</h2>
                <textarea style={{
                  width: '100%'
                }} rows='25' onChange={this.updateStyle} defaultValue={this.state.customStyle}>
                </textarea>
          </TabPanel>
        </Tabs>

        <button type="submit" className="buttons export-btn" onClick={this.exportPng} >
          <div className="icon export-ic"></div>
          Export PNG
        </button>
          
        <style>
         {this.state.customStyle}
        </style>
      </div>
    </div>
    );
  }
}
export default App;
