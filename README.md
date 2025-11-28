# AcademiaQuest 🎮

Aplicación de gamificación educativa diseñada para motivar a estudiantes de 14-15 años mediante un sistema de XP, niveles, rachas, misiones, desafíos, insignias, equipos y rankings.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd Gamificacion

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

## 📦 Despliegue

### Vercel

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Desplegar:
```bash
vercel
```

O conectar tu repositorio GitHub directamente desde el dashboard de Vercel.

### Netlify

1. Instalar Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Desplegar:
```bash
netlify deploy --prod
```

O arrastra la carpeta `dist` (después de `npm run build`) al dashboard de Netlify.

### Configuración de Build

Ambas plataformas detectarán automáticamente Vite. Asegúrate de que el comando de build sea:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

## 🎯 Características

### Sistema de Gamificación

- **XP y Niveles**: Gana experiencia completando misiones y sube de nivel
- **Rachas**: Mantén una racha diaria para obtener bonos de XP
- **Badges**: Desbloquea insignias completando logros
- **Ranking**: Compite con otros estudiantes y equipos

### Misiones

- **Misiones Individuales**: Tareas y retos personales
- **Misiones Grupales**: Colabora con tu equipo en proyectos
- **Progreso Actualizable**: Actualiza tu progreso manualmente
- **Deadlines**: Completa misiones antes de que venzan

### Desafíos

- **Tiempo Limitado**: Desafíos con duración específica
- **Diferentes Dificultades**: Básico, Intermedio, Avanzado
- **Recompensas**: XP extra por completar desafíos

### Equipos

- **Colaboración**: Trabaja con compañeros en misiones grupales
- **Códigos de Invitación**: Invita miembros con códigos únicos
- **Ranking de Equipos**: Compite contra otros equipos

## 🛠️ Tecnologías

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Context API** - Estado global
- **localStorage** - Persistencia (mock API)

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── config/         # Configuración (gamificación)
├── context/        # Estado global (Context API)
├── data/           # Seed data
├── hooks/          # Custom hooks
├── pages/          # Páginas de la aplicación
├── services/       # Servicios (storage, API)
└── types/          # Tipos TypeScript
```

## ⚙️ Configuración de Gamificación

Los parámetros de gamificación se pueden ajustar en `src/config/gamification.ts`:

- Fórmula de cálculo de niveles
- Bonos por racha
- Multiplicadores de XP por dificultad
- Configuración de badges
- Sistema de rangos

Ver el archivo para más detalles y ejemplos de ajustes.

## 🧪 Tests

```bash
# Ejecutar tests (cuando estén implementados)
npm test
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Crea build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecuta ESLint
- `npm run typecheck` - Verifica tipos TypeScript

## 🎨 Personalización

### Cambiar Colores

Los colores principales están definidos en `tailwind.config.js`. Puedes modificar la paleta de colores allí.

### Ajustar Parámetros de Gamificación

Edita `src/config/gamification.ts` para cambiar:
- Fórmulas de XP y niveles
- Bonos y multiplicadores
- Condiciones de badges
- Rangos y títulos

## 🔐 Autenticación

Actualmente usa autenticación simulada. Para producción, se recomienda:

1. Integrar con un servicio de autenticación (Auth0, Firebase, etc.)
2. Implementar JWT tokens
3. Agregar protección de rutas

## 📊 Persistencia

Actualmente usa `localStorage` como API mock. Para producción:

1. Crear API REST backend
2. Reemplazar `src/services/storage.ts` con llamadas HTTP
3. Implementar sincronización en tiempo real (opcional)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Equipo AcademiaQuest

## 🙏 Agradecimientos

- Estudiantes y educadores que proporcionaron feedback
- Comunidad de código abierto

---

**Nota**: Este es un prototipo funcional. Para producción, se recomienda implementar backend real, tests completos, y mejoras de seguridad.
