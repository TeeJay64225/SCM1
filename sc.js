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