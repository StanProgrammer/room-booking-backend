const Room = require('../models/Room')

exports.getRooms = async(req,res)=>{
    try {
        
        const rooms = await Room.find()
        res.json(rooms)
    } catch (error) {
        res.status(500).send('Server error')
    }
}

exports.bookRoom = async (req, res) => {
  const { roomId, date, slots } = req.body;
  console.log(req.user.user.id)
  const userId = req.user.user.id
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    // Find the booking for the specified date
    const bookingIndex = room.bookings.findIndex(booking => booking.date === date);

    if (bookingIndex > -1) {
      // If the booking exists for the date, add the slots
      room.bookings[bookingIndex].slots = room.bookings[bookingIndex].slots.concat(
        slots.map(slot => ({ time: slot, userId }))
      );
    } else {
      // If the booking does not exist for the date, create a new booking entry
      room.bookings.push({
        date,
        slots: slots.map(slot => ({ time: slot, userId }))
      });
    }

    await room.save();
    res.json(room);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
