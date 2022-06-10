import { Component } from 'react';
import axios from 'axios';


import './Home.css';
import '../mobile.css';

import add_img from "../add_img.svg";

class Home extends Component {

  constructor()
  {
    super();
    
    this.state = {
      isFileExtensionGood : false
    };

    this.pushFormDataToServer = this.pushFormDataToServer.bind(this);
    this.checkFileInsertedToFileInput = this.checkFileInsertedToFileInput.bind(this);
  }

  checkFileInsertedToFileInput(e)
  {
    const fileExtension = e.target.value.split('.').pop();
    fileExtension.toLowerCase();

    console.log("file extension is " + fileExtension);

    const alowedExtension = ['png', 'jpg', 'jpeg'];
    const result = alowedExtension.find(element => element === fileExtension)

    if(result)
      this.setState({isFileExtensionGood : true});
  }

  pushFormDataToServer(e)
  {      
    e.preventDefault();

    if(this.state.isFileExtensionGood)
    {
      // pushing data
      const formData = new FormData(e.target);

      axios.post("http://localhost:4000/api/insert", formData, {
          headers : {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials : "true"

      }).then((res) => {
          console.log(res.data);
          const mainUrl = /(http:\/\/|https:\/\/)(.*?)\//.exec(window.location.href)[0];
          window.location.href = mainUrl + "text";
      })
      .catch((err) => {
          console.log("error" + err);
      });
    }
  }

  render()
  {
    return(
      <div className="internal-content">
        <div className="header">
          <div>
            web ocr
          </div>      
        </div>

        <div className="content">
          <form onSubmit={(e) => this.pushFormDataToServer(e)} encType="multipart/form-data">
            <section>
              <label className='sendImg' htmlFor="file">
                <img src={add_img}/>
                <p>Wybierz Zdjęcie</p>
              </label>

              <input onChange={(e) => this.checkFileInsertedToFileInput(e)} type="file" name="file" id="file" accept="image/*" required/>
            </section>

            <section>
              <input type="submit" id="submit-but" value="Pokaż tekst"/>
            </section>
            
          </form>

          <div className="info">
                <h2>Krótka informacja</h2><br/>

                <div>Jak pozyskać tekst ze zdjęcia?</div><br/>
                <section>
                    <ul>
                        <li><span>Kliknij na przycisk z trescią 'Wybierz Zdjęcie'</span></li>
                        <li><span>Następnie kliknij na przycisk z treścią 'Pokaż tekst'</span></li>
                        <li><span>Zostaniesz przekierowany na stronę z tekstem</span></li>
                    </ul>
                </section><br/><br/>

                <div>Jaki rodzaj plików wspieramy?</div><br/>
                <section>
                    <ul>
                        <li><span>png, jpg, jpeg</span></li>
                    </ul>
                </section>
            </div>

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

export default Home;