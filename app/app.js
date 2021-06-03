
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            value: '',    
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      
      console.log (this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <div class = "conteiner">
          <form onSubmit = {this.handleSubmit}>
              <label>
              <p>Liczba miejsc:</p>
              <input type = "text" value = {this.state.value} onChange = {this.handleChange} />
              </label><br/>
              <label> 
                <input type = "checkbox" class = "checkbox"/>
                <p>Czy miejsca mają być obok siebie?</p>          
              </label><br/>
              <input type = "submit" className = "btn" value = "Wybież miejsca" />
          </form>
        </div>
      );
    }
  }

  

  const App = () => {
    return (
         <div>
            <NameForm/>
         </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'))


/*Komponent funkcyjny (Bezstanowy)
const SectionOne = () => {
    return (
        <div>
            <p>Liczba miejsc: </p> 
            <input type type="text"> </input>

        </div>
    )
}
const SectionTwo = () => {
    return(
        <div>      
            <input type="checkbox" > </input>
            <p>Czt miwjsca mają być koło siebie?</p>
        </div>

    )
}
const SectionThre = () => {
    return(
        <button type="button">Wubież miejsca</button>
    )
}
const App = () => {
    return (
         <div>
            <SectionOne/>
            <SectionTwo/>
            <SectionThre/>
         </div>
           
           
    )
}
ReactDOM.render(<App/>, document.getElementById('root'))
*/