import react, { useState } from 'react';
import './PlayList.modules.css';
import cx from 'classnames';
import gamesList from '../../games.json';
import GameItem from '../GameItem/GameItem.js';
import AddNewGame from '../AddNewGame/AddNewGame.js';

function buildRamdomId(){
    return Math.floor(Math.random() * 10e6);
}

function PlayList() {
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 20;
    const [games, setGames] = useState(gamesList);

    const lastGameIndex = currentPage * gamesPerPage;
    const firstGameIndex = lastGameIndex - gamesPerPage;
    const currentGame = games.slice(firstGameIndex, lastGameIndex);
    const pagesCount = Math.ceil(games.length / 20);

    const nextPage = () => {
        setCurrentPage(prev => Math.min(pagesCount, prev + 1));
    }
    const prevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    }
    const firstPage = () => {
        setCurrentPage(1);
    }
    const lastPage = () => {
        setCurrentPage(pagesCount);
    }

    const editGameTitle = (id, title) => {
        setGames(prevGames => prevGames.map(game => game.id === id ? ({ ...game, title }) : game));
    }

    const editGameCompleted = (id, completed) => {
        setGames(prevGames => prevGames.map(game => game.id === id ? ({ ...game, completed }) : game));
    }

    const deleteGame = (id) => {
        setGames(prevGames => prevGames.filter( game => game.id !==id));
    }

    const addGame = (title) => {
        setGames(prevGames => [{
            "userId": 1,
            "id": buildRamdomId(),
            "title": title,
            "completed": false
          }, ...prevGames]);
    }

    return (
        <section className="playlist">
            <h1 className="playlist__title">Community playlist</h1>
            <div className="playlist__container">
                <div className="playlist__header">
                    <span className="playlist__header_label">Game title</span>
                    <span className="playlist__header_label">Status</span>
                </div>
                <AddNewGame onAdd={addGame} />
                <GameItem
                    games={currentGame}
                    onDelete={deleteGame}
                    onEditTitle={editGameTitle}
                    onEditCompleted={editGameCompleted}
                />

                <div className="pagination">
                    <button onClick={firstPage} className={cx('pagination__btn', currentPage==1 && 'disabled')}> &lt;&lt; </button>
                    <button onClick={prevPage} className={cx('pagination__btn', currentPage==1 && 'disabled')}> &lt; Prev page</button>
                    <button onClick={nextPage} className={cx('pagination__btn', currentPage==pagesCount && 'disabled')}>Next page &gt;</button>
                    <button onClick={lastPage} className={cx('pagination__btn', currentPage==pagesCount && 'disabled')}>&gt;&gt;</button>
                </div>
            </div>
        </section>
    );
}

export default PlayList;