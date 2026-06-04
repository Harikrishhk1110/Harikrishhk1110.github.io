// ============================================
// TAB SWITCHING
// ============================================
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active from all buttons
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active to clicked button
    event.target.classList.add('active');

    // Initialize MTR form if MTR tab is clicked
    if (tabName === 'mtr') {
        initializeMTRForm();
    }
}

// ============================================
// DOCUMENT HUB FUNCTIONS
// ============================================

// Search files
function searchFiles() {
    const input = document.getElementById("searchBox");
    const filter = input.value.toLowerCase();
    const fileList = document.getElementById("fileList");
    const items = fileList.getElementsByTagName("li");

    Array.from(items).forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

// Filter by file type
function filterByType(type) {
    const items = document.querySelectorAll('.file-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter items
    items.forEach(item => {
        if (type === 'all' || item.dataset.type === type) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Upload file
function uploadFile() {
    const fileUpload = document.getElementById('fileUpload');
    const files = fileUpload.files;

    if (files.length === 0) {
        alert('Please select a file to upload');
        return;
    }

    Array.from(files).forEach(file => {
        const listItem = document.createElement('li');
        listItem.className = 'file-item';

        const ext = file.name.split('.').pop().toLowerCase();
        let icon = '📦';
        if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') icon = '📊';
        if (ext === 'pdf') icon = '📕';
        if (ext === 'docx' || ext === 'doc') icon = '📄';

        listItem.dataset.type = ext;
        listItem.innerHTML = `
            <a href="#" onclick="alert('File access requires proper storage setup')">
                ${icon} ${file.name}
            </a>
            <button onclick="deleteFile('${file.name}')" class="btn-delete">Delete</button>
        `;

        // Store in localStorage
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = {
                name: file.name,
                data: e.target.result,
                type: file.type,
                uploadedAt: new Date().toLocaleString()
            };
            localStorage.setItem(`file_${file.name}`, JSON.stringify(fileData));
        };
        reader.readAsDataURL(file);

        document.getElementById('fileList').appendChild(listItem);
    });

    fileUpload.value = '';
    alert(`${files.length} file(s) uploaded successfully!`);
}

// Delete file
function deleteFile(filename) {
    if (confirm(`Delete "${filename}"?`)) {
        localStorage.removeItem(`file_${filename}`);
        location.reload();
    }
}

// ============================================
// DASHBOARD FUNCTIONS
// ============================================

// Update inventory stats
function updateInventoryStats() {
    const mockData = {
        totalItems: 245,
        inStock: 198,
        lowStock: 35,
        outOfStock: 12
    };

    document.getElementById('totalItems').textContent = mockData.totalItems;
    document.getElementById('inStock').textContent = mockData.inStock;
    document.getElementById('lowStock').textContent = mockData.lowStock;
    document.getElementById('outOfStock').textContent = mockData.outOfStock;
}

// Search inventory items
function searchInventory() {
    const searchTerm = document.getElementById('searchItemNumber').value.toLowerCase();
    const mockItems = [
        { id: 'CURITY-001', name: 'Sterile Gauze Pads', qty: 150 },
        { id: 'CURITY-002', name: 'Medical Gloves', qty: 500 },
        { id: 'CURITY-003', name: 'Bandages Assorted', qty: 320 },
        { id: 'CURITY-004', name: 'Antiseptic Solution', qty: 45 },
        { id: 'CURITY-005', name: 'Syringes', qty: 0 }
    ];

    const packingItems = document.getElementById('packingItems');
    const filtered = mockItems.filter(item =>
        item.id.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0 && searchTerm === '') {
        packingItems.innerHTML = '<p style="text-align:center; color:#999;">No items in list</p>';
        return;
    }

    if (filtered.length === 0) {
        packingItems.innerHTML = '<p style="text-align:center; color:#999;">No items found</p>';
        return;
    }

    packingItems.innerHTML = filtered.map(item => `
        <div class="inventory-item">
            <strong>${item.id}</strong>
            <p>${item.name}</p>
            <p>Qty: <strong>${item.qty}</strong> ${item.qty === 0 ? '❌ Out of Stock' : '✅ In Stock'}</p>
        </div>
    `).join('');
}

// ============================================
// MTR FORM FUNCTIONS
// ============================================

let mtrCounter = 0;
let mtrRequests = [];

function initializeMTRForm() {
    loadMTRRequests();
    generateMTRNumber();
    updateMTRRequestsList();
}

function generateMTRNumber() {
    const date = new Date();
    const dateStr = date.getFullYear() + 
                   String(date.getMonth() + 1).padStart(2, '0') + 
                   String(date.getDate()).padStart(2, '0');
    const count = String(++mtrCounter).padStart(4, '0');
    const mtrNumber = `MTR-${dateStr}-${count}`;
    document.getElementById('mtrNumber').value = mtrNumber;
}

function addMaterialRequest() {
    const itemNumber = document.getElementById('itemNumber').value.trim();
    const itemDescription = document.getElementById('itemDescription').value.trim();
    const quantity = document.getElementById('quantity').value;
    const unit = document.getElementById('unit').value;
    const priority = document.getElementById('priority').value;
    const notes = document.getElementById('notes').value.trim();
    const mtrNumber = document.getElementById('mtrNumber').value;

    if (!itemNumber || !itemDescription || !quantity) {
        alert('Please fill in Item Number, Description, and Quantity');
        return;
    }

    if (quantity <= 0) {
        alert('Quantity must be greater than 0');
        return;
    }

    const request = {
        id: Date.now(),
        mtrNumber: mtrNumber,
        itemNumber: itemNumber,
        itemDescription: itemDescription,
        quantity: parseInt(quantity),
        unit: unit,
        priority: priority,
        notes: notes,
        timestamp: new Date().toLocaleString()
    };

    mtrRequests.push(request);
    saveMTRRequests();
    updateMTRRequestsList();

    // Clear form
    document.getElementById('itemNumber').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('unit').value = 'Pieces';
    document.getElementById('priority').value = 'Normal';
    document.getElementById('notes').value = '';
    
    generateMTRNumber();
    alert('Request added successfully!');
}

function updateMTRRequestsList() {
    const requestsList = document.getElementById('requestsList');

    if (mtrRequests.length === 0) {
        requestsList.innerHTML = '<p style="text-align:center; color:#999;">No requests yet. Add one to start!</p>';
        return;
    }

    requestsList.innerHTML = mtrRequests.map((req, index) => `
        <div class="request-item">
            <div class="request-details">
                <strong>${req.itemNumber}</strong>
                <strong>${req.itemDescription}</strong>
                <small>Qty: ${req.quantity} ${req.unit} | Priority: ${req.priority}</small>
                <small>Added: ${req.timestamp}</small>
            </div>
            <button onclick="removeRequest(${req.id})" class="btn-delete">Remove</button>
        </div>
    `).join('');
}

function removeRequest(id) {
    mtrRequests = mtrRequests.filter(req => req.id !== id);
    saveMTRRequests();
    updateMTRRequestsList();
}

function saveMTRRequests() {
    localStorage.setItem('mtrRequests', JSON.stringify(mtrRequests));
}

function loadMTRRequests() {
    const saved = localStorage.getItem('mtrRequests');
    if (saved) {
        mtrRequests = JSON.parse(saved);
    }
}

function generateMTRReport() {
    if (mtrRequests.length === 0) {
        alert('No requests to generate report');
        return;
    }

    const now = new Date();
    const reportDate = now.toLocaleString();
    const totalItems = mtrRequests.length;
    const totalQuantity = mtrRequests.reduce((sum, req) => sum + req.quantity, 0);

    let tableRows = mtrRequests.map((req, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${req.itemNumber}</td>
            <td>${req.itemDescription}</td>
            <td>${req.quantity}</td>
            <td>${req.unit}</td>
            <td><span class="badge ${req.priority === 'Urgent' ? 'pending' : 'ready'}">${req.priority}</span></td>
            <td>${req.notes || '-'}</td>
        </tr>
    `).join('');

    const reportContent = `
        <div class="report-header">
            <h2>📋 Material Request Form (MTR) Report</h2>
            <p>Generated: ${reportDate}</p>
            <p>Total Requests: ${totalItems} | Total Quantity: ${totalQuantity}</p>
        </div>

        <table class="report-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item Number</th>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Priority</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <div class="report-footer">
            <p>© 2026 Harikrishnan BBW Production | MTR Auto-Generated Report</p>
            <p>This is an automatically generated report. Please verify all information before processing.</p>
        </div>
    `;

    document.getElementById('reportContent').innerHTML = reportContent;
    document.getElementById('mtrReportPreview').style.display = 'block';

    // Save report to localStorage
    localStorage.setItem('lastMTRReport', JSON.stringify({
        date: reportDate,
        requests: mtrRequests,
        html: reportContent
    }));
}

function printMTRReport() {
    window.print();
}

function downloadMTRReport() {
    const now = new Date();
    const filename = `MTR_Report_${now.getTime()}.html`;
    const content = document.getElementById('reportContent').innerHTML;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>MTR Report</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #667eea; color: white; }
                .report-header { text-align: center; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function clearAllRequests() {
    if (confirm('Are you sure you want to clear all requests? This cannot be undone.')) {
        mtrRequests = [];
        saveMTRRequests();
        updateMTRRequestsList();
        document.getElementById('mtrReportPreview').style.display = 'none';
        alert('All requests cleared');
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateInventoryStats();
    loadMTRRequests();
    
    // Set today's run
    const todayDate = new Date();
    const runNumber = String(todayDate.getDate()).padStart(2, '0');
    document.getElementById('todayRun').textContent = `CURITY${todayDate.getFullYear()}${String(todayDate.getMonth() + 1).padStart(2, '0')}${String(todayDate.getDate()).padStart(2, '0')}-${runNumber}`;
});