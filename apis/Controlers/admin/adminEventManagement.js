const { query } = require('../db');


module.exports = {
  GetAllEvents: async (req, res) => {
    try {
      const result = await query('SELECT * FROM Events');  
      if (result.length === 0) {
        return res.status(200).json(result);
           }
      res.status(200).json(result);
  
    } catch (err) {
      console.error("Error fetching events:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  

  NewEvent: async (req, res) => {

    const { eventName, eventDate,status ,descriptions, difficulty, duration ,eventTime ,instructor} = req.body;
    try {
      const result = await query(
        'INSERT INTO Events (EventName, EventDate, Status,Descriptions, Difficulty, Duration ,EventTime ,Instructor) VALUES(?,?,?,?,?,?,?,?)', [eventName, eventDate, status,descriptions, difficulty, duration ,eventTime ,instructor]
      );
      res.status(201).send("Event added successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  DeleteEvent: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await query('DELETE FROM Events WHERE id = ? ', [id]);
      if (result.affectedRows > 0) {
        res.status(200).send('Event deleted successfully');
      } else {
        res.status(404).json({ message: 'Event not found' });
      }

      res.send("Event deleted successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
