DELIMITER $$

CREATE TRIGGER after_usersettings_avatar_update
AFTER UPDATE ON UserSettings
FOR EACH ROW
BEGIN

  IF NEW.AvatarUrl != OLD.AvatarUrl THEN
    UPDATE Profiles
    SET 
      AvatarUrl = NEW.AvatarUrl,
      UpdatedAt = NOW()
    WHERE UserId = NEW.UserID;
  END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER after_usersettings_insert
AFTER INSERT ON UserSettings
FOR EACH ROW
BEGIN
  
  IF NOT EXISTS (
    SELECT 1 FROM Profiles WHERE UserId = NEW.UserID
  ) THEN
    INSERT INTO Profiles (
      ProfileId,
      UserId,
      Username,
      AvatarUrl,
      CreatedAt,
      UpdatedAt
    ) VALUES (
      UUID(),              
      NEW.UserID,
      NEW.Username,
      NEW.AvatarUrl,
      NOW(),
      NOW()
    );
  END IF;
END$$

DELIMITER ;
