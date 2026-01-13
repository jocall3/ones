import React from 'react';

const HomePageEs = () => {
  return (
    <div>
      <h1>Bienvenido a Nuestra Plataforma Financiera</h1>
      <p>
        Ofrecemos soluciones financieras innovadoras para individuos y empresas.
      </p>

      <h2>Características Principales</h2>
      <ul>
        <li>
          <strong>Cuentas Virtuales:</strong> Administre sus finanzas de manera
          eficiente con nuestras cuentas virtuales.
        </li>
        <li>
          <strong>Pagos Esperados:</strong> Manténgase al tanto de sus pagos
          futuros.
        </li>
        <li>
          <strong>Cumplimiento de Seguridad:</strong> Priorizamos la seguridad y
          el cumplimiento en todas nuestras operaciones.
        </li>
        <li>
          <strong>Integración de API:</strong> Integre nuestra plataforma con sus
          sistemas existentes a través de nuestra API.
        </li>
      </ul>

      <h2>¿Por qué elegirnos?</h2>
      <p>
        Nuestra plataforma está diseñada para ser intuitiva, segura y eficiente.
        Ofrecemos una amplia gama de herramientas y servicios para ayudarle a
        alcanzar sus objetivos financieros.
      </p>

      <h2>Comience Hoy Mismo</h2>
      <p>
        Regístrese ahora para comenzar a utilizar nuestra plataforma y descubrir
        todo lo que tenemos para ofrecer.
      </p>

      <footer>
        <p>© {new Date().getFullYear()} Nuestra Plataforma Financiera</p>
      </footer>
    </div>
  );
};

export default HomePageEs;