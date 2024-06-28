//THIS IS A NODEJS PROGRAM WHICH SORTS THE FILE INTO DIFFERENT FOLDERS:

const fs = require('fs'); // Import the fs (file system) module
const path = require('path'); // Import the path module

const directoryPath = "./unsorted/"; // Define the path to the unsorted directory

// Function to get the extension of a file
function checkExtension(file) {
    return path.extname(file); // Returns the file extension including the dot (e.g., '.txt')
}

// Function to sort and move a file into the appropriate folder based on its extension
function sortFile(file, ext) {
    // Check if the directory for the file extension already exists
    if (fs.existsSync(directoryPath + ext)) {
        // If the directory exists, move the file to the directory
        fs.rename(directoryPath + file, ext + '/' + file, (err) => {
            if (err) {
                console.log(err); // Log any errors
            }
        });
    } else {
        // If the directory does not exist, create the directory
        console.log('creating folder ' + ext);
        fs.mkdir('./' + ext, { recursive: true }, (err) => {
            if (err) {
                console.log(err); // Log any errors while creating the directory
                return;
            }
            // Move the file to the newly created directory
            fs.rename(directoryPath + file, ext + '/' + file, (err) => {
                if (err) {
                    console.log(err); // Log any errors while moving the file
                }
            });
        });
    }
}

// Read the contents of the directoryPath
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log("Error due to " + err); // Log any errors while reading the directory
    }
    
    // Iterate through each file in the directory
    for (let file of files) {
        let extension = checkExtension(file); // Get the extension of the current file
        sortFile(file, extension); // Sort and move the file based on its extension
    }
});
