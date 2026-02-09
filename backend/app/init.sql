BEGIN;

-- UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE user_roles (
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- EXERCISES / MUSCLES
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE muscles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE exercise_muscles (
    exercise_id INT REFERENCES exercises(id) ON DELETE CASCADE,
    muscle_id INT REFERENCES muscles(id) ON DELETE CASCADE,
    PRIMARY KEY (exercise_id, muscle_id)
);

-- TRAINING PLANS
CREATE TABLE training_plans (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE training_plan_days (
    id SERIAL PRIMARY KEY,
    training_plan_id INT REFERENCES training_plans(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    order_index INT NOT NULL
);

CREATE TABLE training_plan_day_exercises (
    id SERIAL PRIMARY KEY,
    training_plan_day_id INT REFERENCES training_plan_days(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercises(id),
    order_index INT NOT NULL
);

CREATE TABLE training_plan_sets (
    id SERIAL PRIMARY KEY,
    training_plan_day_exercise_id INT REFERENCES training_plan_day_exercises(id) ON DELETE CASCADE,
    target_reps INT NOT NULL,
    target_weight NUMERIC
);

-- TRAINING SESSIONS
CREATE TABLE training_sessions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    training_plan_day_id INT REFERENCES training_plan_days(id),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE training_session_exercises (
    id SERIAL PRIMARY KEY,
    training_session_id INT REFERENCES training_sessions(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercises(id),
    order_index INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sets (
    id SERIAL PRIMARY KEY,
    training_session_exercise_id INT REFERENCES training_session_exercises(id) ON DELETE CASCADE,
    weight NUMERIC,
    reps INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SETTINGS
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    break_timer INT DEFAULT 90,
    push_notifications BOOLEAN DEFAULT TRUE,
    mail_notifications BOOLEAN DEFAULT TRUE
);

COMMIT;
