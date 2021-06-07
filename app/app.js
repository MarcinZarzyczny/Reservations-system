
   let data;
   let seats;
   //Utworzenie obiektu XMLHttpRequestObiect.
   function getXMLHttpRequestObiect(){
     try{
       return new XMLHttpRequest();			
     }catch(e){
       try{
         return new ActiveXObiect("Microsoft.XMLHTTP");
       }catch (e){
         return false;
       }
     }
   }
   function processTheData(seats){
    if(XMLHttpRequestObiect){
     if(XMLHttpRequestObiect.readyState== 4 && XMLHttpRequestObiect.status == 200){
         data = XMLHttpRequestObiect.responseText;
         seats = JSON.parse(data);
         RenderingMap(seats);
       }
     }
   }
   function downloadData(){
     if(XMLHttpRequestObiect){
       XMLHttpRequestObiect.open("GET", "/db.json");//
       XMLHttpRequestObiect.onreadystatechange= processTheData;
       XMLHttpRequestObiect.send(null);
     }
   }
   var XMLHttpRequestObiect = getXMLHttpRequestObiect();
   downloadData();

function RenderingMap(seats){ 
  let map = [
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 1, 1, 3, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1]
  ];

  console.log(seats.seats.length)
  for(var index = 0; index < seats.seats.length; index++){
    if(seats.seats[index].cords.x < 7 && seats.seats[index].cords.y < 15){
       if(seats.seats[index].reserved == true && map[seats.seats[index].cords.x][seats.seats[index].cords.y] !=0){
        console.log(map[seats.seats[index].cords.x][0]);
        map[seats.seats[index].cords.x][seats.seats[index].cords.y] = 2;
      }
    }
  }  
  const chair = [
    { colour: '#FFFFFF', border : "#FFFFFF"},
    { colour: '#FFFFFF', border : "#545352"},
    { colour: '#545352', border : "#545352"},
    { colour: '#FF8927', border : "#545352"}
  ];
  let renderChair = [];
  let numberCheir = 0;
  let customerChoice = [];
  let theNumberOfSeats = 0;
  let chekbox = false;

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
        chekbox= this.state.checkbox;
      }


      handleSubmit(event) {

        if(this.state.value <= 77 && this.state.value > 0){
          const conteiner = document.getElementsByClassName("conteiner");
          theNumberOfSeats= this.state.value;
          
          conteiner[0].style.visibility = "hidden";
        }else if (this.state.value > 77){
          this.setState({
            mnessage: "Nie mamy sali z taką ilością miejsc siedzących.\n Skontaktuj się z recepcją."
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
                  <input type = "text" maxLength = "2" value = {this.state.value} onChange = {this.handleChange} />
                </label><br/>
                <label> 
                  <input type = "checkbox" className = "checkbox" onChange = {this.handleCheckbox}/>
                  <p>Czy miejsca mają być obok siebie?</p>          
                </label><br/>
                <input type = "submit" className = "btn" value = "|Wybierz miejsca" />
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
          row: this.props.row,
          number: this.props.number,
          selected: this.props.selected,
          boxShadow: this.props.boxShadow,
          bgColor:  this.props.bgColor
        };
        this.reserveSpace = this.reserveSpace.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLive = this.mouseLive.bind(this);

      }

      mouseEnter(e){
        if(this.state.status == "true" && this.state.selected == false){
          this.setState({
            bgColor: "#c0bcbc"
          });
        }
      }
      mouseLive(e){
        if(this.state.status == "true" && this.state.selected == false){
          this.setState({
            bgColor: "#FFFFFF"
          });
        }
      }
      reserveSpace(e) {
        if(this.state.status == "true" && this.state.selected == false && customerChoice.length < theNumberOfSeats){
          customerChoice.push([this.state.row, this.state.number ]);
          this.setState({
            selected: true,
            bgColor: "#FF8927"
          });
        }else if(this.state.status == "true" && this.state.selected == true ){
          for( var index = 0; index < customerChoice.length; index++){
            if(customerChoice[index][1] == this.state.number){
              customerChoice.splice(index, 1);
              this.setState({
                selected: false,
                bgColor: "#FFFFFF"
              }); 
            }
          }
        }else if (this.state.status == "true" && this.state.selected == false && customerChoice.length >= theNumberOfSeats){
          alert("Przekroszyłeś ilość deklarowanych miejsc!!!");
          customerChoice.push([this.state.row, this.state.number ]);
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
          boxShadow: this.state.boxShadow,
          width: 70,
          cursor: "pointer",
          height: 70
        };
        return (
        <div style = {chairStyle} onMouseEnter = {this.mouseEnter} onMouseLeave = {this.mouseLive} onClick = {this.reserveSpace}></div>
        );
      }
    }
    var keyIndeks = 0;
  function renderMap(map){
      for (var index = 0; index < map.length; index++){
        for(var indexTwo = 0; indexTwo < map[index].length; indexTwo++){
          if (map[index][indexTwo] > 3 || map[index][indexTwo] < 0){
            alert("Błąd mapy. Numer pozycji: " + index + " , " + indexTwo + ".")
            breyk;
          }else{ 
            if (map[index][indexTwo] == 0){
              keyIndeks++;
              renderChair.push(<Chair key={keyIndeks} boxShadow = "10px 1px 1px #FFFFFF" bgColor = {chair[0].colour} boColor = {chair[0].border}/>);
            }else if (map[index][indexTwo] == 1){
              numberCheir++;
              keyIndeks++;
              renderChair.push(<Chair key={keyIndeks} row={index + 1} selected= {false} status = "true" boxShadow="2px 2px 5px #545352" number = {numberCheir} bgColor = {chair[1].colour} boColor = {chair[1].border}/>);
            }else if (map[index][indexTwo] == 2){
              numberCheir++;
              keyIndeks++;
              renderChair.push(<Chair key={keyIndeks} number = {numberCheir} boxShadow = "2px 1px 1px #FFFFFF" bgColor = {chair[2].colour} boColor = {chair[2].border}/>);
            }else if (map[index][indexTwo] == 3){
              numberCheir++;
              keyIndeks++;
              renderChair.push(<Chair key={keyIndeks}  row={index + 1} selected ={true} status = "true" number = {numberCheir} boxShadow = "2px 2px 5px #545352" bgColor = {chair[3].colour} boColor = {chair[3].border}/>);
              customerChoice.push([index, numberCheir]);
            }
          }
        }
      }
    }
    renderMap(map);

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
            boxShadow: "2px 2px 5px #545352",
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
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLive = this.mouseLive.bind(this);
      }

      mouseEnter(e){
        this.setState({
          bgColor: "#c0bcbc"
        });
      }
      mouseLive(e){
        this.setState({
          bgColor: "#FFFFFF"
        });
      }
      reserveSpace(e) {
        this.setState({
            bgColor: "#545352"
          });
        if(customerChoice.length > 0 ){
          alert("Rezerwacja przyjęta. Numer rezerwacji: " + customerChoice);
        }else{
          alert("|Wybierz przynajmniej jedno miejsce.");
        }  
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
            cursor: "pointer",
            boxShadow: "2px 2px 5px #545352",
            borderRadius: 50,
            fontSize: 20
        };
        return (
          <button onClick={this.reserveSpace} onMouseEnter = {this.mouseEnter} onMouseLeave = {this.mouseLive} style = {battonStyle}>Rezerwuj</button>
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
       {/*} <NameForm/>*/}
        <Room/>
        </>
      )
  }
  ReactDOM.render(<App/>, document.getElementById('root'))
}