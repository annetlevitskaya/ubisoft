import React, { Component } from 'react';
import './GameItem.modules.css';
import deleteIcon from '../../img/delete.svg';
import closeIcon from '../../img/close.svg';

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
        this.setState({ idToEdit: id, gameTitle: title });
    }

    handleTitleChange = (e) => {
        this.setState({ gameTitle: e.target.value });
    };

    handleBlur = () => {
        const { gameTitle, idToEdit } = this.state;
        this.props.onEditTitle(idToEdit, gameTitle);
        this.setState({ idToEdit: null, gameTitle: ''});
    }

    handleCompletedChange = (id, completed) => {
        console.log('\n\n\n',id);
        this.props.onEditCompleted(id, completed)
    }

    render() {
        const { games } = this.props;
        const {isPopupOpen, idToEdit} = this.state;
        
        return (
            <>
                {games.map((game) => (
                    <section key={game.id} className="playlist__item">
                        <div className="playlist__item_left">
                            <input
                                type="checkbox"
                                id={`checkbox-${game.id}`}
                                className="playlist__item_checkbox"
                                checked={game.completed}
                                onChange={() => this.handleCompletedChange(game.id, !game.completed)}
                            />
                            <label htmlFor={`checkbox-${game.id}`} className="playlist__item_checkbox_label"></label>
                                {idToEdit === game.id ? (
                                    <input
                                        type='text'
                                        className="playlist__item_title--edit"
                                        value={this.state.gameTitle}
                                        onChange={this.handleTitleChange}
                                        onBlur={this.handleBlur}
                                    />
                                ) : (
                                    <span className="playlist__item_title" onClick={() => this.openInput(game.id, game.title)}>{game.title}</span>
                                )} 
                        </div>
                        <div className="playlist__item_right">
                            {game.completed===true ? (
                                <span className="playlist__item_status playlist__item_status--finish">Complete</span>
                            ) :
                                <span className="playlist__item_status playlist__item_status--play">to play</span>
                            }
                            <img src={deleteIcon} className="playlist__item_delete" onClick={() => this.handleClick(game.id)}/>
                        </div>
                    </section>
                ))}

                {isPopupOpen && 
                    <div className="popup">
                        <div className="popup__container">
                            <button className="popup__close" onClick={this.handleClick}>
                                <img src={closeIcon} />
                            </button>
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