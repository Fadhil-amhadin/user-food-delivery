if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./routes/index')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req , res , next) => {
//     const signature = req.get('signature');
//     if (signature === "midasfooddelivery") {
//       next();
//     }else{
// 		res.status(403).send("you are not allowed to view this file or page")
// 	}
// });
app.use('/', (req, res, next) => {
  res.status(200).send("you success")
})

app.use('/', routes)

app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => {
	console.log(`This user app listening at :  http://localhost:${PORT}`);
});
