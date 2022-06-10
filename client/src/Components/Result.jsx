import { Component } from 'react';
import axios from 'axios';

import "./Result.css"

class Result extends Component {

  constructor()
  {
    super();

    this.state = {
      ocrText : ""
    }

    this.goToMainPage = this.goToMainPage.bind(this);
  }

  componentDidMount()
  {
    let loaderEl = document.getElementById("loader");
    loaderEl.style.transition = "opacity 1s";
    loaderEl.style.opacity = "1";
    document.getElementById("clipboard-but").style.opacity = "0";

    axios.get("http://localhost:4000/api/obtainText", { withCredentials : "true" })
    .then((response) => {
      console.log("text was get : " + response.data);
      loaderEl.style.opacity = "0";
      document.getElementById("clipboard-but").style.opacity = "1";

      this.setState({ocrText :  response.data});

    }).catch((err) => {
      console.log("error when getting text from file : " + err);

    });
  }

  goToMainPage()
  {
    const mainUrl = /(http:\/\/|https:\/\/)(.*?)\//.exec(window.location.href)[0];
    window.location.href = mainUrl;
  }

  render()
  {
    return(
      <div className="internal-content">
        <div className="header">
          <div onClick={() => this.goToMainPage()}>
            web ocr
          </div>          
        </div>

        <div className="content">

            <div className="result-container">

                <div className="loader" id="loader">

                </div>

                <div className="text">
                  {this.state.ocrText}
                </div>            
            </div>

            <button id="clipboard-but"  onClick={() => {navigator.clipboard.writeText(this.state.ocrText)}}>Zapisz pobrany tekst w schowku</button>

        </div>

        <div className="footer">
            <div>
                Jakub Toporek | Dawid Smoleński | 2022
            </div>
        </div>
      </div>
    );
  }
}

export default Result;