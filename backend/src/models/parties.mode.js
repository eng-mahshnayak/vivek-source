const mongoose = require('mongoose');


function toTitleCase(str) {
  if (!str) return str;
  return str
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Customer Schema (Parties) - COMPLETE SINGLE SCHEMA
const partySchema = new mongoose.Schema({
   
    // Company/Business Information
    companyName: {
        type: String,
        set: toTitleCase,
        required: [true, 'Company/Business name is required'],
        trim: true,
        unique: true
    },
    companyGST: {
        type: String,
        uppercase:true,
        required: [true, 'companyGST name is required'],
        trim: true,
        unique: true
    },
    
    displayName: {
        type: String,
        set: toTitleCase,
        trim: true
    },
    
    // Contact Information
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    alternatePhone: String,

    // Address Information
    billingAddress:String,
    
    // Status and Classification
    status: {
        type: String,
        // enum: ['active', 'inactive', 'blocked', 'pending'],
        default: 'active'
    },
    // Notes and Tags
    notes: {
        type: String,
         set: toTitleCase,
        maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
}, {
    timestamps: true
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;