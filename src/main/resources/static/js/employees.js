const API = '/api/employees';

async function loadEmployees() {
    const res  = await fetch(API);
    const data = await res.json();
    renderTable(data);
    document.getElementById('total-count').textContent = data.length;
    document.getElementById('active-count').textContent =
        data.filter(e => e.status === 'ACTIVE').length;
}

async function searchEmployees(keyword) {
    if (keyword.trim() === '') { loadEmployees(); return; }
    const res  = await fetch(`${API}/search?keyword=${keyword}`);
    const data = await res.json();
    renderTable(data);
}

async function addEmployee() {
    const deptId = document.getElementById('add-department').value;
    const employee = {
        firstName:   document.getElementById('add-firstName').value,
        lastName:    document.getElementById('add-lastName').value,
        email:       document.getElementById('add-email').value,
        phone:       document.getElementById('add-phone').value,
        designation: document.getElementById('add-designation').value,
        status:      'ACTIVE',
        department:  deptId ? { id: parseInt(deptId) } : null
    };

    try {
        const res = await fetch(API, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(employee)
        });
        if (!res.ok) {
            const err = await res.text();
            alert('Error saving: ' + err);
            return;
        }
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
        loadEmployees();
    } catch (e) {
        alert('Failed to save: ' + e.message);
    }
}
}
}

async function deleteEmployee(id) {
    if (!confirm('Delete this employee?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadEmployees();
}

async function generateJD(designation, department) {
    const card = document.getElementById('jd-card');
    const out  = document.getElementById('jd-output');
    card.style.display = 'block';
    out.textContent = '✨ Generating job description with AI...';
    card.scrollIntoView({ behavior: 'smooth' });

    const res  = await fetch('/api/ai/generate-jd', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ designation, department })
    });
    const data = await res.json();
    out.textContent = data.jobDescription;
}

function renderTable(employees) {
    const tbody = document.getElementById('emp-table-body');
    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No employees found</td></tr>';
        return;
    }
    tbody.innerHTML = employees.map(e => `
        <tr>
            <td>${e.firstName} ${e.lastName}</td>
            <td>${e.email}</td>
            <td><span class="badge bg-secondary">${e.department?.name ?? '—'}</span></td>
            <td>${e.designation ?? '—'}</td>
            <td><span class="badge bg-${e.status === 'ACTIVE' ? 'success' : 'secondary'}">${e.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-danger me-1"
                        onclick="deleteEmployee(${e.id})">Delete</button>
                <button class="btn btn-sm btn-outline-info"
                        onclick="generateJD('${e.designation}','${e.department?.name}')">✨ AI JD</button>
            </td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadEmployees);
document.getElementById('search-input')
        .addEventListener('input', e => searchEmployees(e.target.value));