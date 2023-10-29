import React, { useState } from 'react';
import axios from 'axios';

function Anime() {
  const [anime, setAnime] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.consumet.org/anime/9anime/info/spy-x-family.6ll19',
        {
          params: { id: 'spy-x-family.6ll19' },
        }
      );

      setAnime(response.data); // Use response.data to access the response content

    } catch (err) {
      console.error(err);
    }
  };

  console.log(anime);

  return (
    <>
      <button onClick={() => fetchData()}>Get anime</button>
      <h1>hello</h1>
    </>
  );
}

export default Anime;
