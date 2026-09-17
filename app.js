const fs = require("fs");
const input = require("readline-sync");


// ADD BIKE

function addBike() {

    const data = fs.readFileSync("./bikes.json", "utf-8");
    const bikes = JSON.parse(data);

    let model = input.question("Enter bike model: ");
    let type = input.question("Enter bike type: ");
    let registrationNumber = input.question("Enter registration number: ");
    let pricePerHour = Number(input.question("Enter price per hour: "));
    let pricePerDay = Number(input.question("Enter price per day: "));

    let id;

    if (bikes.length === 0) {
        id = 1;
    } else {
        id = bikes[bikes.length - 1].id + 1;
    }

    let bike = {
        id: id,
        model: model,
        type: type,
        registrationNumber: registrationNumber,
        pricePerHour: pricePerHour,
        pricePerDay: pricePerDay,
        available: true
    };

    bikes.push(bike);

    const newData = JSON.stringify(bikes, null, 2);

    fs.writeFileSync("./bikes.json", newData);

    console.log("Bike added successfully!");
}


// VIEW BIKES

function viewBikes() {

    const data = fs.readFileSync("./bikes.json", "utf-8");
    const bikes = JSON.parse(data);

    if (bikes.length === 0) {
        console.log("No bikes available!");
        return;
    }

    console.table(bikes);
}


// UPDATE BIKE

function updateBike() {

    const data = fs.readFileSync("./bikes.json", "utf-8");
    const bikes = JSON.parse(data);

    let id = Number(input.question("Enter bike ID: "));

    let bike = bikes.find(function (bike) {
        return bike.id === id;
    });

    if (!bike) {
        console.log("Bike not found!");
        return;
    }

    console.log("Current Bike Details:");
    console.log("Model:", bike.model);
    console.log("Type:", bike.type);
    console.log("Registration Number:", bike.registrationNumber);
    console.log("Price Per Hour:", bike.pricePerHour);
    console.log("Price Per Day:", bike.pricePerDay);

    let pricePerHour = input.question(
        "Enter new price per hour: "
    );

    let pricePerDay = input.question(
        "Enter new price per day: "
    );

    if (pricePerHour !== "") {
        bike.pricePerHour = Number(pricePerHour);
    }

    if (pricePerDay !== "") {
        bike.pricePerDay = Number(pricePerDay);
    }

    const newData = JSON.stringify(bikes, null, 2);

    fs.writeFileSync("./bikes.json", newData);

    console.log("Bike updated successfully!");
}


// DELETE BIKE

function deleteBike() {

    const data = fs.readFileSync("./bikes.json", "utf-8");
    const bikes = JSON.parse(data);

    let id = Number(input.question("Enter bike ID: "));

    let index = bikes.findIndex(function (bike) {
        return bike.id === id;
    });

    if (index === -1) {
        console.log("Bike not found!");
        return;
    }

    console.log("Bike:", bikes[index].model);
    console.log("Registration Number:", bikes[index].registrationNumber);

    let confirmation = input.question(
        "Are you sure you want to delete this bike? yes/no: "
    );

    if (confirmation.toLowerCase() === "yes") {

        bikes.splice(index, 1);

        const newData = JSON.stringify(bikes, null, 2);

        fs.writeFileSync("./bikes.json", newData);

        console.log("Bike deleted successfully!");

    } else {

        console.log("Delete cancelled!");
    }
}


// MAIN MENU

while (true) {

    console.log("       BIKE RENTAL SYSTEM");
    console.log("1. Add Bike");
    console.log("2. View Bikes");
    console.log("3. Update Bike");
    console.log("4. Delete Bike");
    console.log("5. Exit");

    let choice = input.question("Enter your choice: ");

    switch (choice) {

        case "1":
            addBike();
            break;

        case "2":
            viewBikes();
            break;

        case "3":
            updateBike();
            break;

        case "4":
            deleteBike();
            break;

        case "5":
            console.log("Thank you for using Bike Rental System!");
            process.exit();

        default:
            console.log("Invalid choice!");
    }
}