const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(() => console.log('Failed to connect to MongoDB !'));
    
    module.exports = mongoose;