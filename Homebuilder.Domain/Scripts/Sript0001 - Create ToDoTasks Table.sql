CREATE TABLE toDoTasks (
	id INTEGER PRIMARY KEY NOT NULL,
	creationDate TEXT NOT NULL,
	toDo TEXT NULL,
	description TEXT NULL,
	information TEXT NULL,
	isComppleted bit NOT NULL,
	state INTEGER NOT NULL
);