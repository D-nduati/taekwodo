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
  PostID INT FOREIGN KEY REFERENCES Posts(PostID),
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

CREATE TABLE Quizzes (
    QuizID INT PRIMARY KEY IDENTITY(1,1),
    Category NVARCHAR(50),
    Title NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
  );
  CREATE TABLE Questions (
    QuestionID INT PRIMARY KEY IDENTITY(1,1),
    QuizID INT FOREIGN KEY REFERENCES Quizzes(QuizID),
    QuestionText NVARCHAR(255),
    CorrectAnswer INT,
    CreatedAt DATETIME DEFAULT GETDATE()
  );
  CREATE TABLE Options (
    OptionID INT PRIMARY KEY IDENTITY(1,1),
    QuestionID INT FOREIGN KEY REFERENCES Questions(QuestionID),
    OptionText NVARCHAR(255)
  );

  CREATE TABLE UserScores (
    UserID INT,
    QuizID INT,
    Score INT,
    Rank INT,
    PRIMARY KEY(UserID, QuizID),
    FOREIGN KEY (QuizID) REFERENCES Quizzes(QuizID)
  )


