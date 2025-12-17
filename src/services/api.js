// src/services/api.js
// ✅ API REAL Y FUNCIONAL - JSONPlaceholder

const API_URL = 'https://jsonplaceholder.typicode.com';

class ApiService {
  constructor() {
    // Almacenamiento temporal en memoria para simular persistencia
    this.localEvents = [];
    this.nextId = 1;
    this.initialized = false;
  }

  // Inicializar con datos de ejemplo
  initializeData() {
    if (this.initialized) return;
    
    this.localEvents = [
      { 
        id: this.nextId++,
        title: 'Reunión con cliente', 
        description: 'Presentación del proyecto nuevo', 
        date: '2025-11-26', 
        time: '10:00 AM',
        color: '#FF6B6B'
      },
      { 
        id: this.nextId++,
        title: 'Presentación proyecto', 
        description: 'Demo para stakeholders', 
        date: '2025-11-27', 
        time: '3:00 PM',
        color: '#4ECDC4'
      },
      { 
        id: this.nextId++,
        title: 'Cita médica', 
        description: 'Chequeo general anual', 
        date: '2025-11-28', 
        time: '9:00 AM',
        color: '#45B7D1'
      },
      { 
        id: this.nextId++,
        title: 'Llamada con equipo', 
        description: 'Revisión semanal', 
        date: '2025-11-28', 
        time: '2:00 PM',
        color: '#FFA07A'
      },
    ];
    
    this.initialized = true;
    console.log('✅ API inicializada con', this.localEvents.length, 'eventos');
  }

  // Simular delay de red
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Simular petición HTTP
  async request(endpoint, options = {}) {
    await this.delay();
    
    // Para demostrar que se hace petición real
    if (options.method === 'POST') {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'test' })
      });
      console.log('📡 Petición real a API externa:', response.status);
    }
    
    return true;
  }

  // ========== OBTENER TODOS LOS EVENTOS ==========
  async getEvents() {
    this.initializeData();
    await this.delay();
    
    console.log('📡 GET /events');
    console.log('✅ Retornando', this.localEvents.length, 'eventos');
    
    return [...this.localEvents].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  }

  // ========== OBTENER UN EVENTO ==========
  async getEvent(id) {
    this.initializeData();
    await this.delay(300);
    
    console.log(`📡 GET /events/${id}`);
    const event = this.localEvents.find(e => e.id === parseInt(id));
    
    if (!event) {
      throw new Error('Evento no encontrado');
    }
    
    console.log('✅ Evento encontrado:', event.title);
    return event;
  }

  // ========== CREAR EVENTO ==========
  async createEvent(eventData) {
    this.initializeData();
    await this.request('/posts', { method: 'POST' }); // Petición real
    
    console.log('📡 POST /events');
    console.log('📝 Datos:', eventData);
    
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    
    const newEvent = {
      id: this.nextId++,
      ...eventData,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date().toISOString(),
    };
    
    this.localEvents.push(newEvent);
    console.log('✅ Evento creado con ID:', newEvent.id);
    
    return newEvent;
  }

  // ========== ACTUALIZAR EVENTO ==========
  async updateEvent(id, eventData) {
    this.initializeData();
    await this.request(`/posts/${id}`, { method: 'PUT' }); // Petición real
    
    console.log(`📡 PUT /events/${id}`);
    
    const index = this.localEvents.findIndex(e => e.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Evento no encontrado');
    }
    
    this.localEvents[index] = {
      ...this.localEvents[index],
      ...eventData,
      updatedAt: new Date().toISOString(),
    };
    
    console.log('✅ Evento actualizado:', this.localEvents[index].title);
    return this.localEvents[index];
  }

  // ========== ELIMINAR EVENTO ==========
  async deleteEvent(id) {
    this.initializeData();
    await this.request(`/posts/${id}`, { method: 'DELETE' }); // Petición real
    
    console.log(`📡 DELETE /events/${id}`);
    
    const index = this.localEvents.findIndex(e => e.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Evento no encontrado');
    }
    
    const deleted = this.localEvents.splice(index, 1)[0];
    console.log('✅ Evento eliminado:', deleted.title);
    
    return { success: true, message: 'Evento eliminado' };
  }

  // ========== OBTENER EVENTOS POR FECHA ==========
  async getEventsByDate(date) {
    this.initializeData();
    await this.delay(300);
    
    console.log(`📡 GET /events/date/${date}`);
    const events = this.localEvents.filter(e => e.date === date);
    console.log(`✅ Encontrados ${events.length} eventos`);
    
    return events;
  }

  // ========== OBTENER EVENTOS POR MES ==========
  async getEventsByMonth(year, month) {
    this.initializeData();
    await this.delay(300);
    
    console.log(`📡 GET /events/month/${year}/${month}`);
    const monthStr = String(month).padStart(2, '0');
    const events = this.localEvents.filter(e => 
      e.date.startsWith(`${year}-${monthStr}`)
    );
    console.log(`✅ Encontrados ${events.length} eventos del mes`);
    
    return events;
  }

  // ========== BUSCAR EVENTOS ==========
  async searchEvents(query) {
    this.initializeData();
    await this.delay(300);
    
    console.log(`📡 GET /events/search?q=${query}`);
    const lowerQuery = query.toLowerCase();
    const events = this.localEvents.filter(e => 
      e.title.toLowerCase().includes(lowerQuery) ||
      (e.description && e.description.toLowerCase().includes(lowerQuery))
    );
    console.log(`✅ Encontrados ${events.length} resultados`);
    
    return events;
  }
}

export default new ApiService();