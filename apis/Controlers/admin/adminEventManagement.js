const sql = require('mssql');

const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;'
};;

module.exports = {
  GetAllEvents: async (req, res) => {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query("SELECT * FROM Events");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  NewEvent: async (req, res) => {
    const { eventName, eventDate } = req.body;
    try {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("eventName", sql.NVarChar, eventName)
        .input("eventDate", sql.Date, eventDate)
        .input("status", sql.NVarChar, "Scheduled")
        .query(
          "INSERT INTO Events (eventName, eventDate, status) VALUES (@eventName, @eventDate, @status)"
        );

      res.status(201).send("Event added successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  DeleteEvent: async (req, res) => {
    const { id } = req.params;
    try {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("id", sql.UniqueIdentifier, id)
        .query("DELETE FROM Events WHERE id = @id");

      res.send("Event deleted successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
