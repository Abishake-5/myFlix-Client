import React from 'react';
// Movie view stylesheet
import './movie-view.scss';

export class MovieView extends React.Component {
    //render movie view
    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie" >
                <div>
                    <img src={movie.ImagePath} crossOrigin="anonymous" className='image' />
                </div >
                <div className="title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <button onClick={() =>{onBackClick(null)}}>Back</button>
            </div>
        )
    }
};