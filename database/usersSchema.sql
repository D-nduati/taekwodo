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
  videoName NVARCHAR(200),
  uploadDate DATETIME DEFAULT GETDATE()
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


