const mongoose = require('mongoose')
const Room = require('./models/Room')
async function addFixedRooms() {
    const rooms = [
        { name: 'Room1', features: ['Projector', 'Sound'], capacity: 150 },
        { name: 'Room2', features: ['WiFi'], capacity: 5 },
        { name: 'Room3', features: ['Projector'], capacity: 15 },
        { name: 'Room4', features: ['WiFi', 'Whiteboard', 'Conference Phone'], capacity: 6 },
        { name: 'Room5', features: ['large screen ', 'Sound'], capacity: 100 }
    ];

    try {
        await mongoose.connect('mongodb+srv://atib:1234@book.3ysau0k.mongodb.net/?retryWrites=true&w=majority&appName=book', { useNewUrlParser: true, useUnifiedTopology: true });

        // Check if rooms already exist to prevent duplicates
        for (let room of rooms) {
            const existingRoom = await Room.findOne({ name: room.name });
            if (!existingRoom) {
                const newRoom = new Room(room);
                await newRoom.save();
                console.log(`Added ${room.name} to the database.`);
            } else {
                console.log(`${room.name} already exists in the database.`);
            }
        }

        console.log('All rooms have been processed.');
    } catch (error) {
        console.error('Error adding rooms to the database:', error);
    } finally {
        await mongoose.disconnect();
    }
}

// Call the function to add the fixed rooms
addFixedRooms();