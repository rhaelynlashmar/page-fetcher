const needle = require('needle');
const fs = require("fs");

// Get command-line arguments
const args = process.argv.slice(2); // Exlude first 2 arguments

// Make sure the required 2 arguments are provided
if (args.length < 2) {
  console.error("Usage: node fetcher.js does not contain URL or File Path");
  process.exit(1); // Exit with an error code
}

// Assign the arguments to variables
const url = args[0];
const filePath = args[1];

console.log(`Fetching from URL: ${url}`);
console.log(`Saving to file: ${filePath}`);

// Ensure you have valid URL input
if (!url.startsWith("http://") && !url.startsWith("https://")) {
  console.error("Error: URL must start with 'http://' or 'https://'.");
  process.exit(1); // exit with error code
}

// Check the file path exists
if (filePath.trim() === "") {
  console.error("Error: The file path can't be empty.");
  process.exit(1); // exit with an error code
}

// Make HTTP request
needle.get(url, (error, response, body) => {
  if (error) {
    console.error(`Error fetching URL: ${error.message}`);
    process.exit(1); // exit with an error code
  }
  // Check for a successful response
  if (response.statusCode !== 200) {
    console.error(`Failed to fetch URL: ${response.statusCode}`);
    process.exit(1); // exit with an error code
  }

  console.log("HTTP request successful");

  saveToFile(body);
});

// Save fetched information to a file
const saveToFile = (data) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(`Error writing to file: ${err.message}`);
      process.exit(1); // exit with an error code
    }

    // log the data saved and file path
    console.log(`Downloaded & Saved ${data.length} bytes to ${filePath}`);
  });
};









