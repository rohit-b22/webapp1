const express = require("express");
const sql = require("mssql");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = 3000;

// Configure SQL Server connection
const config = {
  user: "bootcamp",
  password: "Pass@123",
  server: "bootcampfeb5.database.windows.net",
  database: "bootcamp",
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: false, // Don't trust the server certificate
  },
};

// Enable CORS for all routes
app.use(cors());

// Define API endpoint to fetch data
app.get("/task2", async (req, res) => {
  try {
    // Connect to SQL Server
    await sql.connect(config);

    // Query SQL Server and fetch data
    const result = await sql.query(
      "SELECT TOP 20 CustomerID, FirstName, MiddleName, LastName, EmailAddress, Phone FROM [SalesLT].[Customer]"
    );
    // console.log(result);

    // Send the fetched data as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the SQL Server connection
    await sql.close();
  }
});

app.get("/task3", async (req, res) => {
  try {
    // Connect to SQL Server
    await sql.connect(config);

    // Query SQL Server and fetch data
    const result = await sql.query(`
            SELECT TOP 20
                pc.Name AS ProductCategory,
                p.Name AS ProductName,
                p.Color,
                p.Size,
                p.Weight
            FROM 
                [SalesLT].[ProductCategory] pc
            INNER JOIN
                [SalesLT].[Product] p ON pc.ProductCategoryID = p.ProductCategoryID
            ORDER BY 
                p.Name
        `);

    // Send the fetched data as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the SQL Server connection
    await sql.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
