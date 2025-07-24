-- USERS DATA --
INSERT INTO users (UserID, Username, Email, PasswordHash, ReceiveEmails, ReceiveNotifications, Theme, TwoFactorAuth, AvatarUrl, CreatedAt, UpdatedAt) VALUES
(1, 'user1', 'user1@example.com', 'hash1', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar1.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(2, 'user2', 'user2@example.com', 'hash2', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar2.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(3, 'user3', 'user3@example.com', 'hash3', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar3.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(4, 'user4', 'user4@example.com', 'hash4', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar4.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(5, 'user5', 'user5@example.com', 'hash5', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar5.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(6, 'user6', 'user6@example.com', 'hash6', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar6.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(7, 'user7', 'user7@example.com', 'hash7', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar7.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(8, 'user8', 'user8@example.com', 'hash8', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar8.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(9, 'user9', 'user9@example.com', 'hash9', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar9.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(10, 'user10', 'user10@example.com', 'hash10', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar10.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(11, 'user11', 'user11@example.com', 'hash11', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar11.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(12, 'user12', 'user12@example.com', 'hash12', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar12.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(13, 'user13', 'user13@example.com', 'hash13', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar13.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
(14, 'user14', 'user14@example.com', 'hash14', TRUE, TRUE, 'light', FALSE, 'https://example.com/avatar14.png', '2025-07-23 16:29:40', '2025-07-23 16:29:40');

-- EVENTS DATA --
INSERT INTO events (id, eventName, eventDate, status) VALUES
('8dc1c4bf-0df0-479f-b321-9cb178e2d714', 'Event 1', '2025-07-24', 'Ongoing'),
('7d36bdb8-a650-4696-83fc-e848a6e816c2', 'Event 2', '2025-07-25', 'Upcoming'),
('97dda290-7128-4731-8754-468f607e4e18', 'Event 3', '2025-07-26', 'Ongoing'),
('3a960562-d944-4f1b-adba-116037bdabfa', 'Event 4', '2025-07-27', 'Ongoing'),
('613e70a8-76b5-4b0d-bc33-e02aa7ea5c75', 'Event 5', '2025-07-28', 'Ongoing'),
('652d5619-53e6-4887-8a1f-5808116f6b28', 'Event 6', '2025-07-29', 'Completed'),
('fdab71b9-2122-4d8c-a22e-bbda4f6f2395', 'Event 7', '2025-07-30', 'Ongoing');

-- VIDEOS DATA --
INSERT INTO videos (id, title, description, videoUrl, category, createdAt) VALUES
('1a8b66ae-d91e-44c8-ba3a-a395aa5e1684', 'Video Title 1', 'This is a description for video 1.', 'https://videos.com/video1.mp4', 'Self-defense', '2025-07-23 16:29:40'),
('3bf37a15-11df-4310-b8d2-bfbeb1a82c6d', 'Video Title 2', 'This is a description for video 2.', 'https://videos.com/video2.mp4', 'Sparring', '2025-07-23 16:29:40'),
('20bc8f37-1864-41fd-a529-0e5768d0c2cf', 'Video Title 3', 'This is a description for video 3.', 'https://videos.com/video3.mp4', 'Self-defense', '2025-07-23 16:29:40'),
('a0b3aa1d-f5f5-418b-8b22-494b08200811', 'Video Title 4', 'This is a description for video 4.', 'https://videos.com/video4.mp4', 'Sparring', '2025-07-23 16:29:40'),
('79821399-b50f-4f46-beac-b9f7688ef2b9', 'Video Title 5', 'This is a description for video 5.', 'https://videos.com/video5.mp4', 'Self-defense', '2025-07-23 16:29:40'),
('3f3ced9b-10a7-493d-9770-c5fa0374a9f5', 'Video Title 6', 'This is a description for video 6.', 'https://videos.com/video6.mp4', 'Sparring', '2025-07-23 16:29:40'),
('9d34a820-51fa-4bd5-9897-02a0c4431720', 'Video Title 7', 'This is a description for video 7.', 'https://videos.com/video7.mp4', 'Sparring', '2025-07-23 16:29:40');

-- SEARCH_PARAMS DATA --
INSERT INTO search_params (id, parameters) VALUES
(1, 'Keyword 1'),
(2, 'Keyword 2'),
(3, 'Keyword 3'),
(4, 'Keyword 4'),
(5, 'Keyword 5'),
(6, 'Keyword 6'),
(7, 'Keyword 7');

-- POSTS DATA --
INSERT INTO posts (Id, Author, Content, ImageUrl, VideoUrl, Likes, CreatedAt) VALUES
('1ca46c8f-ca8f-4391-af14-aa877d31fcba', 'user1', 'This is a post content 1.', 'https://images.com/img1.jpg', 'https://videos.com/vid1.mp4', 1, '2025-07-23 16:29:40'),
('4d27def5-1b46-4ab0-9924-3693709c56f7', 'user2', 'This is a post content 2.', 'https://images.com/img2.jpg', NULL, 23, '2025-07-23 16:29:40'),
('ae90c053-5de3-46f0-bf62-b1d3f0ac9c64', 'user3', 'This is a post content 3.', 'https://images.com/img3.jpg', 'https://videos.com/vid3.mp4', 100, '2025-07-23 16:29:40'),
('88a0895f-b640-4e21-8504-95b4f7a9d54e', 'user4', 'This is a post content 4.', 'https://images.com/img4.jpg', NULL, 92, '2025-07-23 16:29:40'),
('4d4bac62-8af4-4804-9007-95a51f56b749', 'user5', 'This is a post content 5.', 'https://images.com/img5.jpg', 'https://videos.com/vid5.mp4', 36, '2025-07-23 16:29:40'),
('50aab90c-3bd6-4276-9dc8-d25992946f3b', 'user6', 'This is a post content 6.', 'https://images.com/img6.jpg', NULL, 95, '2025-07-23 16:29:40'),
('9a151cf7-8efe-4994-9c58-6b83d0ccf088', 'user7', 'This is a post content 7.', 'https://images.com/img7.jpg', 'https://videos.com/vid7.mp4', 61, '2025-07-23 16:29:40');

-- COMMENTS DATA --
INSERT INTO comments (CommentID, PostID, Author, Content, CreatedAt) VALUES
(1, '4d27def5-1b46-4ab0-9924-3693709c56f7', 'user2', 'This is a comment 1.', '2025-07-23 16:29:40'),
(2, 'ae90c053-5de3-46f0-bf62-b1d3f0ac9c64', 'user3', 'This is a comment 2.', '2025-07-23 16:29:40'),
(3, '88a0895f-b640-4e21-8504-95b4f7a9d54e', 'user4', 'This is a comment 3.', '2025-07-23 16:29:40'),
(4, '4d4bac62-8af4-4804-9007-95a51f56b749', 'user5', 'This is a comment 4.', '2025-07-23 16:29:40'),
(5, '50aab90c-3bd6-4276-9dc8-d25992946f3b', 'user6', 'This is a comment 5.', '2025-07-23 16:29:40'),
(6, '9a151cf7-8efe-4994-9c58-6b83d0ccf088', 'user7', 'This is a comment 6.', '2025-07-23 16:29:40'),
(7, '1ca46c8f-ca8f-4391-af14-aa877d31fcba', 'user8', 'This is a comment 7.', '2025-07-23 16:29:40'),
(8, '4d27def5-1b46-4ab0-9924-3693709c56f7', 'user9', 'This is a comment 8.', '2025-07-23 16:29:40'),
(9, 'ae90c053-5de3-46f0-bf62-b1d3f0ac9c64', 'user10', 'This is a comment 9.', '2025-07-23 16:29:40'),
(10, '88a0895f-b640-4e21-8504-95b4f7a9d54e', 'user11', 'This is a comment 10.', '2025-07-23 16:29:40'),
(11, '4d4bac62-8af4-4804-9007-95a51f56b749', 'user12', 'This is a comment 11.', '2025-07-23 16:29:40'),
(12, '50aab90c-3bd6-4276-9dc8-d25992946f3b', 'user13', 'This is a comment 12.', '2025-07-23 16:29:40'),
(13, '9a151cf7-8efe-4994-9c58-6b83d0ccf088', 'user14', 'This is a comment 13.', '2025-07-23 16:29:40'),
(14, '1ca46c8f-ca8f-4391-af14-aa877d31fcba', 'user1', 'This is a comment 14.', '2025-07-23 16:29:40');

-- LIKES DATA --
INSERT INTO likes (LikeID, PostID, LikedBy, CreatedAt) VALUES
(1, '4d27def5-1b46-4ab0-9924-3693709c56f7', 'user2', '2025-07-23 16:29:40'),
(2, 'ae90c053-5de3-46f0-bf62-b1d3f0ac9c64', 'user3', '2025-07-23 16:29:40'),
(3, '88a0895f-b640-4e21-8504-95b4f7a9d54e', 'user4', '2025-07-23 16:29:40'),
(4, '4d4bac62-8af4-4804-9007-95a51f56b749', 'user5', '2025-07-23 16:29:40'),
(5, '50aab90c-3bd6-4276-9dc8-d25992946f3b', 'user6', '2025-07-23 16:29:40'),
(6, '9a151cf7-8efe-4994-9c58-6b83d0ccf088', 'user7', '2025-07-23 16:29:40'),
(7, '1ca46c8f-ca8f-4391-af14-aa877d31fcba', 'user8', '2025-07-23 16:29:40'),
(8, '4d27def5-1b46-4ab0-9924-3693709c56f7', 'user9', '2025-07-23 16:29:40'),
(9, 'ae90c053-5de3-46f0-bf62-b1d3f0ac9c64', 'user10', '2025-07-23 16:29:40'),
(10, '88a0895f-b640-4e21-8504-95b4f7a9d54e', 'user11', '2025-07-23 16:29:40'),
(11, '4d4bac62-8af4-4804-9007-95a51f56b749', 'user12', '2025-07-23 16:29:40'),
(12, '50aab90c-3bd6-4276-9dc8-d25992946f3b', 'user13', '2025-07-23 16:29:40'),
(13, '9a151cf7-8efe-4994-9c58-6b83d0ccf088', 'user14', '2025-07-23 16:29:40'),
(14, '1ca46c8f-ca8f-4391-af14-aa877d31fcba', 'user1', '2025-07-23 16:29:40'),
(15, '4d27def5-1b46-4ab0-9924-3693709c56f7', 'user2', '2025-07-23 16:29:40'),
(16, 'ae90c053-5de3-46f0-bf62-b1d3f0ac9c64', 'user3', '2025-07-23 16:29:40'),
(17, '88a0895f-b640-4e21-8504-95b4f7a9d54e', 'user4', '2025-07-23 16:29:40'),
(18, '4d4bac62-8af4-4804-9007-95a51f56b749', 'user5', '2025-07-23 16:29:40'),
(19, '50aab90c-3bd6-4276-9dc8-d25992946f3b', 'user6', '2025-07-23 16:29:40'),
(20, '9a151cf7-8efe-4994-9c58-6b83d0ccf088', 'user7', '2025-07-23 16:29:40');

-- PROFILES DATA --
INSERT INTO profiles (ProfileId, UserId, Username, Role, AvatarUrl, Achievements, Skills, CreatedAt, UpdatedAt) VALUES
('d58075c2-cbb2-45ae-a27a-0ef82b0ac0fc', 1, 'user1', 'Instructor', 'https://example.com/avatar1.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('fe40c1e2-3b66-4b6a-b882-4a4dc3603fb6', 2, 'user2', 'Instructor', 'https://example.com/avatar2.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('c783af65-1943-44e0-be60-a2847ee45831', 3, 'user3', 'Student', 'https://example.com/avatar3.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('4cd4eeb9-d4d8-4484-8e47-60321232a9d8', 4, 'user4', 'Student', 'https://example.com/avatar4.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('42f9145a-0578-4c04-8f85-592500d3c5ec', 5, 'user5', 'Student', 'https://example.com/avatar5.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('aba67b8c-781a-46cd-a2cd-09a3a209ce24', 6, 'user6', 'Student', 'https://example.com/avatar6.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('9b0b1df1-5215-4245-aff0-48c3b04d2884', 7, 'user7', 'Student', 'https://example.com/avatar7.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('3824c391-a20d-40aa-82fc-054837f5876d', 8, 'user8', 'Instructor', 'https://example.com/avatar8.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('a3b5a9fc-adcc-4e34-926d-a7fa934599d0', 9, 'user9', 'Student', 'https://example.com/avatar9.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('b98d5603-703e-48dc-a421-382d4e966350', 10, 'user10', 'Student', 'https://example.com/avatar10.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('38af6c65-26e2-4bce-9bd4-0f79fb097c3f', 11, 'user11', 'Student', 'https://example.com/avatar11.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('9327e831-459b-4d7a-8865-f5f5833aa9b0', 12, 'user12', 'Instructor', 'https://example.com/avatar12.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('06abb1ad-4e3e-47fe-9025-d5b5eb31ffa0', 13, 'user13', 'Student', 'https://example.com/avatar13.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40'),
('8e9ba3d3-d48f-44d6-8326-cd629508a8bf', 14, 'user14', 'Student', 'https://example.com/avatar14.png', 'Medals, Certificates', 'Kick, Punch, Block', '2025-07-23 16:29:40', '2025-07-23 16:29:40');

-- QUIZZES DATA --
INSERT INTO quizzes (QuizID, Category, Title, CreatedAt) VALUES
(1, 'Forms', 'Quiz 1', '2025-07-23 16:29:40'),
(2, 'Rules', 'Quiz 2', '2025-07-23 16:29:40'),
(3, 'Forms', 'Quiz 3', '2025-07-23 16:29:40');

-- QUESTIONS DATA --
INSERT INTO questions (QuestionID, QuizID, QuestionText, CorrectAnswer, CreatedAt) VALUES
(1, 1, 'What is question 1?', 2, '2025-07-23 16:29:40'),
(2, 1, 'What is question 2?', 1, '2025-07-23 16:29:40'),
(3, 1, 'What is question 3?', 2, '2025-07-23 16:29:40'),
(4, 2, 'What is question 4?', 3, '2025-07-23 16:29:40'),
(5, 2, 'What is question 5?', 4, '2025-07-23 16:29:40'),
(6, 2, 'What is question 6?', 2, '2025-07-23 16:29:40'),
(7, 3, 'What is question 7?', 3, '2025-07-23 16:29:40'),
(8, 3, 'What is question 8?', 4, '2025-07-23 16:29:40'),
(9, 3, 'What is question 9?', 4, '2025-07-23 16:29:40');

-- OPTIONS DATA --
INSERT INTO options (OptionID, QuestionID, OptionText, CreatedAt) VALUES
(1, 1, 'Option 1 for question 1', '2025-07-23 16:29:40'),
(2, 1, 'Option 2 for question 1', '2025-07-23 16:29:40'),
(3, 1, 'Option 3 for question 1', '2025-07-23 16:29:40'),
(4, 1, 'Option 4 for question 1', '2025-07-23 16:29:40'),
(5, 2, 'Option 1 for question 2', '2025-07-23 16:29:40'),
(6, 2, 'Option 2 for question 2', '2025-07-23 16:29:40'),
(7, 2, 'Option 3 for question 2', '2025-07-23 16:29:40'),
(8, 2, 'Option 4 for question 2', '2025-07-23 16:29:40'),
(9, 3, 'Option 1 for question 3', '2025-07-23 16:29:40'),
(10, 3, 'Option 2 for question 3', '2025-07-23 16:29:40'),
(11, 3, 'Option 3 for question 3', '2025-07-23 16:29:40'),
(12, 3, 'Option 4 for question 3', '2025-07-23 16:29:40'),
(13, 4, 'Option 1 for question 4', '2025-07-23 16:29:40'),
(14, 4, 'Option 2 for question 4', '2025-07-23 16:29:40'),
(15, 4, 'Option 3 for question 4', '2025-07-23 16:29:40'),
(16, 4, 'Option 4 for question 4', '2025-07-23 16:29:40'),
(17, 5, 'Option 1 for question 5', '2025-07-23 16:29:40'),
(18, 5, 'Option 2 for question 5', '2025-07-23 16:29:40'),
(19, 5, 'Option 3 for question 5', '2025-07-23 16:29:40'),
(20, 5, 'Option 4 for question 5', '2025-07-23 16:29:40'),
(21, 6, 'Option 1 for question 6', '2025-07-23 16:29:40'),
(22, 6, 'Option 2 for question 6', '2025-07-23 16:29:40'),
(23, 6, 'Option 3 for question 6', '2025-07-23 16:29:40'),
(24, 6, 'Option 4 for question 6', '2025-07-23 16:29:40'),
(25, 7, 'Option 1 for question 7', '2025-07-23 16:29:40'),
(26, 7, 'Option 2 for question 7', '2025-07-23 16:29:40'),
(27, 7, 'Option 3 for question 7', '2025-07-23 16:29:40'),
(28, 7, 'Option 4 for question 7', '2025-07-23 16:29:40'),
(29, 8, 'Option 1 for question 8', '2025-07-23 16:29:40'),
(30, 8, 'Option 2 for question 8', '2025-07-23 16:29:40'),
(31, 8, 'Option 3 for question 8', '2025-07-23 16:29:40'),
(32, 8, 'Option 4 for question 8', '2025-07-23 16:29:40'),
(33, 9, 'Option 1 for question 9', '2025-07-23 16:29:40'),
(34, 9, 'Option 2 for question 9', '2025-07-23 16:29:40'),
(35, 9, 'Option 3 for question 9', '2025-07-23 16:29:40'),
(36, 9, 'Option 4 for question 9', '2025-07-23 16:29:40');

-- USER_QUIZ_RESULTS DATA --
INSERT INTO user_quiz_results (ResultID, UserID, QuizID, Score, TakenAt) VALUES
(NULL, 1, 1, 70, '2025-07-23 16:29:40'),
(NULL, 1, 2, 84, '2025-07-23 16:29:40'),
(NULL, 1, 3, 97, '2025-07-23 16:29:40'),
(NULL, 2, 1, 89, '2025-07-23 16:29:40'),
(NULL, 2, 2, 97, '2025-07-23 16:29:40'),
(NULL, 2, 3, 77, '2025-07-23 16:29:40'),
(NULL, 3, 1, 73, '2025-07-23 16:29:40'),
(NULL, 3, 2, 75, '2025-07-23 16:29:40'),
(NULL, 3, 3, 100, '2025-07-23 16:29:40'),
(NULL, 4, 1, 83, '2025-07-23 16:29:40'),
(NULL, 4, 2, 85, '2025-07-23 16:29:40'),
(NULL, 4, 3, 98, '2025-07-23 16:29:40'),
(NULL, 5, 1, 72, '2025-07-23 16:29:40'),
(NULL, 5, 2, 98, '2025-07-23 16:29:40'),
(NULL, 5, 3, 91, '2025-07-23 16:29:40'),
(NULL, 6, 1, 85, '2025-07-23 16:29:40'),
(NULL, 6, 2, 82, '2025-07-23 16:29:40'),
(NULL, 6, 3, 98, '2025-07-23 16:29:40'),
(NULL, 7, 1, 76, '2025-07-23 16:29:40'),
(NULL, 7, 2, 98, '2025-07-23 16:29:40'),
(NULL, 7, 3, 82, '2025-07-23 16:29:40'),
(NULL, 8, 1, 68, '2025-07-23 16:29:40'),
(NULL, 8, 2, 82, '2025-07-23 16:29:40'),
(NULL, 8, 3, 81, '2025-07-23 16:29:40'),
(NULL, 9, 1, 71, '2025-07-23 16:29:40'),
(NULL, 9, 2, 80, '2025-07-23 16:29:40'),
(NULL, 9, 3, 82, '2025-07-23 16:29:40'),
(NULL, 10, 1, 67, '2025-07-23 16:29:40'),
(NULL, 10, 2, 100, '2025-07-23 16:29:40'),
(NULL, 10, 3, 66, '2025-07-23 16:29:40'),
(NULL, 11, 1, 80, '2025-07-23 16:29:40'),
(NULL, 11, 2, 64, '2025-07-23 16:29:40'),
(NULL, 11, 3, 91, '2025-07-23 16:29:40'),
(NULL, 12, 1, 85, '2025-07-23 16:29:40'),
(NULL, 12, 2, 91, '2025-07-23 16:29:40'),
(NULL, 12, 3, 91, '2025-07-23 16:29:40'),
(NULL, 13, 1, 74, '2025-07-23 16:29:40'),
(NULL, 13, 2, 72, '2025-07-23 16:29:40'),
(NULL, 13, 3, 95, '2025-07-23 16:29:40'),
(NULL, 14, 1, 88, '2025-07-23 16:29:40'),
(NULL, 14, 2, 99, '2025-07-23 16:29:40'),
(NULL, 14, 3, 94, '2025-07-23 16:29:40');

-- USER_SCORES DATA --
INSERT INTO user_scores (rank1, UserID, QuizID, Score) VALUES
(1, 1, 1, 70),
(2, 1, 2, 84),
(3, 1, 3, 97),
(4, 2, 1, 89),
(5, 2, 2, 97),
(6, 2, 3, 77),
(7, 3, 1, 73),
(8, 3, 2, 75),
(9, 3, 3, 100),
(10, 4, 1, 83),
(11, 4, 2, 85),
(12, 4, 3, 98),
(13, 5, 1, 72),
(14, 5, 2, 98),
(15, 5, 3, 91),
(16, 6, 1, 85),
(17, 6, 2, 82),
(18, 6, 3, 98),
(19, 7, 1, 76),
(20, 7, 2, 98),
(21, 7, 3, 82),
(22, 8, 1, 68),
(23, 8, 2, 82),
(24, 8, 3, 81),
(25, 9, 1, 71),
(26, 9, 2, 80),
(27, 9, 3, 82),
(28, 10, 1, 67),
(29, 10, 2, 100),
(30, 10, 3, 66),
(31, 11, 1, 80),
(32, 11, 2, 64),
(33, 11, 3, 91),
(34, 12, 1, 85),
(35, 12, 2, 91),
(36, 12, 3, 91),
(37, 13, 1, 74),
(38, 13, 2, 72),
(39, 13, 3, 95),
(40, 14, 1, 88),
(41, 14, 2, 99),
(42, 14, 3, 94);

