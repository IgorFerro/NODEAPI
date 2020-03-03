const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email:{
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    role:{
    type: String,
    enum: ['user','guide','lead-guide', 'admin'],
    default: 'user'

    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate:{
            //This only works on CREATE SAVE
            validator: function(el){
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangeAt: Date
});

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    //Encrypt the password
    this.password = await bcrypt.hash(this.password, 12);
    //Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

//Function responsable to compare the passwords
userSchema.methods.correctPassword = async function (candidatePassword, userPassword){
 return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changePasswordAfter = function(JWTTimestamp){
    if (this.changePasswordAt){
        const changedTimestamp = parseInt(this.passwordChangeAt.getTime()/1000,10);
        
        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

//Create the model out of the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

