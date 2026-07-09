import { useState, useEffect } from 'react';
import { getServices, addService, updateService, deleteService } from '../../api/appointments';

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [serviceForm, setServiceForm] = useState({ name: '', duration: '', price: '' });
  const [editingService, setEditingService] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getServices().then((data) => { setServices(data); setLoading(false); });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      if (editingService) {
        const updated = await updateService(editingService.id, serviceForm);
        setServices((prev) => prev.map((s) => s.id === updated.id ? updated : s));
        setMessage('Hizmet güncellendi ✅');
      } else {
        const newService = await addService(serviceForm);
        setServices((prev) => [...prev, newService]);
        setMessage('Hizmet eklendi ✅');
      }
      setServiceForm({ name: '', duration: '', price: '' });
      setEditingService(null);
      setShowForm(false);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      alert(error.message);
    }
  }

  function startEdit(service) {
    setEditingService(service);
    setServiceForm({ name: service.name, duration: service.duration, price: service.price });
    setShowForm(true);
  }

  if (loading) return <p className="loading-text loading-pulse">Yükleniyor...</p>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Hizmetler</h1>
        <p className="admin-page-subtitle">Sunulan hizmetleri buradan yönetin.</p>
      </div>

      <div className="service-management">
        <div className="service-mgmt-header">
          <h2 className="admin-section-title" style={{ margin: 0 }}>
            {editingService ? 'Hizmet Düzenle' : 'Hizmet Listesi'}
          </h2>
          <button
            className="btn-toggle-service"
            onClick={() => {
              setShowForm(!showForm);
              setEditingService(null);
              setServiceForm({ name: '', duration: '', price: '' });
              setMessage('');
            }}
          >
            {showForm ? 'Kapat' : '+ Yeni Hizmet'}
          </button>
        </div>

        {showForm && (
          <form className="service-form" onSubmit={handleSubmit}>
            <div className="service-form-grid">
              <div className="form-group">
                <label className="form-label">Hizmet Adı</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="örn. Cilt Bakımı"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Süre (dk)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="örn. 45"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Fiyat (₺)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="örn. 250"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group service-form-btn">
                <button type="submit" className="btn-confirm" style={{ padding: '11px 20px' }}>
                  {editingService ? 'Güncelle' : 'Ekle'}
                </button>
                {editingService && (
                  <button
                    type="button"
                    className="btn-cancel"
                    style={{ padding: '11px 20px' }}
                    onClick={() => { setEditingService(null); setServiceForm({ name: '', duration: '', price: '' }); }}
                  >
                    İptal
                  </button>
                )}
              </div>
            </div>
            {message && (
              <p className={`service-message ${message.includes('✅') ? 'success' : 'error'}`}>
                {message}
              </p>
            )}
          </form>
        )}

        <div className="service-list">
          {services.map((service) => (
            <div key={service.id} className="service-row">
              <div className="service-row-info">
                <span className="service-row-name">{service.name}</span>
                <span className="service-row-meta">{service.duration} dk · {service.price}₺</span>
              </div>
              <div className="service-row-actions">
                <button className="btn-edit" onClick={() => startEdit(service)}>Düzenle</button>
                <button className="btn-cancel" style={{ padding: '6px 12px' }} onClick={() => handleDelete(service.id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminServices;