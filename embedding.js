const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://nodejs:nodejs@starship.daconsulting.co.za/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
    type: [authorSchema],
    required: true
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne( { _id: courseId}, {
    $set: {
      'authors.name': 'David John'
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//createCourse('Node Course', [
//  new Author({ name: 'Mosh' }),
//  new Author({ name: 'John' })
//]);
//updateAuthor('6303b66ced1267367d94c22d');

//addAuthor('6303b66ced1267367d94c22e', new Author({ name: 'Amy'}));
removeAuthor('6303b66ced1267367d94c22e','6303b8666cf110ca91678343');