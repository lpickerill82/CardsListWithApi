import React from 'react';
import axios from 'axios';
import './App.css';

const Card = (card) => {
    return (
        <div className="card">
            <img src={card.avatar_url} width="75px" className="avatar" alt="img" />
            <div className="info">
                <div>{card.name}</div>
                <div>{card.company}</div>
            </div>
        </div>
    );
};


const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card} />)}

        </div>
    );
}

class Form extends React.Component {
    state = { userName: '' }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
              //  console.log(resp, this.state.userName, this.state.id);
                this.props.onSubmit(resp.data)
            });
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.userName} placeholder="Search by User name "
                    onChange={(event) => this.setState({ userName: event.target.value })} type="text"  required />
                <button type="submit">Add Card</button>
            </form>
        );
    }
}
class App extends React.Component {
    state = {
        cards: [
    
        ]
    };


    addNewCard = (cardInfo) => {
        var foundMatch=false;
       
        for (var i = 0; i < this.state.cards.length; i++) {
            if (this.state.cards[i]["id"] === cardInfo["id"]) {
                foundMatch = true
            }
            else {
                foundMatch = false
            }
        }
      
       
        if (foundMatch === false) {
            this.setState(prevState => ({
                cards: prevState.cards.concat(cardInfo)
            }))
        }
        
    }

    render() {
        return (
            <div>

                <Form onSubmit={this.addNewCard}  />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}


export default App;
