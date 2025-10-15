// --- LocalStorage Helper Functions ---
const getReports = () => JSON.parse(localStorage.getItem('swachh-rail-reports')) || [];
const saveReports = (reports) => localStorage.setItem('swachh-rail-reports', JSON.stringify(reports));

// --- Report Page Logic ---
const handleReportSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const newReport = {
        id: `SR-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        passengerName: formData.get('passengerName'),
        location: formData.get('location'),
        description: formData.get('description'),
        status: 'Pending',
        timestamp: new Date().toISOString(),
    };

    const reports = getReports();
    reports.unshift(newReport); // Add new reports to the top
    saveReports(reports);

    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.classList.remove('hidden');
        form.reset();
        setTimeout(() => successMessage.classList.add('hidden'), 5000);
    }
};

// --- Dashboard Page Logic ---
const renderDashboard = () => {
    const reports = getReports(); // Already sorted by new first
    const tableBody = document.querySelector('#reports-table tbody');
    const noReportsMessage = document.getElementById('no-reports-message');
    const tableWrapper = document.querySelector('.table-wrapper');

    if (!tableBody || !noReportsMessage || !tableWrapper) return;
    
    tableBody.innerHTML = '';

    if (reports.length === 0) {
        noReportsMessage.classList.remove('hidden');
        tableWrapper.classList.add('hidden');
    } else {
        noReportsMessage.classList.add('hidden');
        tableWrapper.classList.remove('hidden');

        reports.forEach(report => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.id.substring(0, 12)}</td>
                <td>${report.location}</td>
                <td>${report.description}</td>
                <td>
                    <select class="status-select" data-id="${report.id}">
                        <option value="Pending" ${report.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In Progress" ${report.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Resolved" ${report.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                </td>
                <td>
                    <button class="delete-btn" data-id="${report.id}" title="Delete Report">🗑️</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        addDashboardEventListeners();
    }
};

const addDashboardEventListeners = () => {
    const table = document.getElementById('reports-table');
    if (!table) return;

    table.addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            updateReportStatus(e.target.dataset.id, e.target.value);
        }
    });

    table.addEventListener('click', (e) => {
        const deleteButton = e.target.closest('.delete-btn');
        if (deleteButton) {
            if (confirm('Are you sure you want to delete this report?')) {
                deleteReport(deleteButton.dataset.id);
            }
        }
    });
};

const updateReportStatus = (id, newStatus) => {
    let reports = getReports().map(report => 
        report.id === id ? { ...report, status: newStatus } : report
    );
    saveReports(reports);
};

const deleteReport = (id) => {
    saveReports(getReports().filter(report => report.id !== id));
    renderDashboard(); // Re-render the dashboard to reflect the deletion
};

// --- Initialization based on page ---
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('report.html')) {
        const reportForm = document.getElementById('report-form');
        if (reportForm) {
            reportForm.addEventListener('submit', handleReportSubmit);
        }
    }

    if (path.includes('dashboard.html')) {
        renderDashboard();
    }
});
