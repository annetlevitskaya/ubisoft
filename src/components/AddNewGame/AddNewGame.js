import React, { Component } from 'react';
import './AddNewGame.modules.css';
import plusImg from "../../img/plus.svg";

class AddNewGame extends Component {
    state = {
        gameName: '',
    }

    addNewGame = () => {
        this.props.onAdd(this.state.gameName);
        this.setState({gameName: ''});
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({gameName: e.target.value});
    } 

    render() {
        return (
            <section className="playlist__add">
                <button className="playlist__add_btn">
                    <img src={plusImg} onClick={this.addNewGame} />
                </button>
                <input type="text" placeholder="Add new game" className="playlist__add_input" onChange={this.handleChange} value={this.state.gameName}/>
            </section>
        );
    }
}

export default AddNewGame;