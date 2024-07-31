<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240729162224 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE size (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, last_update DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category ADD name_en VARCHAR(255) NOT NULL, ADD description_en LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE material ADD name_en VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE product ADD sizes_id INT NOT NULL, ADD description_en LONGTEXT NOT NULL, ADD color_en LONGTEXT NOT NULL, CHANGE size name_en VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD423285E6 FOREIGN KEY (sizes_id) REFERENCES size (id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD423285E6 ON product (sizes_id)');
        $this->addSql('ALTER TABLE stone ADD name_en VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD423285E6');
        $this->addSql('DROP TABLE size');
        $this->addSql('ALTER TABLE stone DROP name_en');
        $this->addSql('ALTER TABLE category DROP name_en, DROP description_en');
        $this->addSql('ALTER TABLE material DROP name_en');
        $this->addSql('DROP INDEX IDX_D34A04AD423285E6 ON product');
        $this->addSql('ALTER TABLE product DROP sizes_id, DROP description_en, DROP color_en, CHANGE name_en size VARCHAR(255) NOT NULL');
    }
}
