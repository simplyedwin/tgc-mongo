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
db.listingsAndReviews.find({},{
    name: 1,
    address: 1
}).pretty()

// project a key of an embedd document
db.listingsAndReviews.find({},{
    name: 1,
    'address.country': 1
}).pretty()

// finding by criteria


// find all listings with exactly 5 beds
db.listingsAndReviews.find({
    beds:5
},{
    name: 1,
    beds: 1
}).pretty()

// find by a key in an embedded document
// (aka sub-document, aka nested object)
// find all listings in Brazil
db.listingsAndReviews.find({
    'address.country':'Brazil'
},{
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
    bedrooms:1
}).pretty()

// find listings with 5 beds and 5 bedrooms
// and in Brazil
db.listingsAndReviews.find({
    beds: 5,
    bedrooms: 5,
    'address.country':'Brazil'
}, {
    beds: 1,
    bedrooms: 1,
    'address.country':1,
    name: 1
}).pretty()

// we want to find listings that have more than 3 beds
db.listingsAndReviews.find({
    beds: {
        '$gt': 3
    }
}, {
    name:1,
    beds:1
}).pretty()

// find listings with less than 4 beds
db.listingsAndReviews.find({
    beds: {
        '$lt': 4
    }
},{
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
    'amenities':'Pets allowed'
}, {
    'name': 1,
    'amenities': 1
}).pretty();

// Find all listings that have pets allowed
// and pets lived on this property
db.listingsAndReviews.find({
    'amenities': {
        '$all':['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).pretty();

// Count how many listings that have Dog(s) and Cat(s)
db.listingsAndReviews.find({
    'amenities': {
        '$all':['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
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
        '$in':['Dog(s)', 'Cat(s)']
    }
}, {
    'name': 1,
    'amenities': 1
}).pretty()

// select a document by ID
db.listingsAndReviews.find({
    '_id':'10006546'
}).pretty()

// select a document by Object ID
use sample_mflix;
db.movies.find({
    "_id":ObjectId('573a1390f29313caabcd4135')
})

// how to find by a substring
// eg. look for all the listings that have the
// word "spacious" in the name
use sample_airbnb;
db.listingsAndReviews.find({
    'name': {
        '$regex':'spacious', '$options':'i'
    }
},{
    'name': 1
})

// compound criteria
// AND/OR
db.listingsAndReviews.find({
    'name': {
        '$regex':'spacious', '$options':'i'
    },
    'address.country':'Brazil'
}, {
    name: 1,
    'address.country': 1
});

// OR
// we to find listings that are either in Brazil
// or Canada.

db.listingsAndReviews.find({
    '$or':[
        {
            'address.country':'Brazil'
        },
        {
            'address.country':'Canada'
        }
    ]
},{
    'name': 1,
    'address.country': 1
}).pretty()

// OR and AND
// we find listings in Brazil or listings in Canada that
// has more than 3 beds
db.listingsAndReviews.find({
    '$or':[
        {
            'address.country':'Brazil'
        },
        {
            'address.country':'Canada',
            'beds': {
                '$gt': 3
            }
        }
    ]
}, {
    'name': 1,
    'address.country':1,
    'beds':1
}).pretty()