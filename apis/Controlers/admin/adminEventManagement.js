const { query } = require('../db');


module.exports = {
  GetAllEvents: async (req, res) => {
    try {
      let result = await query('SELECT * FROM Events');
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  NewEvent: async (req, res) => {
    const { eventName, eventDate,status } = req.body;
    try {
      const result = await query(
        'INSERT INTO Events (eventName, eventDate, status) VALUES(?,?,?)', [eventName, eventDate, status]
      );
      console.log(result);

      res.status(201).send("Event added successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  DeleteEvent: async (req, res) => {
    const { eventName } = req.body;
    try {
      const result = await query('DELETE FROM Events WHERE eventName = ? ', [eventName]);
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
