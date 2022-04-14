import React, { Component } from 'react';

const Newsitem=(props)=>{
        let { title, desc, url, newsurl, author, date ,source} = props;
        return <div>
            <div className="card" >
                <img src={!url ? "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" : url} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
                        {source}
                    </span>
                    <p className="card-text">{desc}</p>
                    <p className="card-text"><small className="text-muted">BY {!author ? "Unknown" : author} ON {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} target="_blank" className="btn btn-dark">Go somewhere</a>
                </div>
            </div>
        </div>;
    }


export default Newsitem;
