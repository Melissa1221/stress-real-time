import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { ROUTES } from '../shared/utils/routes';

interface FormData {
  fullName: string;
  age: string;
  gender: string;
  civilStatus: string;
  occupation: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    gender: '',
    civilStatus: '',
    occupation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-800 mb-2">
              Completa tu perfil
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nombre y Apellidos"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              required
            />

            <Input
              label="Edad"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ingresa tu edad"
              validation={{
                pattern: /^[0-9]{1,3}$/,
                message: "Por favor ingresa una edad válida"
              }}
              required
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-roboto font-medium text-gray-700">
                Género
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 
                         font-roboto text-base focus:outline-none focus:ring-2 
                         focus:ring-info-200 focus:border-info-500 
                         transition-all duration-200"
                required
              >
                <option value="">Selecciona tu género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-roboto font-medium text-gray-700">
                Estado Civil
              </label>
              <select
                name="civilStatus"
                value={formData.civilStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 
                         font-roboto text-base focus:outline-none focus:ring-2 
                         focus:ring-info-200 focus:border-info-500 
                         transition-all duration-200"
                required
              >
                <option value="">Selecciona tu estado civil</option>
                <option value="soltero">Soltero/a</option>
                <option value="casado">Casado/a</option>
                <option value="divorciado">Divorciado/a</option>
                <option value="viudo">Viudo/a</option>
                <option value="unionLibre">Unión Libre</option>
              </select>
            </div>

            <Input
              label="Ocupación/Nivel de estudios"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Ingresa tu ocupación o nivel de estudios"
              required
            />

            <div className="mt-2">
                <Button
                    text="Guardar Perfil"
                    color="success"
                    type="submit"
                    route={ROUTES.WELCOME}
                />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Form;