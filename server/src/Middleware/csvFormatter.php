<?php
namespace App\Middleware;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class csvFormatter {
    private $entity;
    public $filePath;

    // Inject EntityManagerInterface
    private EntityManagerInterface $entityManager;

    private $normalizer;
    private $serializer;

    public function __construct(EntityManagerInterface $entityManager, $entity = null, $filePath = null) {
        $this->entity = $entity;
        $this->filePath = $filePath;
        $this->entityManager = $entityManager;
    }

    private function fetch() {
        // Fetch data from the repository using the entity manager
        $data = $this->entityManager->getRepository($this->entity)->findAll();

        return $data;
    }

    private function serialize($data) {
        $normalizer = new ObjectNormalizer();
        $serializer = new Serializer([$normalizer]);
        
        $csvData = [];
        foreach ($data as $item) {
            $csvData[] = $serializer->normalize($item);
        }

        return $csvData;
    }

    public function alertStockFormater() {
        // Fetch and serialize the data
        $data = $this->fetch();
        $csvData = $this->serialize($data);
        
        if ($fp = fopen($this->filePath, 'w')) {
            if (!empty($csvData)) {
                // Write the CSV header
                fputcsv($fp, array_keys($csvData[0]), ","); 
                
                // Write each row of data
                foreach ($csvData as $data) {
                    if (isset($data['lastupdate']) && is_array($data['lastupdate']) && isset($data['lastupdate']['timestamp'])) {
                        $data['lastupdate'] = 'timestamp: ' . $data['lastupdate']['timestamp'];
                    }
            
                    if (isset($data['product']) && is_array($data['product']) && isset($data['product']['name'])) {
                        $data['product'] = 'product: ' . $data['product']['name'];
                    }

                    // Write the row to the CSV
                    fputcsv($fp, $data);
                }
            }
            fclose($fp);
        }
    }

    public function trackingFormater() {
        // Fetch and serialize the data
        $data = $this->fetch();
        $csvData = $this->serialize($data);
        
        if ($fp = fopen($this->filePath, 'w')) {
            if (!empty($csvData)) {
                // Write the CSV header
                fputcsv($fp, array_keys($csvData[0]), ","); 
                
                // Write each row of data
                foreach ($csvData as $data) {
                    if (isset($data['user']) && is_array($data['user']) && isset($data['user']['email'])) {
                        $data['user'] = 'email: ' . $data['user']['email'];
                    }
            
                    if (isset($data['lastUpdate']) && is_array($data['lastUpdate'])) {
                        $data['lastUpdate'] = 'timestamp: ' . $data['lastUpdate']['timestamp'];
                    }

                    // Write the row to the CSV
                    fputcsv($fp, $data);
                }
            }
            fclose($fp);
        }
    }
}
