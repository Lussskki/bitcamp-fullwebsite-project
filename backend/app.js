import pg from 'pg'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const {Pool} = pg

const pool = new Pool ({
    'user':'<insert your user>',
    'host':'localhost',
    'database':'movies',
    'password':'i<insert your password>',
    'port': 5432
})


const app = express()
app.use(bodyParser.json())
app.use(cors())

//get method
app.get('/',async (req,res,next)=>{
    const client = await pool.connect()
    const result = await client.query({
        text:`SELECT * FROM movieslist ORDER BY id desc`
    })
    res.json(result.rows)
})
//post method
app.post('/', async (req,res,next)=>{
    const movie = req.body

   const client = await pool.connect()
   const result = await client.query({
        text: `INSERT INTO movieslist
        (title,genre,director,release_data,cover_image_url)
        VALUES ($1,$2,$3,$4,$5) RETURNING id;`,
        values: [
            movie.title,
            movie.genre,
            movie.director, 
            movie.release_data,
            movie.cover_image_url
        ]  
    })
    const resultjson = {
        id: result.rows[0],
        message:`Aded Movie:${movie.title} to Database` 
    }
    
    res.json(resultjson)

}) 
//put method
app.put('/:id', async (req,res,next)=>{
    const id = req.params.id
    const updatedMovie = req.body

    const client = await pool.connect()
    const result = await client.query({
        text:`UPDATE movieslist
        SET title = $1, genre = $2, director = $3,
        release_data = $4, cover_image_url = $5 
        WHERE id =$6;`,
        values:[
            updatedMovie.title,
            updatedMovie.genre,
            updatedMovie.director,
            updatedMovie.release_data,
            updatedMovie.cover_image_url,
            id
        ]
    })
    res.send(`Movie ${updatedMovie.title} has been Updated in the Database`)
})
//delete method
app.delete('/:id', async (req,res,next)=>{
    const id = req.params.id
    const client = await pool.connect()
    const result = await client.query({
        text:`DELETE FROM movieslist
        WHERE id =$1`,
        values:[id]
    })
    let message = ""
    if(result.rowCount=== 0 ){
         res.status(400).send(`No movie with this id ${id},There is not record in database`)
    }else{
        res.send(`Movie with the id ${id} deleted from database`)
    }

})
 
   
    

app.listen(3000,()=>{
    console.log('Server listens on port 3000')
})
