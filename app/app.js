class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            value: '',
            mnessage: '',
                
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {

      if(this.state.value <= 50 && this.state.value > 0){
        const conteiner = document.getElementsByClassName("conteiner");
        conteiner[0].style.visibility = "hidden";
      }else if (this.state.value > 50){
        this.setState({
          mnessage: "Nie mamy sal z tyloma miejsacami siedzącymi.\n Skontaktuj się z recepcją."
        })
      }else if(this.state.value == 0){
        this.setState({
          mnessage: "Prosimy wybrać przyjajmniej jedno miejsce."
        })
      }else{
        this.setState({
          mnessage: "Prosimy podać liczbę miejsc."
        })

      }
      event.preventDefault();
    }
    render() {
      return (
        <div class = "conteiner">
          <div class = "conteinerTwo">
           <p class ="message">{this.state.mnessage}</p>
            <form onSubmit = {this.handleSubmit}>
              <label>
                <p>Liczba miejsc:</p>
                <input type = "text" maxlength="5" value = {this.state.value} onChange = {this.handleChange} />
              </label><br/>
              <label> 
                <input type = "checkbox" class = "checkbox"/>
                <p>Czy miejsca mają być obok siebie?</p>          
              </label><br/>
              <input type = "submit" className = "btn" value = "Wybież miejsca" />
            </form>
          </div>
        </div>
      );
    }
  }
  const App = () => {
    return (
      <>
        <NameForm/>
      </>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'))