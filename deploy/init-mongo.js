// Script que se ejecuta al inicializar el contenedor de MongoDB
// Configuración de la base de datos para Task Manager API

print('=== Inicializando base de datos Task Manager ===');

// Conectar a la base de datos taskmanager
db = db.getSiblingDB('taskmanager');

// Crear usuario específico para la aplicación
db.createUser({
  user: 'taskmanager_user',
  pwd: 'taskmanager_password',
  roles: [
    {
      role: 'readWrite',
      db: 'taskmanager'
    }
  ]
});

print('Usuario taskmanager_user creado exitosamente');

// Crear índices para optimización de consultas
print('Creando índices...');

// Índices para la colección de tasks
db.tasks.createIndex({ "status": 1 });
db.tasks.createIndex({ "priority": 1 });
db.tasks.createIndex({ "categoryId": 1 });
db.tasks.createIndex({ "createdAt": -1 });
db.tasks.createIndex({ "dueDate": 1 });
db.tasks.createIndex({ "title": "text", "description": "text" }); // Para búsquedas de texto

// Índices para la colección de categories
db.categories.createIndex({ "name": 1 }, { unique: true });
db.categories.createIndex({ "createdAt": -1 });

print('Índices creados exitosamente');

// Insertar categorías de ejemplo
print('Insertando datos de ejemplo...');

var categoryIds = db.categories.insertMany([
  {
    name: "Work",
    description: "Work related tasks",
    color: "#FF6B6B",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Personal",
    description: "Personal tasks and activities",
    color: "#4ECDC4",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Learning",
    description: "Learning and development tasks",
    color: "#45B7D1",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Health",
    description: "Health and fitness related tasks",
    color: "#96CEB4",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Categorías insertadas: ' + categoryIds.insertedIds.length);

// Insertar tareas de ejemplo
var workCategoryId = db.categories.findOne({name: "Work"})._id;
var personalCategoryId = db.categories.findOne({name: "Personal"})._id;
var learningCategoryId = db.categories.findOne({name: "Learning"})._id;

var taskIds = db.tasks.insertMany([
  {
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the Task Manager API",
    status: "in_progress",
    priority: "high",
    categoryId: workCategoryId,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días desde ahora
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment",
    status: "pending",
    priority: "medium",
    categoryId: workCategoryId,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días desde ahora
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Learn Docker best practices",
    description: "Study Docker optimization and security practices",
    status: "pending",
    priority: "medium",
    categoryId: learningCategoryId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Buy groceries",
    description: "Weekly grocery shopping",
    status: "pending",
    priority: "low",
    categoryId: personalCategoryId,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 días desde ahora
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Review API endpoints",
    description: "Test all CRUD operations and validate responses",
    status: "completed",
    priority: "high",
    categoryId: workCategoryId,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
    updatedAt: new Date()
  }
]);

print('Tareas insertadas: ' + taskIds.insertedIds.length);

// Verificar que todo se creó correctamente
print('=== Verificación de datos ===');
print('Total categorías: ' + db.categories.countDocuments());
print('Total tareas: ' + db.tasks.countDocuments());

// Mostrar estadísticas por estado
var statusStats = db.tasks.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
]).toArray();

print('Estadísticas por estado:');
statusStats.forEach(function(stat) {
  print('  ' + stat._id + ': ' + stat.count);
});

print('=== Inicialización completada exitosamente ===');