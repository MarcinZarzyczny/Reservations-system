let map = [
  0, 0, 1, 1, 1, 0, 1, 1, 2, 2, 0, 1, 1, 1, 1,
  0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1,
  0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2, 2, 1, 1,
  2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 2, 2, 1, 1, 0, 1, 1, 2, 2
];
const chair = [
  { colour: '#FFFFFF', border : "#FFFFFF"},
  { colour: '#FFFFFF', border : "#545352"},
  { colour: '#545352', border : "#545352"}
];
let renderChair = [];
let numberCheir = 0;
let customerChoice = [];
let theNumberOfSeats = 0;

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            value: '',
            mnessage: '',
            checkbox: 'fasle',
                
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleCheckbox = this.handleCheckbox.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
      
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleCheckbox(event){
      this.setState({checkbox: event.target.checked});
    }


    handleSubmit(event) {

      if(this.state.value <= 77 && this.state.value > 0){
        const conteiner = document.getElementsByClassName("conteiner");
        theNumberOfSeats= this.state.value;
        conteiner[0].style.visibility = "hidden";
        alert(this.state.checkbox);
      }else if (this.state.value > 77){
        this.setState({
          mnessage: "Nie mamy sali z tyloma miejsacami siedzącymi.\n Skontaktuj się z recepcją."
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
        <div className = "conteiner">
          <div className = "conteinerTwo">
           <p className ="message">{this.state.mnessage}</p>
            <form onSubmit = {this.handleSubmit}>
              <label>
                <p>Liczba miejsc:</p>
                <input type = "text" maxLength="2" value = {this.state.value} onChange = {this.handleChange} />
              </label><br/>
              <label> 
                <input type = "checkbox" className = "checkbox" onChange = {this.handleCheckbox}/>
                <p>Czy miejsca mają być obok siebie?</p>          
              </label><br/>
              <input type = "submit" className = "btn" value = "Wybież miejsca" />
            </form>
          </div>
        </div>
      );
    }
  }

  class Chair extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status:  this.props.status,
        number: this.props.number,
        selected: false,
        bgColor:  this.props.bgColor
      };
      this.reserveSpace = this.reserveSpace.bind(this);

    }

    reserveSpace(e) {
  

      if(this.state.status == "true" && this.state.selected == false && customerChoice.length < theNumberOfSeats){
        customerChoice.push(this.state.number);
        this.setState({
          selected: true,
          bgColor: "#FF8927"
        });
      }else if(this.state.status == "true" && this.state.selected == true ){
        for( var index = 0; index <= customerChoice.length; index++){
          if(customerChoice[index] == this.state.number){
            customerChoice.splice(index, 1);
            this.setState({
              selected: false,
              bgColor: "#FFFFFF"
            }); 
          }
        }
      }else if (this.state.status == "true" && this.state.selected == false && customerChoice.length >= theNumberOfSeats){
        alert("Przekroszyłeś ilość deklarowanych miejsc!!!");
        customerChoice.push(this.state.number);
        this.setState({
          selected: true,
          bgColor: "#FF8927"
        });
      }
    }
    render() {
      var chairStyle = {
        margin: 5,
        display: "inline-block",
        border: "2px solid",
        borderColor: this.props.boColor,
        backgroundColor: this.state.bgColor,
        color: "red",
        width: 70,
        height: 70
      };
      return (
      <div style = {chairStyle} onClick={this.reserveSpace}><p>{this.state.number}</p></div>
      );
    }
  }

  for (var index = 0; index < map.length; index++) {
    if (map[index] > 2 || map[index] < 0){
      alert("Błąd mapy. Numer pozycji: " + index)
      breyk;
    }else{ 
      if (map[index] == 0){
        renderChair.push(<Chair key={index} bgColor= {chair[0].colour} boColor= {chair[0].border}/>);
      }else if (map[index] == 1){
        numberCheir++;
        renderChair.push(<Chair key={index} status = "true" number = {numberCheir} bgColor= {chair[1].colour} boColor= {chair[1].border}/>);
      }else if  (map[index] == 2){
        numberCheir++;
        renderChair.push(<Chair key={index} number = {numberCheir} bgColor= {chair[2].colour} boColor= {chair[2].border}/>);
      }else if (map[index] == 3){
        numberCheir++;
        renderChair.push(<Chair key={index} number = {numberCheir} bgColor= {chair[3].colour} boColor= {chair[3].border}/>);
      }
    }
  }
  class Inf extends React.Component {
    render() {
      var infStyle = {
        margin: 5,
        marginTop: "50px",
        display: "inline-block",
        backgroundColor: "white",
        color: "red",
        width: 150,
        height: 70
      };
      return (
      <div style = {infStyle}>
        <p>tekst</p>
      </div>
      );
    }
  }
  class ChairTwo extends React.Component {
    render() {
        var cheirOne2 = {
          marginLeft: this.props.marginLeft,
          display: "inline-block",
          border: "2px solid",
          borderColor: "#545352",
          backgroundColor: this.props.bgColor,
          color: "red",
          width: 70,
          height: 70
      };
      return (
      <div style = {cheirOne2}>
      </div>
      );
    }
  }
  class Info extends React.Component {
    render() {
      var boxInf = {
        top: 0, 
        right: 0, 
        bottom: 0, 
        left: 0,
        position: "relative", 
        display: "inline-block",
        margin: "auto",
        marginLeft: 10,
        display: "inline-block",
        backgroundColor: this.props.bgColor,
        color: "black",
        width: this.props.widtch,
        height: 70,
        zIndex: 5
      };
      var inf = {
        padding: 2,
        position: "relative", 
        top: 30, 
        right: 0, 
        bottom: 0, 
        left: 5,
        float: "left",
        display: "inline-block",
        margin: "auto",
        zIndex: 6,
        fontWeight: "bold",
        color: "black",
        fontSize: 12

      }
      return (
        <div style = {boxInf}>
          <p style = {inf}>{this.props.txt}</p>
        </div>
      );
    }
  }

  
  class Legends extends React.Component {
    render() {
      var legendsStyle = {
        marginTop: 25,
        position: "relative", 
        display: "block",
        paddingTop: 5, 
        width: 795,
        height: 80
      };
      return (
      <div style = {legendsStyle}>
        <ChairTwo bgColor = {"#FFFFFF"} marginLeft = {5}/>
        <Info bgColor = {"FFFFFF"} widtch = {100} txt = {"Miejsce wolme"}/>
        <ChairTwo bgColor = {"#545352"} marginLeft = {100}/>
        <Info bgColor = {"FFFFFF"} widtch = {150} txt = {"Miejsca zarezerwowane"}/>
        <ChairTwo bgColor = {"#FF8927"} marginLeft = {100}/>
        <Info bgColor = {"FFFFFF"} widtch = {100} txt = {"Twój wybór"}/>
      </div>
      );
    }
  }
  class Button extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bgColor: "#FFFFFF"
      };

      this.reserveSpace = this.reserveSpace.bind(this);
    }

    reserveSpace(e) {
      this.setState({
          bgColor: "#545352"
        });
        alert('Klik działa.');
    }

    render() {
        var battonStyle = {
          width: 310,
          height: 70,
          display: "block",
          position: "relative",
          backgroundColor: this.state.bgColor,
          border: "2px solid #545352",
          float: "right",
          zIndex: 22,
          marginTop: -75,
          fontWeight: "bold",
          fontSize: 20
      };

      
      return (
        <button onClick={this.reserveSpace} style = {battonStyle}>Rezerwój</button>
      );
    }
  }

  function Room() {
    return (
      <>
       <div  className = "room">
        {renderChair}
        <Legends/>
        <Button/>
      </div>
      </>
    );
  }

  const App = () => {
    return (
      <>
      <NameForm/>
       <Room/>
      </>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'))