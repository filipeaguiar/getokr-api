'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    hash: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    insertDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    isAdministrator: {
        type: Boolean
    },
    canCreate: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    companies: [{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],
    customize: {
        progressBar: [{
            begin: Number,
            end: Number,
            color: String
        }]
    },
    password_token: {
        expires: String,
        token: String
    },
    oauthClients: [{
        type: Schema.Types.ObjectId,
        ref: 'OAuthClient'
    }]
});

UserSchema.pre('save', function(next) {
    var user = this;

	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports.UserSchema = UserSchema;
module.exports.User = mongoose.model('User', UserSchema);
