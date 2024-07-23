<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240723114242 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE stats_cart (id INT AUTO_INCREMENT NOT NULL, cart_id INT NOT NULL, count INT NOT NULL, last_updated DATETIME NOT NULL, UNIQUE INDEX UNIQ_4ACFE0F71AD5CDBF (cart_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stats_product (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, count INT NOT NULL, last_update DATETIME NOT NULL, UNIQUE INDEX UNIQ_4AF045F04584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stats_cart ADD CONSTRAINT FK_4ACFE0F71AD5CDBF FOREIGN KEY (cart_id) REFERENCES cart (id)');
        $this->addSql('ALTER TABLE stats_product ADD CONSTRAINT FK_4AF045F04584665A FOREIGN KEY (product_id) REFERENCES product (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE stats_cart DROP FOREIGN KEY FK_4ACFE0F71AD5CDBF');
        $this->addSql('ALTER TABLE stats_product DROP FOREIGN KEY FK_4AF045F04584665A');
        $this->addSql('DROP TABLE stats_cart');
        $this->addSql('DROP TABLE stats_product');
    }
}
