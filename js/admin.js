// Function to fetch and render data into tables
//Function to fetch and render payment data
// document.addEventListener('DOMContentLoaded', () => {
// //   // Fetch summary data
//   fetch('http://localhost:3000/admin/summary')
//       .then(response => response.json())
//       .then(data => {
//           if (data.success) {
//               const { totalUsers, totalCourses, totalPayment } = data.data;

//               // Update the summary table
//               document.getElementById('total-users').textContent = totalUsers;
//               document.getElementById('total-courses').textContent = totalCourses;
//               document.getElementById('total-payment').textContent = totalPayment;
//           } else {
//               console.error('Error fetching summary:', data.message);
//           }
//       })
//       .catch(error => console.error('Error fetching summary:', error));
// });
async function fetchData1(endpoint, tableId) {
  console.log(`Fetching data for: ${endpoint}`);

  try {
    const tableBody = document.getElementById(tableId);  // Table body where rows will be inserted
    tableBody.innerHTML = '';  // Clear previous table data

    const response = await fetch(`http://localhost:3000/admin/${endpoint}`);
    const data = await response.json();

    if (data.success) {
      data[endpoint].forEach(item => {
        let row = document.createElement('tr');  // Create a table row

        // Add table cells based on endpoint
        if (endpoint === "payments") {
          row.innerHTML = `
            <td>${item.course_id}</td>
            <td>${item.trx}</td>
            <td>${item.type}</td>
            <td>${item.price}</td>
            <td>${item.approval === 1 ? 'Approved' : 'Pending'}</td>
            <td>
              ${item.approval === 0 ? 
                `<button class="approve-btn" data-id="${item.id}" data-type="payment">Approve</button>` : 
                ''
              }
            </td>
          `;
        }

        tableBody.appendChild(row);  // Add the row to the table body
      });

      // Add event listeners to Approve buttons
      const approveButtons = document.querySelectorAll('.approve-btn');
      approveButtons.forEach(button => {
        button.addEventListener('click', function () {
          const id = this.getAttribute('data-id');  // Get the ID of the row to approve
          const type = this.getAttribute('data-type');  // Get the type of data (payment)
          
          // Call function to handle approving the payment
          approvePayment(id, this.closest('tr'), this);  // Pass the row element and the button
        });
      });

    } else {
      console.error('Error fetching data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to approve a payment
async function approvePayment(id, rowElement, buttonElement) {
  const endpoint = 'approve-payment';  // Static endpoint for payment approval
  try {
    const response = await fetch(`http://localhost:3000/admin/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })  // Send the ID of the record to approve
    });

    const result = await response.json();
    if (result.success) {
      // Update the status in the table
      rowElement.querySelector('td:nth-child(4)').textContent = 'Approved';  // Update the Status cell
      buttonElement.style.display = 'none';  // Hide the Approve button
      alert('Payment approved successfully!');
    } else {
      alert('Error approving the payment. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error approving the payment. Please try again.');
  }
}
async function fetchData(endpoint, tableId) {
  console.log(`Fetching data for: ${endpoint}`); // Log to check

  try {
    const tableBody = document.getElementById(tableId);  // Table body where rows will be inserted
    tableBody.innerHTML = '';  // Clear previous table data

    const response = await fetch(`http://localhost:3000/admin/${endpoint}`);
    const data = await response.json();

    if (data.success) {
      data[endpoint].forEach(item => {
        let row = document.createElement('tr');  // Create a table row
        
        // Add table cells based on endpoint
        if (endpoint === "courses") {
          row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.instructor}</td>
            <td>${item.price}</td>
            <td>${item.rating}</td>
            <td><button class="drop-btn" data-id="${item.id}" data-type="course">Drop</button></td> <!-- Drop Button -->
          `;
        } else if (endpoint === "users") {
          row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.userType}</td>
            <td><button class="drop-btn" data-id="${item.email}" data-type="user">Drop</button></td> <!-- Drop Button -->
          `;
        } else if (endpoint === "payments") {
          row.innerHTML = `
            <td>${item.course_id}</td>
            <td>${item.trx}</td>
            <td>${item.type}</td>
            <td>${item.approval === 1 ? 'Approved' : 'Pending'}</td>
            <td><button class="drop-btn" data-id="${item.id}" data-type="payment">Drop</button></td> <!-- Drop Button -->
          `;
        } else if (endpoint === "refunds") {
          row.innerHTML = `
            <td>${item.username}</td>
            <td>${item.course_title}</td>
            <td>${item.reason}</td>
            <td>${new Date(item.request_date).toLocaleString()}</td>
            <td><button class="drop-btn" data-id="${item.id}" data-type="refund">Drop</button></td> <!-- Drop Button -->
          `;
        }

        tableBody.appendChild(row);  // Add the row to the table body
      });
      
      // Add event listeners to Drop buttons
      const dropButtons = document.querySelectorAll('.drop-btn');
      dropButtons.forEach(button => {
        button.addEventListener('click', function () {
          const id = this.getAttribute('data-id');  // Get the ID of the row to drop
          const type = this.getAttribute('data-type');  // Get the type of data (e.g., course, user, payment, refund)
          
          // Call function to handle dropping data
          dropData(id, type, this.closest('tr'));  // Pass the row element to remove it later
        });
      });

    } else {
      console.error('Error fetching data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to delete a record from the database
async function dropData(id, type, rowElement) {
  const endpoint = `delete-${type}`;  // Dynamic endpoint based on type
  try {
    const response = await fetch(`http://localhost:3000/admin/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })  // Send the ID of the record to delete
    });

    const result = await response.json();
    if (result.success) {
      // Remove the row from the table
      rowElement.remove();
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} dropped successfully!`);
    } else {
      alert('Error deleting the record. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting the record. Please try again.');
  }
}
fetchData('courses', 'courses-list');
fetchData('users', 'users-list');
fetchData1('payments', 'payments-list');
fetchData('refunds', 'refunds-list');