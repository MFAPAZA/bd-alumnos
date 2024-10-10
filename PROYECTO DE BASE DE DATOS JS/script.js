// Definición de la clase Alumno
class Alumno {
    constructor(nombre, apellidos, edad) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.edad = parseInt(edad);
      this.materias = [];
      this.calificaciones = {};
    }
  
    // Método para inscribir una materia
    inscribirMateria(materia) {
      if (!this.materias.includes(materia)) {
        this.materias.push(materia);
      }
    }
  
    // Método para asignar calificaciones
    asignarCalificacion(materia, calificacion) {
      if (this.materias.includes(materia)) {
        this.calificaciones[materia] = calificacion;
      } else {
        console.error(`El alumno no está inscrito en ${materia}`);
      }
    }
  
    // Obtener promedio de las calificaciones
    obtenerPromedio() {
      const calificaciones = Object.values(this.calificaciones);
      if (calificaciones.length === 0) return 0;
      const suma = calificaciones.reduce((a, b) => a + b, 0);
      return (suma / calificaciones.length).toFixed(2);
    }
  }
  
  // Lista para almacenar alumnos
  const alumnos = [];
  
  // Función para agregar un alumno
  document.getElementById('altaAlumnoForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
  
    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
  
    actualizarTabla(); // Actualiza la tabla de alumnos
    document.getElementById('altaAlumnoForm').reset(); // Limpiar el formulario
  });
  
  // Función para mostrar los alumnos en la tabla
  function actualizarTabla() {
    const tbody = document.getElementById('tablaAlumnos').querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
  
    alumnos.forEach(alumno => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.apellidos}</td>
        <td>${alumno.edad}</td>
        <td>${alumno.materias.length ? alumno.materias.join(', ') : 'Sin materias'}</td>
        <td>${Object.keys(alumno.calificaciones).length ? JSON.stringify(alumno.calificaciones) : 'Sin calificaciones'}</td>
        <td>${alumno.obtenerPromedio()}</td>
      `;
  
      tbody.appendChild(row);
    });
  }
  
  // Función para buscar alumnos por nombre o apellido
  document.getElementById('buscarBtn').addEventListener('click', function() {
    const nombreBusqueda = document.getElementById('busquedaNombre').value.toLowerCase();
    const apellidoBusqueda = document.getElementById('busquedaApellido').value.toLowerCase();
  
    const resultados = alumnos.filter(alumno =>
      alumno.nombre.toLowerCase().includes(nombreBusqueda) ||
      alumno.apellidos.toLowerCase().includes(apellidoBusqueda)
    );
  
    mostrarResultados(resultados);
  });
  
  // Función para mostrar los resultados de búsqueda
  function mostrarResultados(resultados) {
    const tbody = document.getElementById('tablaAlumnos').querySelector('tbody');
    tbody.innerHTML = '';
  
    resultados.forEach(alumno => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.apellidos}</td>
        <td>${alumno.edad}</td>
        <td>${alumno.materias.length ? alumno.materias.join(', ') : 'Sin materias'}</td>
        <td>${Object.keys(alumno.calificaciones).length ? JSON.stringify(alumno.calificaciones) : 'Sin calificaciones'}</td>
        <td>${alumno.obtenerPromedio()}</td>
      `;
  
      tbody.appendChild(row);
    });
  }
  