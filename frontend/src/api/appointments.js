const API_URL = 'http://localhost:5000/api';

export async function getServices() {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
}

export async function createAppointment(data) {
  const res = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || 'Hata oluştu');
  }

  return result;
}

export async function getAppointments() {
  const res = await fetch(`${API_URL}/appointments`);
  return res.json();
}

export async function updateAppointmentStatus(id, status) {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_URL}/appointments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || 'Güncellenemedi');
  }

  return result;
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || 'Giriş başarısız');
  }

  return result;
}
export async function getAvailableSlots(date, duration) {
  const response = await fetch(
    `${API_URL}/appointments/slots?date=${date}&duration=${duration}`
  );
  return response.json();
}
export async function addService(data) {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Hizmet eklenemedi.');
  }
  return response.json();
}

export async function updateService(id, data) {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Hizmet güncellenemedi.');
  }
  return response.json();
}

export async function deleteService(id) {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Hizmet silinemedi.');
  }
  return response.json();
}