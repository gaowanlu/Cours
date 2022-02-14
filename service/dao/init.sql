DROP DATABASE IF exists cours;
CREATE DATABASE cours;
USE cours;
#用户表
CREATE TABLE user(
    userId VARCHAR(10) unique NOT NULL primary key
);
INSERT INTO user VALUES('1901420313');
SELECT * FROM user;
SELECT * FROM mysql.user;
#需要手动创建用户
#CREATE USER 'cours'@'localhost' IDENTIFIED BY 'cours';
#GRANT ALL ON cours.* TO 'cours'@'localhost' WITH GRANT OPTION;