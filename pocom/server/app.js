const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user_routes');
const communityRoutes = require('./routes/community_routes');
const communityUserRoutes = require('./routes/community_user_routes');
const likesRoutes = require('./routes/likes_routes');
const postRoutes = require('./routes/posts_routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST","PUT"],
    credentials: true,
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    key: "secret-key",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: null
    }
}))

app.use('/api', userRoutes);
app.use('/api', communityRoutes);
app.use('/api', communityUserRoutes);
app.use('/api', likesRoutes);
app.use('/api', postRoutes)

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})

