const sql = require('mssql');


const config = {
    connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;'
  };

  module.exports = {
      GetALLPosts: async (req, res) => {    
       try {
        const pool = await sql.connect(config);
        if(pool.connected){
             const result = await pool.query('SELECT * FROM Posts');
             res.json(result.recordset);
        }else{
            res.status(500).json({message: 'Error connecting to database'});
        }
       
       } catch (err) {
        res.status(500).send(err.message);
      }
      },


      CreatePost: async (req, res) => {
         const { author, content, imageUrl, videoUrl } = req.body;
         try {
        const result = await sql.query`
            INSERT INTO Posts (Author, Content, ImageUrl, VideoUrl)
            VALUES (${author}, ${content}, ${imageUrl}, ${videoUrl})
            SELECT * FROM Posts WHERE Id = SCOPE_IDENTITY();
        `;
        res.status(201).json(result.recordset[0]);
       } catch (err) {
        res.status(500).send(err.message);
       }
      },

      UpdatePost: async (req, res) => {
        const { content, imageUrl, videoUrl } = req.body;

        const { id } = req.params;

       try {
         const pool = await sql.connect(config);
          if(pool.connected){
           const result = await pool.query(`UPDATE Posts SET Content = ${content}, ImageUrl = ${imageUrl}, VideoUrl = ${videoUrl} WHERE Id = ${id}`);
          if(result.recordset[0]>1){
          res.status(204).json(result.recordset);
              }else{
           res.json({
            status: "0",
            message: "done",
            result: result.data
            })
           }

            res.sendStatus(204);

                }   else{
                res.status(500).json({message: 'Error connecting to database'});
                } 

   
    
             } catch (err) {
             res.status(500).send(err.message);
                }
             },

             DeletePost: async (req, res) => {
                const { id } = req.params;
             const pool = sql.connect(config);
             if(pool.connected){
              try {
            await sql.query`
              DELETE FROM Posts
              WHERE Id = ${id};
              `;
                res.json({
            status:"ok",
             message: "successfully deleted",
            });
              } catch (error) {
                 res.status(500).send(error.message);
            }
                }else{
             res.status(500).json({message: 'Error connecting to database'});
    }
   
 }
};


