CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  login TEXT,
  password_hash TEXT,
  salt TEXT,
  experience INTEGER,
  level INTEGER
);
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  token TEXT UNIQUE,
  created_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);
CREATE TABLE task_categories (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE task_difficulties (
  id SERIAL PRIMARY KEY,
  name TEXT,
  max_experience INTEGER
);
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  type TEXT,
  answer_type TEXT,
  title TEXT,
  description TEXT,
  category_id INTEGER,
  difficulty_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES task_categories(id),
  FOREIGN KEY (difficulty_id) REFERENCES task_difficulties(id)
);
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  task_id INTEGER REFERENCES tasks(id),
  experience_gained INTEGER,
  last_attempt_at TIMESTAMPTZ
);