const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Assuming you have this package installed

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, 'Password hash is required']
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
});

userSchema.plugin(uniqueValidator); // Ensure usernames are unique

// Add virtual field for blog count
userSchema.virtual('blogCount').get(function() {
  return this.blogs.length;
});

// Custom toJSON method to modify the object returned
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // Ensure password hash is not sent
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
