# NODEAPI
Node.js, Express, MongoDB &amp; More: The Complete Bootcamp 2020


# Firsts Steps Building API
1. Create json file: npm init
2. Install express: npm i express@4 
3. Create the app.js file
4. Setting up Express and Basic Routing
5. Read the file tours.json an create the get route
6. Create the Post,Patch and Delete routes
7. Refector the routes
8. Applying middlewares
9. install morgan: npm i morgan (request logger middleware)
10. Define the User router on 3-Routes then create they functions on 2- routes handlers
11. Separating the routes Users and Tours
12. Create Route Folder
13. Controller Folder
14. Create server file
15. Create param Middleware for get by id on user route
16. Create param Middleware for 404 not found on tour route and remove the repeated code
17. Create param Middleware for check values price and name (Post tour route)
18. Create a Middleware for read static files
19. Create the config file and npm i dotenv
20. Install eslint and prettier plugins and dependencies: npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

# Mongo DB
mongo db

1. use natours-test
2. db.tours.insertOne({ name: "The Forest Hiker", price: 297, rating: 4.7 })
3. db.tours.find()
4. show dbs
5. show collections
6. quit()
------------------------------------------------------------
Querying (Reading)
1. db.tours.insertMany([{name: "The Sea Explorer", price: 497, rating:4.8}, {name: "The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy"}])
2. db.tours.find({ price: {$lte: 500}})
3. db.tours.find({price: {$lt:500}, rating: {$gte: 4.8} })
4. db.tours.find({ $or: [{price: {$lt: 500}}, {rating: {$gte: 4.8}} ]})
------------------------------------------------------------
Updating Documents

1. db.tours.updateOne({name: "The Snow Adventurer"}, {$set: {price: 597} })
2. db.tours.updateMany({ price: {$gt: 500}, rating: {$gte: 4.8}}, { $set: {premium: true}})
-----------------------------------------------------------
Delete Documents
1. db.tours.deleteMany({ rating: {$lt: 4.8}})
2. db.tours.deleteMany({})

# Mongo DB With Mongoose
1. npm i mongoose@5

# Install Validator
1. npm i validator

# Install ndb
1. npm i ndb

# Instal bcryptjs
1. npm i bcryptjs

# Install Jsonwebtoken
1. npm i jsonwebtoken

# Install Nodemailer
1. npm i nodemailer

# Install Express Rate Limit
1. npm i express-rate-limit

# Install Helmet
1. npm i helmet

# Install Express Mongo Sanitize and XSS Clean
1. npm i express-mongo-sanitize
2. npm i xss-clean
3. npm i hpp


