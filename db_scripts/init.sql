CREATE ROLE revox SUPERUSER LOGIN ENCRYPTED PASSWORD 'changeme';
CREATE DATABASE revox OWNER revox;
\c revox
CREATE TABLE deleteMe (testColumn varchar(100));