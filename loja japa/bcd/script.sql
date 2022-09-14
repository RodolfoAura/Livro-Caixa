drop database if exists loja_japa;

create database loja_japa charset = UTF8 collate utf8_general_ci;

use loja_japa;

create table produtos(
    n_lancamento integer not null auto_increment primary key,
    data_lancamento date not null,
    descricao varchar(50) not null,
    valor float(5,2) not null,
    tipo varchar(10) not null
);

describe produtos;
show tables;

LOAD DATA INFILE 'C:/Users/DES/Desktop/loja china/bcd/produtos.csv'
INTO TABLE produtos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

select * from produtos where data_lancamento = "0000-00-00";
select * from produtos;
