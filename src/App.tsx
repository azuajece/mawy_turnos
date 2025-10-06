import type React from 'react'
import { useState } from 'react'
import './App.css'

interface FormErrors {
  phoneNumber?: string
  category?: string
  service?: string
  table?: string
  date?: string
  time?: string
  participants?: string
}

interface FormData {
  phoneNumber: string
  areaCode: string
  category: string
  service: string
  table: string
  date: string
  time: string
  adults: number
  children: number
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    areaCode: '11',
    category: '',
    service: '',
    table: '',
    date: '',
    time: '',
    adults: 0,
    children: 0
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const total = formData.adults + formData.children

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'El teléfono es requerido'
    } else if (!/^\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Ingrese un número válido de 8 dígitos'
    }

    if (!formData.category) {
      newErrors.category = 'Seleccione una categoría'
    }

    if (!formData.service) {
      newErrors.service = 'Seleccione un servicio'
    }

    if (!formData.table) {
      newErrors.table = 'Seleccione una mesa'
    }

    if (!formData.date) {
      newErrors.date = 'Seleccione una fecha'
    }

    if (!formData.time) {
      newErrors.time = 'Seleccione una hora'
    }

    if (total === 0) {
      newErrors.participants = 'Debe agregar al menos un participante'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate random success/failure for demo
      if (Math.random() > 0.3) {
        setSubmitStatus('success')
        // Reset form on success
        setFormData({
          phoneNumber: '',
          areaCode: '11',
          category: '',
          service: '',
          table: '',
          date: '',
          time: '',
          adults: 0,
          children: 0
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const incrementCounter = (field: 'adults' | 'children') => {
    updateFormData(field, formData[field] + 1)
  }

  const decrementCounter = (field: 'adults' | 'children') => {
    updateFormData(field, Math.max(0, formData[field] - 1))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">El Mundo de Mawy</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`bg-white border-t transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-48' : 'max-h-0'}`}>
          <div className="p-4 space-y-3">
            <a href="#reservas" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Reservas</a>
            <a href="#servicios" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Servicios</a>
            <a href="#contacto" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-blue-600 to-blue-700 pt-8 pb-16">
        <div className="container mx-auto px-4 text-center">
          {/* Astronaut Character */}
          <div className="mb-6 transform transition-transform duration-500 hover:scale-110">
            <img
              src="https://ext.same-assets.com/957600979/1079502157.png"
              alt="Astronaut Character"
              className="w-32 h-32 mx-auto animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>

          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img
              src="https://ext.same-assets.com/957600979/3209818673.png"
              alt="El Mundo de Mawy"
              className="mx-auto max-w-md w-full transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="container mx-auto px-4 -mt-4 mb-4">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md max-w-4xl mx-auto animate-slide-down">
            <div className="flex items-center">
              <span className="text-xl mr-2">✅</span>
              <div>
                <p className="font-semibold">¡Reserva enviada exitosamente!</p>
                <p className="text-sm">Recibirás una confirmación por WhatsApp en breve.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="container mx-auto px-4 -mt-4 mb-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md max-w-4xl mx-auto animate-slide-down">
            <div className="flex items-center">
              <span className="text-xl mr-2">❌</span>
              <div>
                <p className="font-semibold">Error al enviar la reserva</p>
                <p className="text-sm">Por favor intenta nuevamente o contacta por WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto transform transition-all duration-500 hover:shadow-xl">
          {/* Reservas Header */}
          <div className="mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📅</span> Reservas
            </h2>
            <p className="text-gray-600 mt-2">
              Completa el siguiente formulario para reservar tu reserva.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tus datos */}
            <section className="animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tus datos</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono celular *
                </label>
                <div className="flex">
                  <select
                    value={formData.areaCode}
                    onChange={(e) => updateFormData('areaCode', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="11">+54 11</option>
                    <option value="351">+54 351</option>
                    <option value="261">+54 261</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    placeholder="XXXXXXXX"
                    className={`flex-1 px-3 py-2 border border-l-0 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1 animate-shake">{errors.phoneNumber}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Sin 0 ni 15. Ingrese sólo números.
                </p>
              </div>
            </section>

            {/* Reserva */}
            <section className="animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reserva</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccione...</option>
                    <option value="cumpleanos">Cumpleaños</option>
                    <option value="evento">Evento especial</option>
                    <option value="juego-libre">Juego libre</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servicio *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => updateFormData('service', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.service ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccione categoría...</option>
                    <option value="basico">Paquete básico</option>
                    <option value="premium">Paquete premium</option>
                    <option value="deluxe">Paquete deluxe</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{errors.service}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesa *
                  </label>
                  <select
                    value={formData.table}
                    onChange={(e) => updateFormData('table', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.table ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccione...</option>
                    <option value="mesa1">Mesa 1</option>
                    <option value="mesa2">Mesa 2</option>
                    <option value="mesa3">Mesa 3</option>
                  </select>
                  {errors.table && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{errors.table}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateFormData('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => updateFormData('time', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccione fecha...</option>
                    <option value="10:00">10:00</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{errors.time}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Participantes */}
            <section className="animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Participantes</h3>
              <p className="text-sm text-gray-600 mb-4">Cupos disponibles: 0</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adultos *
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => decrementCounter('adults')}
                      className="w-8 h-8 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 h-8 bg-gray-100 flex items-center justify-center border-t border-b border-gray-300">
                      {formData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementCounter('adults')}
                      className="w-8 h-8 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Máximo 3 adultos por niño/a
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niños/as *
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => decrementCounter('children')}
                      className="w-8 h-8 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 h-8 bg-gray-100 flex items-center justify-center border-t border-b border-gray-300">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementCounter('children')}
                      className="w-8 h-8 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total
                  </label>
                  <div className="w-16 h-8 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-md">
                    {total}
                  </div>
                </div>
              </div>

              {errors.participants && (
                <p className="text-red-500 text-xs mt-2 animate-shake">{errors.participants}</p>
              )}
            </section>

            {/* Payment Section */}
            <section className="animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pago con Mercado Pago</h3>

              <div className="bg-gray-50 p-4 rounded-md mb-4 transform transition-transform hover:scale-105">
                <h4 className="font-semibold text-center text-gray-800 mb-2">
                  Total de la seña
                </h4>
                <p className="text-center text-gray-600 text-xl font-bold">
                  ${total * 2000} (${total} x $2000)
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md mb-4 border-l-4 border-blue-400">
                <p className="text-sm text-blue-800">
                  El valor abonado en concepto de seña se puede usar como crédito a favor para consumir en el local
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md mb-6 border-l-4 border-blue-400">
                <p className="text-sm text-blue-800">
                  Si tienen alguna duda, vienen en grupos de familias o superan la cantidad permitida, por favor comunicarse previamente al{' '}
                  <a href="https://wa.me/5491166690314" className="text-blue-600 underline hover:text-blue-800 transition-colors">
                    WhatsApp 11 6669 0314
                  </a>{' '}
                  para coordinar la reserva.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg transform hover:scale-105 active:scale-95"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Enviando...
                  </div>
                ) : (
                  'AGENDAR'
                )}
              </button>
            </section>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Powered by{' '}
            <a href="https://turnos.app" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              Turnos.app
            </a>
          </p>
          <img
            src="https://ext.same-assets.com/957600979/448456529.png"
            alt="Cuatro Lados"
            className="mx-auto h-8 transform transition-transform hover:scale-110"
          />
        </div>
      </footer>
    </div>
  )
}

export default App
