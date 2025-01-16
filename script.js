    document.getElementById('sidebarToggle').addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
    });

// Dummy data
const inventory = [];
const orders = [];
const suppliers = [];

// Update dashboard stats
function updateStats() {
    document.getElementById('totalInventory').textContent = inventory.length;
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalSuppliers').textContent = suppliers.length;
}

// Add event listeners
function setupEventListeners() {
    document.getElementById('addInventory').addEventListener('click', () => {
        const itemName = prompt('Enter item name:');
        const quantity = parseInt(prompt('Enter quantity:'), 10);
        const id = inventory.length + 1;
        if (itemName && quantity) {
            inventory.push({ id, name: itemName, quantity });
            renderInventoryTable();
            updateStats();
        }
    });

    document.getElementById('addSupplier').addEventListener('click', () => {
        const supplierName = prompt('Enter supplier name:');
        const contact = prompt('Enter contact details:');
        const id = suppliers.length + 1;
        if (supplierName && contact) {
            suppliers.push({ id, name: supplierName, contact });
            renderSuppliersTable();
            updateStats();
        }
    });

    document.getElementById('createOrder').addEventListener('click', () => {
        const supplierId = parseInt(prompt('Enter supplier ID:'), 10);
        const date = new Date().toLocaleDateString();
        const status = 'Pending';
        const id = orders.length + 1;
        if (supplierId && suppliers.some(s => s.id === supplierId)) {
            orders.push({ id, supplierId, date, status });
            renderOrdersTable();
            updateStats();
        }
    });
}

// Render inventory table
function renderInventoryTable() {
    const table = document.getElementById('inventoryTable');
    table.innerHTML = '';
    inventory.forEach(item => {
        const row = `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td><button onclick="deleteInventory(${item.id})">Delete</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}

// Render orders table
function renderOrdersTable() {
    const table = document.getElementById('ordersTable');
    table.innerHTML = '';
    orders.forEach(order => {
        const supplier = suppliers.find(s => s.id === order.supplierId)?.name || 'Unknown';
        const row = `<tr>
            <td>${order.id}</td>
            <td>${supplier}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
            <td><button onclick="deleteOrder(${order.id})">Delete</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}

// Render suppliers table
function renderSuppliersTable() {
    const table = document.getElementById('suppliersTable');
    table.innerHTML = '';
    suppliers.forEach(supplier => {
        const row = `<tr>
            <td>${supplier.id}</td>
            <td>${supplier.name}</td>
            <td>${supplier.contact}</td>
            <td><button onclick="deleteSupplier(${supplier.id})">Delete</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}

// Delete functions
function deleteInventory(id) {
    const index = inventory.findIndex(item => item.id === id);
    if (index !== -1) inventory.splice(index, 1);
    renderInventoryTable();
    updateStats();
}

function deleteOrder(id) {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) orders.splice(index, 1);
    renderOrdersTable();
    updateStats();
}

function deleteSupplier(id) {
    const index = suppliers.findIndex(supplier => supplier.id === id);
    if (index !== -1) suppliers.splice(index, 1);
    renderSuppliersTable();
    updateStats();
}

// Initialize app
function init() {
    updateStats();
    setupEventListeners();
}

init();






// Add these functions to your existing JavaScript
        const modal = document.getElementById("addInventoryModal");
        
        // Update the existing event listener in setupEventListeners()
        function setupEventListeners() {
            document.getElementById('addInventory').addEventListener('click', () => {
                openModal();
            });

            // Add other existing event listeners...

            // Add modal-specific event listeners
            document.querySelector('.close').addEventListener('click', closeModal);
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });

            document.getElementById('inventoryForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const itemName = document.getElementById('itemName').value;
                const quantity = parseInt(document.getElementById('itemQuantity').value, 10);
                const id = inventory.length + 1;

                if (itemName && quantity) {
                    inventory.push({ id, name: itemName, quantity });
                    renderInventoryTable();
                    updateStats();
                    closeModal();
                    // Reset form
                    e.target.reset();
                }
            });
        }

        function openModal() {
            modal.style.display = "block";
            document.getElementById('itemName').focus();
        }

        function closeModal() {
            modal.style.display = "none";
            // Reset form when closing
            document.getElementById('inventoryForm').reset();
        }



        // Add these functions to your existing JavaScript
        function setupEventListeners() {
            // Add this to your existing setupEventListeners function
            document.getElementById('createOrder').addEventListener('click', openOrderModal);
            
            // Handle form submission
            document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);
            
            // Close modal when clicking the X
            document.querySelector('#createOrderModal .close').addEventListener('click', closeOrderModal);
            
            // Close modal when clicking outside
            window.addEventListener('click', (event) => {
                if (event.target === document.getElementById('createOrderModal')) {
                    closeOrderModal();
                }
            });
        }

        function openOrderModal() {
            const modal = document.getElementById('createOrderModal');
            modal.style.display = 'block';
            
            // Populate supplier dropdown
            const supplierSelect = document.getElementById('orderSupplier');
            supplierSelect.innerHTML = '<option value="">Select a supplier</option>' +
                suppliers.map(supplier => 
                    `<option value="${supplier.id}">${supplier.name}</option>`
                ).join('');
            
            // Add initial item field
            const itemsList = document.getElementById('orderItemsList');
            itemsList.innerHTML = '';
            addItemField();
        }

        function closeOrderModal() {
            const modal = document.getElementById('createOrderModal');
            modal.style.display = 'none';
            document.getElementById('orderForm').reset();
            document.getElementById('orderItemsList').innerHTML = '';
        }

        function addItemField() {
            const itemsList = document.getElementById('orderItemsList');
            const itemField = document.createElement('div');
            itemField.className = 'form-group';
            itemField.style.display = 'flex';
            itemField.style.gap = '10px';
            itemField.innerHTML = `
                <select style="width: 60%" required>
                    <option value="">Select an item</option>
                    ${inventory.map(item => 
                        `<option value="${item.id}">${item.name} (Available: ${item.quantity})</option>`
                    ).join('')}
                </select>
                <input type="number" min="1" placeholder="Quantity" required style="width: 30%">
                <button type="button" onclick="this.parentElement.remove()" style="width: 10%">×</button>
            `;
            itemsList.appendChild(itemField);
        }

        function handleOrderSubmit(e) {
            e.preventDefault();
            
            const supplierId = parseInt(document.getElementById('orderSupplier').value);
            const status = document.getElementById('orderStatus').value;
            
            // Get all selected items and their quantities
            const itemSelects = document.querySelectorAll('#orderItemsList select');
            const itemQuantities = document.querySelectorAll('#orderItemsList input[type="number"]');
            const orderItems = [];
            
            for (let i = 0; i < itemSelects.length; i++) {
                const itemId = parseInt(itemSelects[i].value);
                const quantity = parseInt(itemQuantities[i].value);
                
                if (itemId && quantity) {
                    orderItems.push({
                        itemId,
                        quantity
                    });
                    
                    // Update inventory quantity
                    const inventoryItem = inventory.find(item => item.id === itemId);
                    if (inventoryItem) {
                        inventoryItem.quantity -= quantity;
                    }
                }
            }
            
            // Create new order
            const order = {
                id: orders.length + 1,
                supplierId,
                items: orderItems,
                date: new Date().toLocaleDateString(),
                status
            };
            
            orders.push(order);
            
            // Update tables and stats
            renderOrdersTable();
            renderInventoryTable();
            updateStats();
            
            // Close modal
            closeOrderModal();
        }

        // Update your existing renderOrdersTable function
        function renderOrdersTable() {
            const table = document.getElementById('ordersTable');
            table.innerHTML = '';
            orders.forEach(order => {
                const supplier = suppliers.find(s => s.id === order.supplierId)?.name || 'Unknown';
                const itemsCount = order.items ? order.items.length : 0;
                
                const row = `<tr>
                    <td>${order.id}</td>
                    <td>${supplier}</td>
                    <td>${order.date}</td>
                    <td>${order.status}</td>
                    <td>
                        <button onclick="viewOrder(${order.id})">View</button>
                        <button onclick="deleteOrder(${order.id})">Delete</button>
                    </td>
                </tr>`;
                table.innerHTML += row;
            });
        }

        // Add a function to view order details
        function viewOrder(orderId) {
            const order = orders.find(o => o.id === orderId);
            if (!order) return;

            const supplier = suppliers.find(s => s.id === order.supplierId)?.name || 'Unknown';
            const itemsDetails = order.items.map(item => {
                const inventoryItem = inventory.find(i => i.id === item.itemId);
                return `${inventoryItem?.name || 'Unknown Item'} (Qty: ${item.quantity})`;
            }).join('\n');

            alert(`Order #${order.id}
Supplier: ${supplier}
Date: ${order.date}
Status: ${order.status}
Items:
${itemsDetails}`);
        }