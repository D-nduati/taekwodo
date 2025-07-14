CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Events (
  id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
  eventName NVARCHAR(100),
  eventDate DATE,
  status NVARCHAR(50)
);

CREATE TABLE Videos (
  id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
  title NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  videoUrl NVARCHAR(255) NOT NULL,
  category NVARCHAR(50) NOT NULL, 
  createdAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE SearchParameters (
  id INT PRIMARY KEY IDENTITY(1,1),
  parameters NVARCHAR(255) NOT NULL
);


CREATE TABLE Users (
  id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
  name NVARCHAR(100),
  role NVARCHAR(50),
  email NVARCHAR(100) UNIQUE
);



CREATE PROCEDURE sp_AddUser
    @username NVARCHAR(100),
    @Email NVARCHAR(100),
    @PasswordHash NVARCHAR(255)
AS
BEGIN
   
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email OR Username = @Username)
    BEGIN
       
        THROW 50001, 'User already exists', 1;
    END
    
    INSERT INTO Users (Username, Email, PasswordHash)
    VALUES (@username, @Email, @PasswordHash);
END;


CREATE TABLE Posts (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Author NVARCHAR(100) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    ImageUrl NVARCHAR(255),
    VideoUrl NVARCHAR(255),
    Likes INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Comments (
  CommentID INT PRIMARY KEY IDENTITY,
  Id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Posts(Id),
  Author NVARCHAR(100),
  Content NVARCHAR(MAX),
  CreatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE Likes (
  LikeID INT PRIMARY KEY IDENTITY,
  PostID INT FOREIGN KEY REFERENCES Posts(PostID),
  LikedBy NVARCHAR(100),
  CreatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE UserSettings (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(256),
    ReceiveEmails BIT DEFAULT 1,
    ReceiveNotifications BIT DEFAULT 1,
    Theme NVARCHAR(10) DEFAULT 'light',
    TwoFactorAuth BIT DEFAULT 0, 
    AvatarUrl NVARCHAR(256), 
    CreatedAt DATETIME DEFAULT GETDATE(), 
    UpdatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE Quizzes (
  QuizID INT PRIMARY KEY IDENTITY(1,1),
  Category VARCHAR(50),
  Title VARCHAR(100),
  CreatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE Questions (
  QuestionID INT PRIMARY KEY IDENTITY(1,1),
  QuizID INT FOREIGN KEY REFERENCES Quizzes(QuizID),
  QuestionText NVARCHAR(MAX),
  CorrectAnswer INT,
  CreatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE Options (
  OptionID INT PRIMARY KEY IDENTITY(1,1),
  QuestionID INT FOREIGN KEY REFERENCES Questions(QuestionID),
  OptionText NVARCHAR(MAX),
  CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE UserQuizResults (
  ResultID INT PRIMARY KEY IDENTITY(1,1),
  UserID INT,
  QuizID INT FOREIGN KEY REFERENCES Quizzes(QuizID),
  Score INT,
  TakenAt DATETIME DEFAULT GETDATE()
);


  CREATE TABLE UserScores (
    UserID INT,
    QuizID INT,
    Score INT,
    Rank INT,
    PRIMARY KEY(UserID, QuizID),
    FOREIGN KEY (QuizID) REFERENCES Quizzes(QuizID)
  )

CREATE TABLE Profiles (
    ProfileId UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    UserId UNIQUEIDENTIFIER,  
    Username NVARCHAR(100) NOT NULL,
    Role NVARCHAR(50),
    AvatarUrl NVARCHAR(255),
    Achievements NVARCHAR(MAX), 
    Skills NVARCHAR(MAX),       
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

INSERT INTO Profiles (UserId, Username, Role, AvatarUrl, Achievements, Skills)
VALUES (
    '123e4567-e89b-12d3-a456-426614174000',  
    'John Doe',
    'Taekwondo Instructor',
    'https://example.com/avatar.jpg',
    '[\"Black Belt - 2nd Dan\", \"National Champion 2023\", \"Taekwondo Instructor\"]',  
    '[\"Sparring\", \"Forms\", \"Self-Defense\", \"Coaching\", \"Physical Conditioning\"]'  
);

{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "username": "John Doe",
  "role": "Taekwondo Instructor",
  "avatarUrl": "https://example.com/avatar.jpg",
  "achievements": ["Black Belt - 2nd Dan", "National Champion 2023", "Taekwondo Instructor"],
  "skills": ["Sparring", "Forms", "Self-Defense", "Coaching", "Physical Conditioning"]
}

