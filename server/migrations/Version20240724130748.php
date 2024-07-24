<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240724130748 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, material_id INT NOT NULL, stone_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, color VARCHAR(255) NOT NULL, size VARCHAR(255) NOT NULL, weight DOUBLE PRECISION NOT NULL, price DOUBLE PRECISION NOT NULL, stock_qty INT NOT NULL, last_updated DATETIME NOT NULL, images JSON NOT NULL, INDEX IDX_D34A04AD12469DE2 (category_id), INDEX IDX_D34A04ADE308AC6F (material_id), INDEX IDX_D34A04AD1582D292 (stone_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stats_cart (id INT AUTO_INCREMENT NOT NULL, cart_id INT NOT NULL, count INT NOT NULL, last_updated DATETIME NOT NULL, UNIQUE INDEX UNIQ_4ACFE0F71AD5CDBF (cart_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stats_product (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, count INT NOT NULL, last_update DATETIME NOT NULL, UNIQUE INDEX UNIQ_4AF045F04584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADE308AC6F FOREIGN KEY (material_id) REFERENCES material (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD1582D292 FOREIGN KEY (stone_id) REFERENCES stone (id)');
        $this->addSql('ALTER TABLE stats_cart ADD CONSTRAINT FK_4ACFE0F71AD5CDBF FOREIGN KEY (cart_id) REFERENCES cart (id)');
        $this->addSql('ALTER TABLE stats_product ADD CONSTRAINT FK_4AF045F04584665A FOREIGN KEY (product_id) REFERENCES product (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cart_item DROP FOREIGN KEY FK_F0FE25274584665A');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C64584665A');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD12469DE2');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADE308AC6F');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD1582D292');
        $this->addSql('ALTER TABLE stats_cart DROP FOREIGN KEY FK_4ACFE0F71AD5CDBF');
        $this->addSql('ALTER TABLE stats_product DROP FOREIGN KEY FK_4AF045F04584665A');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE stats_cart');
        $this->addSql('DROP TABLE stats_product');
    }
}
