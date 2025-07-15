INSERT INTO Quizzes (QuizID, Title, Category)
VALUES 
  (1, 'Basic Taekwondo Knowledge', 'Martial Arts');

INSERT INTO Questions (QuestionID, QuizID, QuestionText, CorrectAnswer)
VALUES 
  (1, 1, 'What does Taekwondo mean?', 2),
  (2, 1, 'How many belts are there in Taekwondo?', 3);

-- For QuestionID = 1
INSERT INTO Options (OptionID, QuestionID, OptionText) VALUES
  (1, 1, 'Way of the sword'),
  (2, 1, 'Way of the foot and fist'),
  (3, 1, 'Way of the warrior'),
  (4, 1, 'Way of peace');

-- For QuestionID = 2
INSERT INTO Options (OptionID, QuestionID, OptionText) VALUES
  (5, 2, '5'),
  (6, 2, '7'),
  (7, 2, '10'),
  (8, 2, '12');

INSERT INTO UserQuizResults (UserID, QuizID, Score)
VALUES (1, 1, 100);

INSERT INTO UserScores (rank1, UserID, QuizID, Score)
VALUES (1, 1, 1, 100);


INSERT INTO Users (UserId, Username, Email, PasswordHash)
VALUES 
  (12, 'David', 'david@example.com', 'hashedpass1'),
  (21, 'Jane', 'jane@example.com', 'hashedpass2'),
  (31, 'Ali', 'ali@example.com', 'hashedpass3');

INSERT INTO Profiles (ProfileId, UserId, Username, Role, AvatarUrl, Achievements, Skills)
VALUES
  (UUID(), 12, 'David', 'Black Belt', 'https://example.com/avatar1.png', '["Won nationals"]', '["Kicks", "Forms"]'),
  (UUID(), 21, 'Jane', 'Green Belt', 'https://example.com/avatar2.png', '["Local champ"]', '["Sparring"]'),
  (UUID(), 31, 'Ali', 'Yellow Belt', 'https://example.com/avatar3.png', '["Best form"]', '["Flexibility"]');

INSERT INTO UserScores (rank1, UserID, QuizID, Score)
VALUES 
  (12, 1, 1, 95),
  (21, 2, 1, 88),
  (31, 3, 1, 72);
