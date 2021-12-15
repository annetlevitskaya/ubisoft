import React, { Component } from 'react';
import './GameItem.modules.css';
import deleteIcon from '../../img/delete.svg';

class GameItem extends Component {
    state = {
        isPopupOpen: false,
        idToRemove: null,
        gameTitle: '',
        idToEdit: null,
    }

    handleClick = (id) => {
        if (this.state.isPopupOpen) {
            this.setState({ isPopupOpen: false, idToRemove: null });
        } else {  
            this.setState({ isPopupOpen: true, idToRemove: id});
        }
    }

    handleDelete = () => {
        this.props.onDelete(this.state.idToRemove);
        this.setState({ isPopupOpen: false, idToRemove: null });
    }

    openInput = (id, title) => {
        if (this.state.idToEdit) {
            this.setState({ idToEdit: null, gameTitle: ''});
        } else {  
            this.setState({ idToEdit: id, gameTitle: title });
        }
    }

    handleEdit = () => {
        
    }

    render() {
        const { games } = this.props;
        const {isPopupOpen, idToEdit} = this.state;
        
        return (
            <>
                {games.map((game) => (
                    <section className="playlist__item">
                    <div className="playlist__item_left">
                        <input type="checkbox" id="checkbox" className="playlist__item_checkbox" />
                        <label for="checkbox" className="playlist__item_checkbox_label"></label>
                            {idToEdit===game.id ? 
                                <input type='text' className="playlist__item_title--edit" value={this.state.gameTitle} onChange={this.handleEdit}/>
                                :
                                <span className="playlist__item_title" onClick={() => this.openInput(game.id, game.title)}>{game.title}</span>
                            } 
                    </div>
                    <div className="playlist__item_right">
                        <span className="playlist__item_status">to play</span>
                        <img src={deleteIcon} className="playlist__item_delete" onClick={() => this.handleClick(game.id)}/>
                    </div>
                    </section>
                ))}
                {isPopupOpen && 
                    <div className="popup">
                        <div className="popup__container">
                            <button className="popup__close">x</button>
                            <h5 className="popup__text">Are you sure you want to delete this item?</h5>
                            <div className="popup__controls">
                                <button className="popup__controls_delete" onClick={this.handleDelete}>Yes, delete</button>
                                <button className="popup__controls_cancel" onClick={this.handleClick}>Cancel</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default GameItem;