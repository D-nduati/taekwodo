-- Users Table
CREATE TABLE Users (
    UserId UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    Username NVARCHAR(100) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Profiles Table (if you want additional user details for the frontend)
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

-- UserScores Table for Ranking Data
CREATE TABLE UserScores (
    UserID UNIQUEIDENTIFIER,
    Score INT,
    Rank INT,
    PRIMARY KEY (UserID),
    FOREIGN KEY (UserID) REFERENCES Users(UserId)
);
