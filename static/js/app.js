// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // clear out any existing data
  tbody.html("");

  // loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Create a variable to keep track of all the filters as an object.
var filters = {};

function updateFilters() {

    // Set changed element as a variable.
  let changedElement = d3.select(this);
    // Save the value that was changed
  let elementValue = changedElement.property("value");
  console.log(elementValue);
    // Save the id 
  let filterId = changedElement.attr("id")
  console.log(filterId);
  
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }
  
    // Apply all filters and rebuild the table
    filterTable();
  
  }
  
  // Filter the table when data is entered.
  function filterTable() {
  
    // Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key,value])=> {
      filteredData = filteredData.filter(row=> row[key] === value);
    });
  
    // Rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
