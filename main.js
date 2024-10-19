const personas = [
  { id: 1, nombre: "Alex", email: "alexmonzon@email.com" },
  { id: 2, nombre: "María", email: "maria.perez@email.com" },
  { id: 3, nombre: "Juan", email: "juan.lopez@email.com" },
  { id: 4, nombre: "Sofía", email: "sofia.gomez@email.com" },
  { id: 5, nombre: "Carlos", email: "carlos.fernandez@email.com" },
  { id: 6, nombre: "Lucía", email: "lucia.rodriguez@email.com" },
  { id: 7, nombre: "Pedro", email: "pedro.martinez@email.com" },
  { id: 8, nombre: "Ana", email: "ana.garcia@email.com" },
  { id: 9, nombre: "Luis", email: "luis.sanchez@email.com" },
  { id: 10, nombre: "Elena", email: "elena.castillo@email.com" },
];

let contadorId = 11;
let currentId = null;

function agregarPersona() {
  const nombre = document.querySelector('input[name="nombre"]').value;
  const email = document.querySelector('input[name="email"]').value;

  if (nombre.trim() === "" || email.trim() === "") {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const data = {
    id: contadorId,
    nombre: nombre,
    email: email,
  };

  contadorId++;
  personas.push(data);
  printList();
  console.log(data);
}

function loadFormData(id) {
  const persona = personas.find((p) => p.id == id);
  if (persona) {
    document.getElementById("nombre").value = persona.nombre;
    document.getElementById("email").value = persona.email;
    currentId = id;
  }
}

function updatePersona() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  if (currentId !== null) {
    const persona = personas.find((p) => p.id == currentId);
    if (persona) {
      persona.nombre = nombre;
      persona.email = email;
      printList();
    }
  }
}

function deletePersona(Id) {
  for (let i = 0; i < personas.length; i++) {
    if (personas[i].id == Id) {
      personas.splice(i, 1);
      break;
    }
  }
  printList();
}

function printList() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";
  personas.forEach((element) => {
    ul.innerHTML += `
      <li class="persona-item">
        <span class="persona-id">${element.id}</span>
        <span class="persona-nombre">${element.nombre}</span>
        <span class="persona-email">${element.email}</span>
        <span class="boton"><button class="delete-btn" type="button" data-id="${element.id}">Delete</button></span>
        <span class="boton"><button class="update-btn" type="button" data-id="${element.id}">Update</button></span>
      </li>
    `;
  });

  const updateButtons = document.querySelectorAll(".update-btn");
  updateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const personaId = this.getAttribute("data-id");
      loadFormData(personaId);
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const personaId = this.getAttribute("data-id");
      console.log(personaId);
      deletePersona(personaId);
    });
  });
}

const button = document.querySelector("button");
button.addEventListener("click", function (event) {
  event.preventDefault();
  agregarPersona();
});

printList();
