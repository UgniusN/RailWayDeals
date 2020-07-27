INSERT INTO Users(user_id, username, password, name, last_name,email,country)
    VALUES(1, 'user', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'Ugnius', 'Naujokas','ugniusnaujokas@gmail.com','Lietuva');
INSERT INTO Users(user_id, username, password, name, last_name,email,country)
    VALUES(2, 'admin', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'Rimas', 'Tatoris','rimastatt@gmail.com','Amerika');

INSERT INTO Roles(role_id, role) VALUES(1, 'CUSTOMER');
INSERT INTO Roles(role_id, role) VALUES(2, 'ADMIN');

INSERT INTO Users_Roles(user_id, role_id) VALUES(1, 1);
INSERT INTO Users_Roles(user_id, role_id) VALUES(2, 2);

INSERT INTO Travels(start_destination, end_destination,date, price) VALUES('Panevezys','Vilnius','2020-04-09', 12.50);
INSERT INTO Travels(start_destination, end_destination,date, price) VALUES('Vilnius','Kaunas','2020-05-12', 15.50);
INSERT INTO Travels(start_destination, end_destination,date, price) VALUES('Kaunas','Panevezys','2020-02-14', 12.50);
INSERT INTO Travels(start_destination, end_destination,date, price) VALUES('Panevezys','Klaipeda','2020-09-09', 1.50);
INSERT INTO Travels(start_destination, end_destination,date, price) VALUES('Kaunas','Klaipeda','2020-07-12', 18.25);