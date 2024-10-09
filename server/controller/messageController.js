const Message = require('../model/message');
const User = require('../model/user');

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or receiver not found' });
    }
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    });

    await message.save();
    req.io.to(req.connectedUsers[receiverId]).emit('receiveMessage', {
      sender: senderId,
      content,
      createdAt: message.createdAt,
    });

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get messages' });
  }
};
