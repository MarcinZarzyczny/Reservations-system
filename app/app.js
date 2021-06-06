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
      this.setState({checkbox: event.target.value});
    }


    handleSubmit(event) {

      if(this.state.value <= 50 && this.state.value > 0){
        const conteiner = document.getElementsByClassName("conteiner");
        conteiner[0].style.visibility = "hidden";
        alert(this.state.checkbox);
      }else if (this.state.value > 50){
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
    render() {
      var chairStyle = {
        margin: 5,
        display: "inline-block",
        border: "2px solid",
        borderColor: this.props.boColor,
        backgroundColor: this.props.bgColor,
        color: "red",
        width: 70,
        height: 70
      };
      return (
      <div style = {chairStyle}></div>
      );
    }
  }
  var map = [
    0, 0, 1, 1, 1, 0, 1, 1, 2, 2, 0, 1, 1, 1, 1,
    0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1,
    0, 0, 1, 1, 1, 0, 3, 3, 3, 1, 0, 2, 2, 1, 1,
    2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 2, 2, 1, 1, 0, 1, 1, 2, 2
  ];
  var chair = [
    { colour: '#FFFFFF', border : "#FFFFFF"},
    { colour: '#FFFFFF', border : "#545352"},
    { colour: '#545352', border : "#545352"},
    { colour: '#FF8927', border : "#545352"}
  ];
  var renderChair= [];
  var namberChair = 0; 



  for (var index = 0; index < map.length; index++) {
    if (map[index] > 3 || map[index] < 0){
      alert("Błąd mapy. Numer pozycji: " + index)
      breyk;
    }else{ 
      if (map[index] == 0){
        renderChair.push(<Chair key={index} bgColor= {chair[0].colour} boColor= {chair[0].border}/>);
      }else if (map[index] == 1){
        namberChair++;
        renderChair.push(<Chair key={index} bgColor= {chair[1].colour} boColor= {chair[1].border}/>);
      }else if  (map[index] == 2){
        namberChair++;
        renderChair.push(<Chair key={index} bgColor= {chair[2].colour} boColor= {chair[2].border}/>);
      }else if (map[index] == 3){
        namberChair++;
        renderChair.push(<Chair key={index} bgColor= {chair[3].colour} boColor= {chair[3].border}/>);
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

  function Room() {
    return (
      <>
       <div  className = "room">
        {renderChair}
        <Legends/>
      </div>
      </>
    );
  }

  const App = () => {
    return (
      <>
       <Room/>
      </>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'))