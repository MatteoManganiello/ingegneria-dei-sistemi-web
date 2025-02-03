/* Configura il server, abilita il CORS e gestisce le diverse route dell'API.*/


const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Importare e utilizzare le route per gestire le diverse risorse dell'API
app.use("/api/burgers", require("./Endpoint_routes/burgers"));
app.use("/api/drinks", require("./Endpoint_routes/drinks"));
app.use("/api/fries", require("./Endpoint_routes/fries"));
app.use("/api/orders", require("./Endpoint_routes/orders"));
app.use("/api/site-reviews", require("./Endpoint_routes/reviews"));
app.use("/api/login", require("./Endpoint_routes/login"));
app.use("/api/register", require("./Endpoint_routes/register"));
app.use("/api/burgers/votes", require("./Endpoint_routes/votes"));
app.use("/api/burgers", require("./Endpoint_routes/idvote"));
app.use("/api/custom-burgers", require("./Endpoint_routes/customBurgers"));

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});