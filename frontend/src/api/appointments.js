const API_URL = 'http://localhost:5000/api';

export async function getServices() {
  const response = await fetch(`${API_URL}/services`);
  return response.json();
}

export async function createAppointment(appointmentData) {
  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Randevu oluşturulamadı.');
  }

  return response.json();
}
export async function getAppointments() {
  const response = await fetch(`${API_URL}/appointments`);
  return response.json();
}

export async function updateAppointmentStatus(id, status) {
  const token = localStorage.getItem('adminToken');

  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Randevu güncellenemedi.');
  }

  return response.json();
}

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Giriş başarısız.');
  }

  return response.json();
}