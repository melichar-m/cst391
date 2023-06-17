import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SearchAlbum from './SearchAlbum';
import NavBar from './NavBar';
import NewAlbum from './NewAlbum';
import OneAlbum from './OneAlbum';
import Card from './Card';
import './App.css';
import albums from './albums.json';

const App = () => {
  const [albumList, setAlbumList] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);
  let refresh = false;

  const loadAlbums = async () => {
    const response = await dataSource.get('./albums');
    setAlbumList(response.data);
  };

  useEffect(() => {
    loadAlbums();
  }, [refresh]);

  const updateSearchResults = async (phrase) => {
    console.log('phrase is ' + phrase);
    setSearchPhrase(phrase);
  };

  const updateSingleAlbum = (id, navigate) => {
    console.log('id is ' + id);
    console.log('navigate is ' + navigate);
    var indexNumber = 0;
    for (var i = 0; i < albumList.length; ++i) {
      if (albumList[i].id === id) indexNumber = i;
    }
    setCurrentlySelectedAlbumId(indexNumber);
    console.log('update path', '/show/' + indexNumber);
    navigate('/show/' + indexNumber);
  };

  console.log('albumList', albumList);
  const renderedList = albumList.filter((album) => { 
    if ( 
      album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      searchPhrase === ''
    ) {
      return true;
    }
    return false;
  });

  console.log('renderedList', renderedList);

  return(
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route 
          exact
          path='/'
          element={<SearchAlbum 
            updateSearchResults={updateSearchResults}
            updateSingleAlbum={updateSingleAlbum}
            albumList={renderedList}
            />
        }
      />
      <Route exact path='/new' element={<NewAlbum />} />
      <Route
        exact
        path='/show/:albumId'
        element={<OneAlbum album={albumList[currentlySelectedAlbumId]} />}
      />
    </Routes>
  </BrowserRouter>
  );
};

export default App;