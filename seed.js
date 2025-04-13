require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const User = require("./models/user");

const data = require("./init/data");

main().then(() => {
    console.log("MongoDB connected!");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL); // Uses your .env variable
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Deleted old listings");
    const demoUser = await User.findOne({ username:'OwnerSumit'});
    if (!demoUser) {
        console.log("User 'sumit' not found. Please sign up first.");
        return;
      }
      for (let listing of data.data) {
        listing.owner = demoUser._id;
      }
    await Listing.insertMany(data.data);
    console.log("Inserted new listings");
};

initDB();
