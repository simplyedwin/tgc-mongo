// see all the databases
show databases

// we want to use an existing database
use sample_airbnb

// see all the collections
show collections

// display ALL documents from a collection
// db.<collection>.find()

db.listingsAndReviews.find();

// prettifiy the output
db.listingsAndReviews.find().pretty()

// projecting
// select which keys to display
db.listingsAndReviews.find({}, {
    name: 1,
    address: 1
}).pretty()

// project a key of an embedd document
db.listingsAndReviews.find({}, {
    name: 1,
    'address.country': 1
}).pretty()

// finding by criteria


// find all listings with exactly 5 beds
db.listingsAndReviews.find({
    beds: 5
}, {
    name: 1,
    beds: 1
}).pretty()

// find by a key in an embedded document
// (aka sub-document, aka nested object)
// find all listings in Brazil
db.listingsAndReviews.find({
    'address.country': 'Brazil'
}, {
    name: 1,
    'address.country': 1
}).pretty()

// multiple critera
// find listings that have 5 beds
// and 5 bedrooms
db.listingsAndReviews.find({
    beds: 5,
    bedrooms: 5
}, {
    name: 1,
    beds: 1,
    bedrooms: 1
}).pretty()

// find listings with 5 beds and 5 bedrooms
// and in Brazil
db.listingsAndReviews.find({
    beds: 5,
    bedrooms: 5,
    'address.country': 'Brazil'
}, {
    beds: 1,
    bedrooms: 1,
    'address.country': 1,
    name: 1
}).pretty()

// we want to find listings that have more than 3 beds
db.listingsAndReviews.find({
    beds: {
        '$gt': 3
    }
}, {
    name: 1,
    beds: 1
}).pretty()

// find listings with less than 4 beds
db.listingsAndReviews.find({
    beds: {
        '$lt': 4
    }
}, {
    name: 1,
    beds: 1
}).pretty()

// find listings that have 4 to 8 beds
db.listingsAndReviews.find({
    beds: {
        '$gte': 4,
        '$lte': 8
    }
}, {
    name: 1,
    beds: 1
})

// Find all listings that allowed pets
db.listingsAndReviews.find({
    'amenities': 'Pets allowed'
}, {
    'name': 1,
    'amenities': 1
}).pretty();

// Find all listings that have pets allowed
// and pets lived on this property
db.listingsAndReviews.find({
    'amenities': {
        '$all': ['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).pretty();

// Count how many listings that have Dog(s) and Cat(s)
db.listingsAndReviews.find({
    'amenities': {
        '$all': ['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).count();

// find all listings that have
// either dogs or cats listed in
// the list of amenities
db.listingsAndReviews.find({
    'amenities': {
        '$in': ['Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).pretty()

// select a document by ID
db.listingsAndReviews.find({
    '_id': '10006546'
}).pretty()

// select a document by Object ID
use sample_mflix;
db.movies.find({
    "_id": ObjectId('573a1390f29313caabcd4135')
})

// how to find by a substring
// eg. look for all the listings that have the
// word "spacious" in the name
use sample_airbnb;
db.listingsAndReviews.find({
    'name': {
        '$regex': 'spacious', '$options': 'i'
    }
}, {
    'name': 1
})

// compound criteria
// AND/OR
db.listingsAndReviews.find({
    'name': {
        '$regex': 'spacious', '$options': 'i'
    },
    'address.country': 'Brazil'
}, {
    name: 1,
    'address.country': 1
});

// OR
// we to find listings that are either in Brazil
// or Canada.

db.listingsAndReviews.find({
    '$or': [
        {
            'address.country': 'Brazil'
        },
        {
            'address.country': 'Canada'
        }
    ]
}, {
    'name': 1,
    'address.country': 1
}).pretty()

// OR and AND
// we find listings in Brazil or listings in Canada that
// has more than 3 beds
db.listingsAndReviews.find({
    '$or': [
        {
            'address.country': 'Brazil'
        },
        {
            'address.country': 'Canada',
            'beds': {
                '$gt': 3
            }
        }
    ]
}, {
    'name': 1,
    'address.country': 1,
    'beds': 1
}).pretty()

// QUERIES HAND ON SOLUTIONS
// restaurants 1: find all resturants that specialized
// in hamburgers cuisine
db.restaurants.find({
    'cuisine': 'Hamburgers'
}, {
    'name': 1,
    'cuisine': 1
}).pretty();

// 2. specialize in American cuisine and in Bronx borough.
db.restaurants.find({
    'cuisine': 'American',
    'borough': 'Bronx'
}, {
    'name': 1,
    'cuisine': 1,
    'borough': 1
}).pretty()

// 3. find all restaurants at Stillwell Avenue
db.restaurants.find({
    'address.street': 'Stillwell Avenue'
}, {
    'name': 1,
    'cuisine': 1,
    'address.street': 1
}).pretty()

// sample_mflix handson

// 1. count how many movies there are
db.movies.count()
db.movies.find().count()

// 2. how movies released before year 2000
db.movies.find({
    'year': {
        '$lt': 2000
    }
}).count()

// 3. show the first ten movies produced in USA
db.movies.find({
     'countries': 'USA' 
}, {
    'title': 1,
    'countries': 1
}).pretty().limit(10)

db.movies.find({
    'countries':{
        '$all':['China', 'UK']
    }
},{
    'title': 1,
    'countries': 1,
    'year': 1
}).pretty()

// first ten movies not produced in USA
db.movies.find({
    'countries':{
        '$nin':['USA']
    }
},{
    'title': 1,
    'countries': 1
}).pretty()

// find all movies that has at least 3 wins
db.movies.find({
    'awards.wins': {
        '$gte': 3
    }
},{
    'title': 1,
    'awards.wins': 1
}).pretty()

// find at least 3 nominations
db.movies.find({
    'awards.nominations': {
        '$gte': 3
    }
},{
    'title': 1,
    'awards.nominations': 1
}).pretty()

// Creating our own database in mongo
// 1. use <name of the new database>
// 2. insert a document into a new collection

use tgc10_shelter;
// insert one document into a collection
db.animals.insert({
    'name':'Fluffy',
    'age': 3,
    'breed': 'Golden Retriever',
    'type': 'Dog'
})

// insert many
db.animals.insertMany([
    {
        'name':'Dazzy',
        'age': 4,
        'breed':'Greyhound',
        'type':'Dog'
    },
    {
        'name':'Timmy',
        'age': 5,
        'breed':'Border Collie',
        'type':'Dog'
    },
    {
        'name':'Fishy',
        'age':1,
        'breed':'Goldfish',
        'type':'Fish'
    }
])

// update by providing A NEW DOCUMENT
// HTTP RESTFUL - PUT
db.animals.update({
    '_id':ObjectId('6030bdbb1f8e01fa5d5f25f9')
},{
    'name':'Timmy',
    'age':1.5,
    'breed':'Border Collie',
    'type':'Dog'
})

// update by modifying a key
// HTTP RESTFUL - PATCH
db.animals.update({
    '_id':ObjectId('6030bdbb1f8e01fa5d5f25f9')
},{
    '$set': {
        'name':'Thunder'
    }
})

// DELETE
db.animals.remove({
    '_id':ObjectId('6030bdbb1f8e01fa5d5f25fa')
})

// HANDS ON
db.students.insertMany([
    {
        "name":"Jane Doe",
        "age": 13,
        "subjects": [
            "Defense Against the Dark Arts",
            "Charms",
            "History of Magic"
        ],
        "date_enrolled":ISODate("2016-05-13")
    },
    {
        "name":"James Verses",
        "age":14,
        "subjects": [
            'Transfiguration', 'Alchemy'
        ],
        "date_enrolled":ISODate("2015-06-15")
    },
    {
        "name":"Jonathan Goh",
        "age":12,
        "subjects":[
            'Divination', 'Study of Ancient Runes'
        ],
        "date_enrolled":ISODate('2017-04-16')
    }
])

// Change the age of James Verses to 13
db.students.update({
    '_id':ObjectId('6030c75f1f8e01fa5d5f25fc')
},{
    '$set': {
        'age': 13
    }
})

// Change the student with the name of Jane Doe to Jane Doe JR
// and her age to 11
db.students.update({
    '_id':ObjectId('6030c75f1f8e01fa5d5f25fb')
},{
    '$set':{
        'name':'Jane Doe Jr',
        'age': 11
    }
})

// Remove Jonathan Goh
db.students.remove({
    '_id':ObjectId('6030c75f1f8e01fa5d5f25fd')
})

// ADD EMBEDDED DOCUMENTS
db.animals.insert({
    'name':'Cookie',
    'age': 3,
    'breed':'Golden Retriever',
    'type':'Dog',
    'checkups':[
        {
            '_id': ObjectId(),
            'name':'Dr Chua',
            'diagnosis':'Heartworms',
            'treatment':'Steriods'

        }
    ]
})

// ADD A NEW CHECKUP TO COOKIE
db.animals.update({
    '_id': ObjectId('6030c9d21f8e01fa5d5f25ff')
}, {
    '$push': {
        'checkups':{
            '_id':ObjectId(),
            'name':'Dr. Tan',
            'diagnosis':'Vomitting',
            'treatment':'Akaline tablets'
        }
    }
})

db.animals.update({
    '_id':ObjectId('6030bc2c1f8e01fa5d5f25f7')
},{
    '$push':{
        'checkups':{
            '_id':ObjectId(),
            'name': 'Dr. Tan',
            'diagnsois':'Hip problem',
            'treamtnet':'Hip surgery'
        }
    }
})

db.animals.update({
    'checkups._id':ObjectId('6030cb401f8e01fa5d5f2601')
},{
    '$set':{
        'checkups.$.diagnosis':'Stomach uclers',
        'checkups.$.treatment':'Drink more water'
    }
})

// remove from array of sub documents
db.animals.update({
    'checkups._id': ObjectId('6030cbb51f8e01fa5d5f2602')
},{
    '$pull': {
        'checkups': {
            '_id':ObjectId('6030cbb51f8e01fa5d5f2602')
        }
    }
})