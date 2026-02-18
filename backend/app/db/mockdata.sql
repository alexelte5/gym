-- =========================================
-- EXTENSIONS
-- =========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- USERS
-- =========================================
INSERT INTO users (user_id, username)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'max'),
  ('22222222-2222-2222-2222-222222222222', 'lisa');

-- =========================================
-- SETTINGS
-- =========================================
INSERT INTO settings (user_id, break_timer, push_notifications, mail_notifications)
VALUES
  ('11111111-1111-1111-1111-111111111111', 120, TRUE, TRUE),
  ('22222222-2222-2222-2222-222222222222', 90, TRUE, FALSE);

-- =========================================
-- MUSCLES
-- =========================================
INSERT INTO muscles (id, name)
VALUES
  (1, 'Chest'),
  (2, 'Back'),
  (3, 'Legs'),
  (4, 'Shoulders'),
  (5, 'Biceps'),
  (6, 'Triceps');

-- =========================================
-- EXERCISES
-- =========================================
INSERT INTO exercises (id, name)
VALUES
  (1, 'Bench Press'),
  (2, 'Squat'),
  (3, 'Deadlift'),
  (4, 'Pull Up'),
  (5, 'Shoulder Press'),
  (6, 'Bicep Curl');

-- =========================================
-- EXERCISE ↔ MUSCLES
-- =========================================
INSERT INTO exercise_muscles (exercise_id, muscle_id)
VALUES
  (1, 1), (1, 6),
  (2, 3),
  (3, 2), (3, 3),
  (4, 2), (4, 5),
  (5, 4), (5, 6),
  (6, 5);

-- =========================================
-- TRAINING PLANS
-- =========================================
INSERT INTO training_plans (id, user_id, name)
VALUES
  (1, '11111111-1111-1111-1111-111111111111', 'Push Pull Legs'),
  (2, '22222222-2222-2222-2222-222222222222', 'Full Body Beginner');

-- =========================================
-- TRAINING PLAN DAYS
-- =========================================
INSERT INTO training_plan_days (id, training_plan_id, name, order_index)
VALUES
  (1, 1, 'Push', 1),
  (2, 1, 'Pull', 2),
  (3, 1, 'Legs', 3),
  (4, 2, 'Full Body A', 1);

-- =========================================
-- TRAINING PLAN DAY EXERCISES
-- =========================================
INSERT INTO training_plan_day_exercises (id, training_plan_day_id, exercise_id, order_index)
VALUES
  (1, 1, 1, 1),
  (2, 1, 5, 2),
  (3, 2, 4, 1),
  (4, 2, 6, 2),
  (5, 3, 2, 1),
  (6, 3, 3, 2);

-- =========================================
-- TRAINING PLAN SETS
-- =========================================
INSERT INTO training_plan_sets (training_plan_day_exercise_id, target_reps, target_weight)
VALUES
  (1, 8, 80),
  (1, 8, 80),
  (2, 10, 40),
  (3, 8, NULL),
  (4, 12, 20),
  (5, 6, 100),
  (6, 5, 140);

-- =========================================
-- TRAINING SESSION
-- =========================================
INSERT INTO training_sessions (id, user_id, training_plan_day_id, start_date, end_date)
VALUES
  (1,
   '11111111-1111-1111-1111-111111111111',
   1,
   '2026-02-01 18:00:00',
   '2026-02-01 19:10:00');

-- =========================================
-- TRAINING SESSION EXERCISES
-- =========================================
INSERT INTO training_session_exercises (id, training_session_id, exercise_id, order_index)
VALUES
  (1, 1, 1, 1),
  (2, 1, 5, 2);

-- =========================================
-- SETS (LOGGED)
-- =========================================
INSERT INTO sets (training_session_exercise_id, weight, reps)
VALUES
  (1, 80, 8),
  (1, 80, 8),
  (1, 75, 9),
  (2, 40, 10),
  (2, 40, 10);
