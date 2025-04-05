export default function QueryParameters(app) {
  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;

    const numA = parseInt(a);
    const numB = parseInt(b);

    if (isNaN(numA) || isNaN(numB)) {
      return res.status(400).send("Invalid numbers provided");
    }

    switch (operation) {
      case "add":
        result = numA + numB;
        break;
      case "subtract":
        result = numA - numB;
        break;
      case "multiply":
        result = numA * numB;
        break;
      case "divide":
        if (numB === 0) {
          result = "Cannot divide by zero.";
        } else {
          result = numA / numB;
        }
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });
}
