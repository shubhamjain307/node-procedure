const express = require("express");
const router = express.Router();
const { sequelize } = require("../db");

// Route to get details of an employee
router.get("/:id", async (request, response) => {
  try {
    const empId = request.params.id;
    const query = `SELECT * FROM get_employee_details(:empId)`;
    const replacements = { empId };

    const result = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
    });

    if (result.length === 0) {
      response.status(404).send("Employee not found");
    } else {
      response.status(200).json(result);
    }
  } catch (err) {
    console.log("Err", err);
  }
});

// Route to Add new Employee
router.post("/", (request, response) => {
  try {
    const { name, age, country, salary } = request.body;
    const query = `CALL public.add_employee(:name, :age, :country, :salary)`;
    const replacements = { name, age, country, salary };

    return sequelize
      .query(query, {
        replacements,
        type: sequelize.QueryTypes.RAW,
      })
      .then((res) => {
        console.log("Table data:", res);

        response.status(201).send("Employee added successfully");
      })
      .catch((err) => {
        console.error("Unable to add employee:", err);
        res.status(500).send("Error adding employee");
      });
  } catch (err) {
    console.error("Unable to add employee:", err);
    res.status(500).send("Error adding employee");
  }
});

router.patch("/:id", (request, response) => {
  try {
    const { name, age, country, salary } = request.body;
    const id = request.params.id;
    const query = `CALL public.update_employee(:id,:name, :age, :country, :salary)`;
    const replacements = { id, name, age, country, salary };

    return sequelize
      .query(query, {
        replacements,
        type: sequelize.QueryTypes.RAW,
      })
      .then((res) => {
        console.log("Table data:", res);

        response.status(201).send("Employee updated successfully");
      })
      .catch((err) => {
        console.error("Unable to update employee:", err);
        res.status(500).send("Error updating employee");
      });
  } catch (err) {
    console.error("Unable to update employee:", err);
    res.status(500).send("Error updating employee");
  }
});

// Route to delete an employee
router.delete("/:id", async (req, res) => {
  const empId = req.params.id;

  try {
    const query = `CALL delete_employee(:empId)`;
    const replacements = { empId };

    await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.RAW,
    });

    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    console.error("Unable to delete employee:", error);
    res.status(500).send("Error deleting employee");
  }
});

module.exports = router;
