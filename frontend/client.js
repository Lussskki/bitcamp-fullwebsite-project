async function getMovies () {
   const response = await fetch('http://localhost:3000')
   const movies = await response.json()

  return movies
}

async function deleteMovie (id){
  const response = await fetch(`http://localhost:3000/${id}`,{
    method:'DELETE',
    headers: {
        'Accept': 'application/json',
      }
})
}