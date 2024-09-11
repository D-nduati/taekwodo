CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
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


DESKTOP-5TSB55R\SQLEXPRESS