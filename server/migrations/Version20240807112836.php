<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240807112836 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE alert_stock (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, email VARCHAR(255) NOT NULL, lastupdate DATETIME NOT NULL, INDEX IDX_A16CA18B4584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE promotional_code (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, rate INT NOT NULL, begin DATETIME NOT NULL, end DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shipping_country (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, blacklist TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shipping_insurance (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shipping_threshold (id INT AUTO_INCREMENT NOT NULL, continent VARCHAR(255) NOT NULL, threshold INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE alert_stock ADD CONSTRAINT FK_A16CA18B4584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE user ADD adress_id INT DEFAULT NULL, ADD region VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE alert_stock DROP FOREIGN KEY FK_A16CA18B4584665A');
        $this->addSql('DROP TABLE alert_stock');
        $this->addSql('DROP TABLE promotional_code');
        $this->addSql('DROP TABLE shipping_country');
        $this->addSql('DROP TABLE shipping_insurance');
        $this->addSql('DROP TABLE shipping_threshold');
        $this->addSql('ALTER TABLE user DROP adress_id, DROP region');
    }
}
