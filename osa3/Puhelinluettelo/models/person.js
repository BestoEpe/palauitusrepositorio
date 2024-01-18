const mongoose = require('mongoose');

// Enhanced Person schema with additional fields and nested structures
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\\d{2,3}-\\d+/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    street: String,
    city: String,
    postalCode: String
  },
  // Additional fields can be added here
});

// Custom instance method
personSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Custom static method
personSchema.statics.findByCity = function(city) {
  return this.find({ 'address.city': city });
};

// Virtual property for full address
personSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.postalCode}`;
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;