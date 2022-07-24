const { app } = require('./app');

const { User } = require('./models/user.model');
const { Meal } = require('./models/meal.model');
const { Order } = require('./models/order.model');
const { Restaurant } = require('./models/restaurant.model');
const { Review } = require('./models/review.model');

//Utils
const { db } = require('./utils/database.util.js');

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err));

User.hasMany(Review, {foreignKey: 'userId'})
Review.belongsTo(User);

User.hasMany(Order, {foreignKey: 'userId'})
Order.belongsTo(User);

Order.hasOne(Meal, {foreignKey: 'mealId'})
Meal.belongsTo(Order);

Restaurant.hasMany(Order, {foreignKey: 'restaurantId'})
Order.belongsTo(Restaurant)

Restaurant.hasMany(Review, {foreignKey: 'restaurantId'})
Review.belongsTo(Restaurant);

Restaurant.hasMany(Meal, {foreignKey: 'restaurantId'})
Meal.belongsTo(Restaurant);

db.sync()
    .then(() => console.log('Database synced!'))
    .catch(err => console.log(err));

app.listen(3000, () => {
    console.log('Express app running!')
});