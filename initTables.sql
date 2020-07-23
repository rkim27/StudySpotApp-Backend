CREATE TABLE schools (id INT PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(255) NOT NULL, 
	acronym VARCHAR(255), 
    state VARCHAR(255));
CREATE TABLE buildings (id INT PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(255) NOT NULL, 
	acronym VARCHAR(255), 
	schoolId INT,
    FOREIGN KEY (schoolId) REFERENCES schools(id) 
		ON UPDATE CASCADE 
		ON DELETE CASCADE);
CREATE TABLE libraries (id INT PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(255) NOT NULL, 
	acronym VARCHAR(255), 
	buildingId INT, 
    FOREIGN KEY (buildingId) REFERENCES buildings(id) 
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
	flr varchar(255) NOT NULL, 
    numSeats INT DEFAULT 1000,
    printer BOOLEAN DEFAULT false, 
    computer BOOLEAN DEFAULT false);
CREATE TABLE rooms (id INT PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(255) NOT NULL, 
	flr varchar(255) NOT NULL, 
    num varchar(255) NOT NULL,
    buildingId INT,
	FOREIGN KEY (buildingId) REFERENCES buildings(id) 
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
    available BOOLEAN DEFAULT true,
    whiteBoard BOOLEAN DEFAULT false, 
    computer BOOLEAN DEFAULT false);