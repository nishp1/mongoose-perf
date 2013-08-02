
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    NO_USERS_TO_CREATE = 10000;

mongoose.connect('mongodb://localhost/mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
    prop1: String,
    prop2: String,
    prop3: String,
    prop4: String
});

var User = mongoose.model('Users', UserSchema);
testPerf();

// run perf test
function testPerf(Users) {
    var timeStr = 'Create ' + NO_USERS_TO_CREATE + ' Users',
        created = 0;

    console.time(timeStr);

    for(var i = 0; i < NO_USERS_TO_CREATE; i++) {

        var user = new User({
            first_name: 'First Name' + i,
            last_name: 'Last Name' + i,
            email: 'email..',
            phone: 'phone...',
            address: 'address...',
            prop1: 'prop1...',
            prop2: 'prop2...',
            prop3: 'prop3...',
            prop4: 'prop4...'
        });

        user.save(function (err) {
            created++;
            if(created === NO_USERS_TO_CREATE) {
                console.timeEnd(timeStr);
                
                User.collection.drop(function () {
                    console.log('collection dropped');
                    process.exit(0);
                });
            }
        });

    }

}