const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const allData = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));

app.get("/", (req, res) => {
	// res.status(200).json({ message: "Welcome to Home page" });
	res.status(200).send("Welcome to Home page");

});

app.get("/users", (req, res) => {
	res.status(200).json({
		status: "success",
		results: allData.length,
		data: {
			allData,
		},
	});
});

app.get("/users/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    // console.log(req.params);
    const user = allData.find((el) => el.id === id);
    // console.log(user); // gives undefined if it doesnt finds the match.
    // if (id > allData.length) {
    if (user === undefined) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});



app.post("/users", (req, res) => {
	// console.log(req.body); //requesting all the available users data
	const newId = allData[allData.length - 1].id + 1;
	const newData = Object.assign({ id: newId }, req.body);
	allData.push(newData);
	res.status(201).json({
		status: "success",
		data: {
			allData: newData,
		},
	});
});

app.patch("/users/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const update = allData.find(el => el.id === id);
    const ans = Object.assign(update, req.body)
    // console.log(ans);
    res.status(200).send({
        status: "success",
        data: {
            allData: ans

        }
    })
})

app.delete("/users/:id", (req, res) => {
	const id = Number.parseInt(req.params.id);
    const update = allData.findIndex((el) => el.id === id);
    // console.log(update);
     allData.splice(update, 1);

	res.status(200).json({
		status: "success",
		data: {
			allData,
		},
	});
});

const port = 8000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
