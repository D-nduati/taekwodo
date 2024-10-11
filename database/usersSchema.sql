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
  category NVARCHAR(50) NOT NULL, -- New column for category
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


