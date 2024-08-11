import express from "express";

const app = express();
app.use(express.json());

app.post("/vote", async (req: Request, res: Response) => {
  return res.json({ req });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port: ${port}...`));
