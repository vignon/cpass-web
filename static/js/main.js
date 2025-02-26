document.addEventListener('DOMContentLoaded', function() {
    const macAddressInput = document.getElementById('mac-address');
    const addButton = document.getElementById('add-button');
    const resultMessage = document.getElementById('result-message');
    
    // Function to validate MAC address format
    function isValidMACAddress(mac) {
        // Remove separators and check if it's a valid MAC
        const cleanMac = mac.replace(/[:\-\.]/g, '');
        
        // Check if it's a valid length (12 hex characters)
        if (cleanMac.length !== 12) {
            return false;
        }
        
        // Check if it contains only hex characters
        return /^[0-9A-Fa-f]{12}$/.test(cleanMac);
    }
    
    // Event listener for the add button
    addButton.addEventListener('click', function() {
        const macAddress = macAddressInput.value.trim();
        
        // Validate the MAC address
        if (!isValidMACAddress(macAddress)) {
            showMessage('Please enter a valid MAC address', 'error');
            return;
        }
        
        // Disable the button during the request
        addButton.disabled = true;
        addButton.textContent = 'Adding...';
        
        // Send the request to the API
        fetch('/api/add-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mac_address: macAddress }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Endpoint added successfully!', 'success');
                macAddressInput.value = ''; // Clear the input
            } else {
                showMessage(`Error: ${data.message}`, 'error');
            }
        })
        .catch(error => {
            showMessage(`An error occurred: ${error.message}`, 'error');
        })
        .finally(() => {
            // Re-enable the button
            addButton.disabled = false;
            addButton.textContent = 'Add Endpoint';
        });
    });
    
    // Function to show success or error messages
    function showMessage(message, type) {
        resultMessage.textContent = message;
        resultMessage.className = ''; // Clear previous classes
        resultMessage.classList.add(type);
        
        // Hide the message after 5 seconds if it's a success message
        if (type === 'success') {
            setTimeout(() => {
                resultMessage.style.display = 'none';
                resultMessage.className = '';
            }, 5000);
        }
    }
});