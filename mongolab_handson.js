//create a new db
db.animals.insert({
    'name':'Fluffy',
    'age':3,
    'breed' : 'Golden Retriever',
    'type': 'Dog'
})

//insert many data
db.animals.insertMany([
    {'name':'CutiePie',
    'age':4,
    'breed' : 'Chiwawa',
    'type': 'Dog'},
    {'name':'Fluffy',
    'age':2,
    'breed' : 'Greyhound',
    'type': 'Dog'},
    {'name':'Maddy',
    'age':2,
    'breed' : 'Bull Dog',
    'type': 'Dog'}
])

//update
db.animals.update(
    {'id':ObjectId()},
    {
        'name':'Fluffy',
        'age':3,
        'breed':
    }
)

//Hands on fake school db

use fake_school

//insert a collection
db.students.insertMany([
    {'Name': 'Jane Doe',
'Age': '13',
'Subjects': 'Defense Against the Dark Arts, Charms, History of Magic',
'Date Enrolled': '13th May 2016'},
{'Name': 'James Verses',
'Age': '14',
'Subjects': 'Transfiguration, Alchemy',
'Date Enrolled': '15th June 2015'},
{'Name': 'Jonathan Goh',
'Age': '12',
'Subjects': 'Divination, Study of Ancient Runes',
'Date Enrolled':'16th April 2017'}
])

//update
db.students.update(
    {'_id'
:ObjectId('6030c2d09ad64b6d8956f998')},
{
    'Name': 'James Verses',
'Age': '13',
'Subjects': 'Transfiguration, Alchemy',
'Date Enrolled': '15th June 2015'
})

db.students.update(
    {'_id'
:ObjectId('6030c2d09ad64b6d8956f997')},
{
    '$set':
        {'Name': 'Jane Doe Jr',
        'Age': '11'}
})

db.students.remove(
     {'_id'
:ObjectId('6030c2d09ad64b6d8956f999')}
)

// add embedded documents
db.animals.insert({
    'name':'Cookie',
    'age':3,
    'breed':'Golden Retriever',
    'type':'Dog',
    'checkups':[
        {
            '_id':ObjectId(),
            'name':'Dr Chua',
            'diagnosis':'Heartworms',
            'treatment':'Steriods'
        }
    ]
})

db.animals.update({
    'name':'Cookie',
    'age':3,
    'breed':'Golden Retriever',
    'type':'Dog',
    'checkups':[
        {
            '_id':ObjectId(),
            'name':'Dr Chua',
            'diagnosis':'Heartworms',
            'treatment':'Steriods'
        }
    ]
})

